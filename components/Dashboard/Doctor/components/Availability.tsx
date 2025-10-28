"use client";
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { getAvailability, createAvailability, deleteAvailability, PatchAvailability } from "@/lib/Api/availability";
import { AvailabilityType } from "@/src/types/enums";
import { ChangeDayAvailability } from "@/lib/Api/Doctor/doctor_api";
import toast from "react-hot-toast";
import { GetHospital } from "@/lib/Api/Hospital/Api";
import { useAuth } from "@/src/contexts/AuthContext";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
  const [availabilityType, setAvailabilityType] = useState<AvailabilityType>(AvailabilityType.CLINIC);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [pendingSlots, setPendingSlots] = useState<Slot[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<
    Record<string, { active: boolean; showToggle: boolean }>
  >(
    Object.fromEntries(daysOfWeek.map((day) => [day, { active: true, showToggle: true }]))
  );

  useEffect(() => {
    setLoading(true);
    Promise.all([getAvailability(), GetHospital()])
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
    const update = (list: Slot[]) => list.map((s) => (s === slot ? { ...s, [field]: value } : s));
    if (isPending) setPendingSlots(update);
    else setSlots(update);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // 1. Create any new pending slots
      if (pendingSlots.length > 0) {
        const newSlotsData = await createAvailability(pendingSlots);
        setSlots((prev) => [...prev, ...newSlotsData]);
        setPendingSlots([]);
      }

      // 2. Update modified existing slots
      const modifiedSlots = slots.filter((s) => s.id && (s.startTime || s.endTime));
      for (const slot of modifiedSlots) {
        if (slot.id) {
        
          const payload = 
            {
              doctorId: slot.doctorId,
              dayOfWeek: slot.dayOfWeek,
              startTime: slot.startTime,
              endTime: slot.endTime,
              isActive: slot.isActive,
              availabilityType: slot.availabilityType,
              hospitalId: slot.hospitalId,
            };
          
          await PatchAvailability(payload,slot.id);
        }
      }

      toast.success("Availability saved successfully");
      const updatedData = await getAvailability();
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
    <div className="w-full mx-auto bg-[#f8f9f8] p-5 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Set Your Availability</h2>
          <p className="text-xs text-gray-500">
            Manage your consultation hours and available days easily.
          </p>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-3 mb-6 justify-center">
        {["ONLINE", "CLINIC"].map((type) => (
          <button
            key={type}
            className={`${
              availabilityType === type
                ? "bg-[#5fe089] text-black"
                : "bg-gray-100 text-gray-600"
            } font-medium px-4 py-1.5 text-sm rounded-full`}
            onClick={() => setAvailabilityType(type as AvailabilityType)}
          >
            {type.charAt(0) + type.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Weekly Schedule */}
      <h3 className="text-base font-semibold mb-3 text-gray-800">Weekly Schedule</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {daysOfWeek.map((day) => {
          const allSlots = [...slots, ...pendingSlots].filter(
            (s) =>
              s.dayOfWeek?.toLowerCase() === day.toLowerCase() &&
              s.availabilityType === availabilityType
          );

          return (
            <div
              key={day}
              className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-2.5"
            >
              {/* Day Header */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-1 mb-2">
                <h4 className="text-gray-800 text-sm font-semibold tracking-wide">{day}</h4>
                {availability[day]?.showToggle && (
                  <Switch
                    checked={availability[day]?.active}
                    onCheckedChange={(checked) => handleToggleDay(day, checked)}
                    className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ease-in-out data-[state=checked]:bg-[#5fe089] data-[state=unchecked]:bg-gray-300 hover:cursor-pointer"
                  >
                    <span className="pointer-events-none block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform duration-200 ease-in-out translate-x-0 data-[state=checked]:translate-x-4" />
                  </Switch>
                )}
              </div>

              {/* Slot List */}
              <div className="space-y-2">
                {allSlots.length > 0 ? (
                  allSlots.map((slot, index) => {
                    const isPending = !slot.id;
                    return (
                      <div
                        key={slot.id || index}
                        className="bg-gray-50 rounded-lg p-2 flex flex-col gap-1.5 border border-gray-100"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
                            <span>Slot {index + 1}</span>
                            {isPending && (
                              <span className="text-[10px] text-orange-500">(new)</span>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveSlot(slot, isPending)}
                            className="text-[10px] text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-gray-500">Start:</span>
                            <input
                              type="time"
                              className="border border-gray-200 rounded px-1.5 py-0.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-[#5fe089]"
                              value={slot.startTime || ""}
                              onChange={(e) =>
                                handleSlotChange(slot, "startTime", e.target.value, isPending)
                              }
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-gray-500">End:</span>
                            <input
                              type="time"
                              className="border border-gray-200 rounded px-1.5 py-0.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-[#5fe089]"
                              value={slot.endTime || ""}
                              onChange={(e) =>
                                handleSlotChange(slot, "endTime", e.target.value, isPending)
                              }
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-gray-500">Hospital:</span>
                            <select
                              className="border border-gray-200 rounded px-1.5 py-0.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-[#5fe089]"
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
                              <option value="">Select</option>
                              {hospitals.map((hosp) => (
                                <option key={hosp.id} value={hosp.id}>
                                  {hosp.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[10px] text-gray-400 italic">No slots added yet.</p>
                )}
              </div>

              {/* Add Slot */}
              <div className="mt-2">
                <button
                  className="w-full border border-gray-200 rounded-md px-1.5 py-1 text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#5fe089]"
                  onClick={() => handleAddSlot(day)}
                >
                  + Add Slot
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 gap-2">
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 bg-white px-4 py-1.5 text-sm rounded-full"
          onClick={() => {
            setPendingSlots([]);
            getAvailability().then((data) => setSlots(data));
          }}
        >
          Cancel
        </Button>
        <Button
          className="bg-[#5fe089] text-black font-medium px-4 py-1.5 text-sm rounded-full"
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