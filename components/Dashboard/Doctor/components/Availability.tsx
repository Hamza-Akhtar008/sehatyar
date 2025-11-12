"use client";
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  getAvailability,
  createAvailability,
  deleteAvailability,
  PatchAvailability,
} from "@/lib/Api/availability";
import { AvailabilityType } from "@/src/types/enums";
import { ChangeDayAvailability } from "@/lib/Api/Doctor/doctor_api";
import toast from "react-hot-toast";
import { GetHospital } from "@/lib/Api/Hospital/Api";
import { useAuth } from "@/src/contexts/AuthContext";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface Slot {
  id?: number;
  doctorId: number;
  dayOfWeek: string;
  startTime: string | null;
  endTime: string | null;
  isActive: boolean;
  availabilityType: AvailabilityType;
  hospitalId?: number;
}

interface Hospital {
  id: number;
  name: string;
  isClinic: boolean;
}

const Availability: React.FC = () => {
  const { user } = useAuth();
  const [availabilityType, setAvailabilityType] = useState<AvailabilityType>(
    AvailabilityType.CLINIC
  );
  const [slots, setSlots] = useState<Slot[]>([]);
  const [pendingSlots, setPendingSlots] = useState<Slot[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<
    Record<string, { active: boolean; showToggle: boolean }>
  >(Object.fromEntries(daysOfWeek.map((day) => [day, { active: true, showToggle: true }])));

  useEffect(() => {
    setLoading(true);
    Promise.all([getAvailability(parseInt(user?.doctorId || "0")), GetHospital(user?.doctorId || "0")])
      .then(([slotData, hospitalData]) => {
        setSlots(slotData);
        setHospitals(hospitalData);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const updated = Object.fromEntries(
      daysOfWeek.map((day) => {
        const daySlots = [...slots, ...pendingSlots].filter(
          (s) =>
            s.dayOfWeek?.toLowerCase() === day.toLowerCase() &&
            s.availabilityType === availabilityType
        );

        if (daySlots.length === 0) return [day, { active: false, showToggle: false }];

        const allActive = daySlots.every((s) => s.isActive);
        const allInactive = daySlots.every((s) => !s.isActive);
        const shouldShowToggle = allActive || allInactive;

        return [day, { active: allActive, showToggle: shouldShowToggle }];
      })
    );
    setAvailability(updated as Record<string, { active: boolean; showToggle: boolean }>);
  }, [slots, pendingSlots, availabilityType]);

  const timeToMinutes = (t?: string | null) => {
    if (!t) return null;
    const parts = t.split(":");
    if (parts.length < 2) return null;
    const hh = parseInt(parts[0], 10);
    const mm = parseInt(parts[1], 10);
    if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
    return hh * 60 + mm;
  };

  const isOverlapMinutes = (s1: number, e1: number, s2: number, e2: number) => {
    return s1 < e2 && s2 < e1;
  };

  // ✅ VALIDATION: Now includes checks for:
  // - start < end
  // - duration >= 30 mins
  // - duplicates or overlaps across online/clinic
  const validateSlotAgainstDay = (combinedSlots: Slot[], slotToValidate: Slot): string | null => {
    const day = slotToValidate.dayOfWeek.toLowerCase();
    const slotStart = timeToMinutes(slotToValidate.startTime);
    const slotEnd = timeToMinutes(slotToValidate.endTime);

    if (slotStart === null || slotEnd === null) {
      return "Please enter both start and end times.";
    }

    if (slotStart >= slotEnd) {
      return `Start time must be before end time (${slotToValidate.startTime} - ${slotToValidate.endTime}).`;
    }

    const duration = slotEnd - slotStart;
    if (duration < 30) {
      return `Each slot must be at least 30 minutes long (${slotToValidate.startTime} - ${slotToValidate.endTime}).`;
    }

    const others = combinedSlots.filter((s) => {
      if (s.dayOfWeek.toLowerCase() !== day) return false;
      if (s.id && slotToValidate.id) return s.id !== slotToValidate.id;
      return s !== slotToValidate;
    });

    for (const o of others) {
      const oStart = timeToMinutes(o.startTime);
      const oEnd = timeToMinutes(o.endTime);
      if (oStart === null || oEnd === null) continue;

      if (oStart === slotStart && oEnd === slotEnd) {
        return `Duplicate slot (${slotToValidate.startTime} - ${slotToValidate.endTime}) already exists for ${slotToValidate.dayOfWeek}.`;
      }

      if (isOverlapMinutes(slotStart, slotEnd, oStart, oEnd)) {
        return `Time slot (${slotToValidate.startTime} - ${slotToValidate.endTime}) overlaps with existing (${o.startTime} - ${o.endTime}) for ${slotToValidate.dayOfWeek}.`;
      }
    }

    return null;
  };

  const handleAddSlot = (day: string) => {
    const newSlot: Slot = {
      doctorId: parseInt(user?.id || "0"),
      dayOfWeek: day,
      startTime: "",
      endTime: "",
      isActive: true,
      availabilityType,
      hospitalId: undefined,
    };
    setPendingSlots((prev) => [...prev, newSlot]);
  };

  const handleRemoveSlot = async (slot: Slot, isPending: boolean) => {
    if (isPending) {
      setPendingSlots((prev) => prev.filter((s) => s !== slot));
    } else if (slot.id) {
      try {
        await deleteAvailability(slot.id);
        setSlots((prev) => prev.filter((s) => s.id !== slot.id));
        toast.success("Slot removed successfully");
      } catch {
        toast.error("Failed to remove slot");
      }
    }
  };

  const handleSlotChange = (
    slot: Slot,
    field: keyof Slot,
    value: string | number | boolean,
    isPending: boolean
  ) => {
    const updatedSlot: Slot = { ...slot, [field]: value } as Slot;
    const combinedOriginal = [...slots, ...pendingSlots];
    const combinedWithUpdated = combinedOriginal.map((s) => (s === slot ? updatedSlot : s));

    if (field === "startTime" || field === "endTime") {
      const start = (field === "startTime" ? (value as string) : updatedSlot.startTime) as string;
      const end = (field === "endTime" ? (value as string) : updatedSlot.endTime) as string;

      if (start && end) {
        const error = validateSlotAgainstDay(combinedWithUpdated, updatedSlot);
        if (error) {
          toast.error(error);
          return;
        }
      }
    }

    const updater = (list: Slot[]) => list.map((s) => (s === slot ? updatedSlot : s));
    if (isPending) setPendingSlots(updater);
    else setSlots(updater);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    const allSlots = [...slots, ...pendingSlots];

    for (let i = 0; i < allSlots.length; i++) {
      const slotToCheck = allSlots[i];
      if (!slotToCheck.startTime || !slotToCheck.endTime) continue;
      const combinedForCheck = allSlots.slice();
      const error = validateSlotAgainstDay(combinedForCheck, slotToCheck);
      if (error) {
        toast.error(error);
        setLoading(false);
        return;
      }
    }

    try {
      if (pendingSlots.length > 0) {
        const newSlotsData = await createAvailability(pendingSlots);
        setSlots((prev) => [...prev, ...newSlotsData]);
        setPendingSlots([]);
      }

      const modifiedSlots = slots.filter((s) => s.id && (s.startTime || s.endTime));
      for (const slot of modifiedSlots) {
        if (slot.id) {
          const payload = {
            doctorId: slot.doctorId,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isActive: slot.isActive,
            availabilityType: slot.availabilityType,
            hospitalId: slot.hospitalId,
          };
          await PatchAvailability(payload, slot.id);
        }
      }

      toast.success("Availability saved successfully");
      const updatedData = await getAvailability(parseInt(user?.doctorId || "0"));
      setSlots(updatedData);
    } catch (error) {
      console.error("Error saving availability:", error);
      toast.error("Error saving availability");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDay = async (day: string, checked: boolean) => {
    setAvailability((prev) => ({ ...prev, [day]: { ...prev[day], active: checked } }));
    try {
      await ChangeDayAvailability(day, checked);
      toast.success(`Day ${day} updated successfully`);
    } catch (err) {
      toast.error("Error updating day status");
      setAvailability((prev) => ({ ...prev, [day]: { ...prev[day], active: !checked } }));
    }
  };

  return (
    <div className="w-full mx-auto bg-[#f8f9f8] p-4 sm:p-6 md:p-8 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Set Your Availability</h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage your consultation hours and available days easily.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {["online", "clinic"].map((type) => (
          <button
            key={type}
            className={`${
              availabilityType === type
                ? "bg-[#5fe089] text-black"
                : "bg-gray-100 text-gray-600"
            } font-medium px-4 py-2 text-sm rounded-full transition`}
            onClick={() => setAvailabilityType(type as AvailabilityType)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">Weekly Schedule</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {daysOfWeek.map((day) => {
          const allSlots = [...slots, ...pendingSlots].filter(
            (s) =>
              s.dayOfWeek?.toLowerCase() === day.toLowerCase() &&
              s.availabilityType === availabilityType
          );

          return (
            <div
              key={day}
              className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-3 sm:p-4 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                <h4 className="text-gray-800 text-sm sm:text-base font-semibold tracking-wide">{day}</h4>
                {availability[day]?.showToggle && (
                  <Switch
                    checked={availability[day]?.active}
                    onCheckedChange={(checked) => handleToggleDay(day, checked)}
                    className="h-5 w-9 data-[state=checked]:bg-[#5fe089] data-[state=unchecked]:bg-gray-300"
                  />
                )}
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {allSlots.length > 0 ? (
                  allSlots.map((slot, index) => {
                    const isPending = !slot.id;
                    return (
                      <div
                        key={slot.id || index}
                        className="bg-gray-50 rounded-lg p-2 flex flex-col gap-2 border border-gray-100"
                      >
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-gray-700">
                            Slot {index + 1}{" "}
                            {isPending && <span className="text-orange-500">(new)</span>}
                          </span>
                          <button
                            onClick={() => handleRemoveSlot(slot, isPending)}
                            className="text-red-500 hover:underline text-[11px]"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="time"
                            className="border border-gray-200 rounded px-2 py-1 text-[11px] focus:ring-[#5fe089] flex-1 min-w-[80px]"
                            value={slot.startTime || ""}
                            onChange={(e) =>
                              handleSlotChange(slot, "startTime", e.target.value, isPending)
                            }
                          />
                          <input
                            type="time"
                            className="border border-gray-200 rounded px-2 py-1 text-[11px] focus:ring-[#5fe089] flex-1 min-w-[80px]"
                            value={slot.endTime || ""}
                            onChange={(e) =>
                              handleSlotChange(slot, "endTime", e.target.value, isPending)
                            }
                          />
                          {availabilityType === AvailabilityType.CLINIC && (
                            <select
                              className="border border-gray-200 rounded px-2 py-1 text-[11px] focus:ring-[#5fe089] flex-1 min-w-[100px]"
                              value={slot.hospitalId || ""}
                              onChange={(e) =>
                                handleSlotChange(
                                  slot,
                                  "hospitalId",
                                  Number(e.target.value),
                                  isPending
                                )
                              }
                            >
                              <option value="">Select Hospital</option>
                              {hospitals.map((hosp) => (
                                <option key={hosp.id} value={hosp.id}>
                                  {hosp.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-gray-400 italic">No slots added yet.</p>
                )}
              </div>

              <button
                className="mt-3 border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 focus:ring-1 focus:ring-[#5fe089] w-full"
                onClick={() => handleAddSlot(day)}
              >
                + Add Slot
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-end mt-6 gap-2 sm:gap-3">
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 bg-white px-4 py-2 text-sm rounded-full w-full sm:w-auto"
          onClick={() => {
            setPendingSlots([]);
            getAvailability(parseInt(user?.doctorId || "0")).then((data) => setSlots(data));
          }}
        >
          Cancel
        </Button>
        <Button
          className="bg-[#5fe089] text-black font-medium px-4 py-2 text-sm rounded-full w-full sm:w-auto"
          onClick={handleSaveChanges}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Availability;
