"use client";
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { getAvailability, createAvailability, deleteAvailability } from '@/lib/Api/availability';
import { AvailabilityType, SlotType } from "@/src/types/enums";
import { cn } from "@/lib/utils";
import { ChangeDayAvailability, ChangeSlotAvailability } from "@/lib/Api/Doctor/doctor_api";
import toast from "react-hot-toast";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface Slot {
  id?: number;
  doctorId: number;
  dayOfWeek: string;
  startTime: string | null;
  endTime: string | null;
  isActive: boolean;
  availabilityType: AvailabilityType;
  slotType: SlotType;
  createdAt?: string;
  updatedAt?: string;
}

const Availability: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]); // backend slot objects (saved)
  const [pendingSlots, setPendingSlots] = useState<Slot[]>([]); // new slots not yet saved
  const [loading, setLoading] = useState(false);
  const doctorId = 3; // TODO: get from auth context
  const [availabilityType, setAvailabilityType] = useState<AvailabilityType>(AvailabilityType.CLINIC);
  const slotTypes = Object.values(SlotType);
  const slotOrder = { morning: 1, afternoon: 2, evening: 3 }
 const [availability, setAvailability] = useState<Record<string, { active: boolean; showToggle: boolean }>>(
  Object.fromEntries(daysOfWeek.map(day => [day, { active: true, showToggle: true }]))
);


  useEffect(() => {
    setLoading(true);
    getAvailability()
      .then((data) => setSlots(data))
      .finally(() => setLoading(false));
  }, []);


useEffect(() => {
  const updated = Object.fromEntries(
    daysOfWeek.map(day => {
      const daySlots = [...slots, ...pendingSlots].filter(
        s =>
          s.dayOfWeek?.toLowerCase() === day.toLowerCase() &&
          s.availabilityType === availabilityType
      )

      // Determine day state
      if (daySlots.length === 0) {
        return [day, { active: false, showToggle: false }]
      }

      const allActive = daySlots.every(s => s.isActive)
      const allInactive = daySlots.every(s => !s.isActive)
      const shouldShowToggle = allActive || allInactive

      return [day, { active: allActive, showToggle: shouldShowToggle }]
    })
  )

  setAvailability(updated as Record<string, { active: boolean; showToggle: boolean }>)
}, [slots, pendingSlots, availabilityType])


  const handleToggle = (day: string) => {
    // Toggle functionality if needed
  };

  const handleAddSlot = (day: string, slotType: SlotType) => {
    // Check in both saved and pending slots
    const allSlots = [...slots, ...pendingSlots];
    if (allSlots.some(s => s.dayOfWeek?.toLowerCase() === day.toLowerCase() && s.slotType === slotType && s.availabilityType === availabilityType)) return;
    
    const newSlot: Slot = {
      doctorId,
      dayOfWeek: day,
      startTime: null,
      endTime: null,
      isActive: true,
      availabilityType: availabilityType,
      slotType,
    };
    
    setPendingSlots((prev) => [...prev, newSlot]);
  };

  const handleRemoveSlot = (slotId: number | undefined, isPending: boolean = false) => {
    if (isPending) {
      // Remove from pending slots (not saved yet)
      setPendingSlots((prev) => prev.filter((s, index) => {
        // For pending slots without ID, use index-based removal
        return s.id !== slotId;
      }));
    } else {
      // Add to a delete queue or delete immediately
      if (!slotId) return;
      setSlots((prev) => prev.filter((s) => s.id !== slotId));
    }
  };
  
  const handleUpdateSlotTimes = (slot: Slot, startTime: string, endTime: string, isPending: boolean = false) => {
    const updatedSlot = {
      ...slot,
      startTime,
      endTime
    };
    
    if (isPending) {
      setPendingSlots((prev) => 
        prev.map(s => 
          s.dayOfWeek === slot.dayOfWeek && s.slotType === slot.slotType && s.availabilityType === slot.availabilityType
            ? updatedSlot 
            : s
        )
      );
    } else {
      setSlots((prev) => 
        prev.map(s => s.id === slot.id ? updatedSlot : s)
      );
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // 1. Delete removed slots
      const slotsToDelete = slots.filter(s => s.id && !slots.find(existing => existing.id === s.id));
      for (const slot of slotsToDelete) {
        if (slot.id) await deleteAvailability(slot.id);
      }

      // 2. Create new pending slots
      if (pendingSlots.length > 0) {
        const newSlotsData = await createAvailability(pendingSlots);
        setSlots((prev) => [...prev, ...newSlotsData]);
        setPendingSlots([]);
      }

      // 3. Update modified slots (those with changed times)
      // For now, we'll handle this by deleting and recreating
      const modifiedSlots = slots.filter(s => s.id && (s.startTime || s.endTime));
      for (const slot of modifiedSlots) {
        if (slot.id) {
          await deleteAvailability(slot.id);
          const payload = [{
            doctorId: slot.doctorId,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isActive: slot.isActive,
            availabilityType: slot.availabilityType,
            slotType: slot.slotType,
          }];
          await createAvailability(payload);
        }
      }

      // Refresh data
      const updatedData = await getAvailability();
      setSlots(updatedData);
    } catch (error) {
      console.error("Error saving availability:", error);
    } finally {
      setLoading(false);
    }
  };

  function formatTo12Hour(time: string) {
  if (!time) return ""
  const [hours, minutes] = time.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const adjustedHours = hours % 12 || 12
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`
}

const handleToggleSlot = async (slot: Slot, checked: boolean, isPending: boolean) => {
  // ✅ Optimistic UI update
  if (isPending) {
    setPendingSlots(prev =>
      prev.map(s => (s === slot ? { ...s, isActive: checked } : s))
    )
  } else {
    setSlots(prev =>
      prev.map(s => (s.id === slot.id ? { ...s, isActive: checked } : s))
    )
  }

  // ✅ Call backend only if the slot exists in DB (not pending)
  if (!isPending && slot.id) {
    try {
      
      
      const response = await ChangeSlotAvailability(slot.id,checked)
toast.success(
  `${formatTo12Hour(slot.startTime||"")} - ${formatTo12Hour(slot.endTime||"")} of ${
    slot.dayOfWeek
  } has been updated successfully`
)

    
      console.log(`✅ Slot ${slot.id} updated successfully`)
    } catch (error) {
      console.error("❌ Error updating slot:", error)

      // Optional rollback if the API fails
      setSlots(prev =>
        prev.map(s =>
          s.id === slot.id ? { ...s, isActive: !checked } : s
        )
      )
    }
  }
}


  return (
    <div className="w-full  mx-auto bg-[#f8f9f8] p-8 rounded-[16px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Set Your Availability</h2>
          <p className="text-sm text-gray-500">
            Manage your consultation hours and available days easily.
          </p>
        </div>
       
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-8 justify-center">
        <button 
          className={`${availabilityType === AvailabilityType.ONLINE ? 'bg-[#5fe089] text-black' : 'bg-gray-100 text-gray-600'} font-semibold px-6 py-2 rounded-full`}
          onClick={() => setAvailabilityType(AvailabilityType.ONLINE)}
        >
          Online consultation
        </button>
        <button 
          className={`${availabilityType === AvailabilityType.CLINIC ? 'bg-[#5fe089] text-black' : 'bg-gray-100 text-gray-600'} font-semibold px-6 py-2 rounded-full`}
          onClick={() => setAvailabilityType(AvailabilityType.CLINIC)}
        >
          In Clinic Availability
        </button>
      </div>

      {/* Weekly Schedule */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Weekly Schedule</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {daysOfWeek.map((day) => {
    const allSlots = [...slots, ...pendingSlots].filter(
      s => s.dayOfWeek?.toLowerCase() === day.toLowerCase() &&
           s.availabilityType === availabilityType
    )

    return (
      <div
        key={day}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-3"
      >
        {/* Day Header */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-1 mb-2">
  <h4 className="text-gray-800 font-semibold tracking-wide">{day}</h4>

{availability[day]?.showToggle && (
  <Switch
    checked={availability[day]?.active}
    onCheckedChange={async (checked) => {
      const daySlots = [...slots, ...pendingSlots].filter(
        (s) =>
          s.dayOfWeek?.toLowerCase() === day.toLowerCase() &&
          s.availabilityType === availabilityType
      )

      // Local state updates
      setSlots((prev) =>
        prev.map((s) =>
          s.dayOfWeek?.toLowerCase() === day.toLowerCase() &&
          s.availabilityType === availabilityType
            ? { ...s, isActive: checked }
            : s
        )
      )
      setPendingSlots((prev) =>
        prev.map((s) =>
          s.dayOfWeek?.toLowerCase() === day.toLowerCase() &&
          s.availabilityType === availabilityType
            ? { ...s, isActive: checked }
            : s
        )
      )
      setAvailability((prev) => ({
        ...prev,
        [day]: { ...prev[day], active: checked },
      }))

      // ✅ API Call


      try {

        
        const response =await ChangeDayAvailability(day,checked);
         toast.success(`Day ${day} updated successfully`);
        console.log(`✅ Day ${day} updated successfully`)
      } catch (error) {
        console.error("❌ Error updating day availability:", error)
        // Optionally rollback UI state here
        setAvailability((prev) => ({
          ...prev,
          [day]: { ...prev[day], active: !checked },
        }))
      }
    }}
    className="
      relative inline-flex h-6 w-11 items-center rounded-full
      transition-colors duration-200 ease-in-out
      data-[state=checked]:bg-[#5fe089]
      data-[state=unchecked]:bg-gray-300
      hover:brightness-95
      hover:cursor-pointer
    "
  >
    <span
      className="
        pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out
        translate-x-0
        data-[state=checked]:translate-x-5
      "
    />
  </Switch>
)}

</div>

        {/* Slot List */}
    <div className="space-y-3">
  {allSlots.length > 0 ? (
    [...allSlots]
      .sort((a, b) => {
        const slotOrder = { morning: 1, afternoon: 2, evening: 3 }
        return slotOrder[a.slotType] - slotOrder[b.slotType]
      })
      .map((slot) => {
        const isPending = !slot.id
        const label = slot.slotType.charAt(0).toUpperCase() + slot.slotType.slice(1)

        return (
          <div
            key={slot.slotType}
            className="bg-gray-50 rounded-xl p-3 flex flex-col gap-2 border border-gray-100"
          >
            {/* Slot Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span>{label}</span>
                {isPending && <span className="text-xs text-orange-500">(new)</span>}
              </div>

              <div className="flex flex-end gap-2">
                <Switch
                  checked={slot.isActive}
                  onCheckedChange={(checked) => handleToggleSlot(slot, checked, isPending)}
                  className="
                    relative inline-flex h-6 w-11 items-center rounded-full
                    transition-colors duration-200 ease-in-out
                    data-[state=checked]:bg-[#5fe089]
                    data-[state=unchecked]:bg-gray-300
                    hover:brightness-95
                    hover:cursor-pointer
                  "
                >
                  <span
                    className="
                      pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out
                      translate-x-0
                      data-[state=checked]:translate-x-5
                    "
                  />
                </Switch>
              </div>
            </div>

            {/* Time Inputs */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Start:</span>
                <input
                  type="time"
                  className="border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#5fe089]"
                  defaultValue={slot.startTime || ""}
                  onChange={(e) =>
                    handleUpdateSlotTimes(slot, e.target.value, slot.endTime || "", isPending)
                  }
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">End:</span>
                <input
                  type="time"
                  className="border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#5fe089]"
                  defaultValue={slot.endTime || ""}
                  onChange={(e) =>
                    handleUpdateSlotTimes(slot, slot.startTime || "", e.target.value, isPending)
                  }
                />
              </div>
            </div>
          </div>
        )
      })
  ) : (
    <p className="text-xs text-gray-400 italic">No slots added yet.</p>
  )}
</div>



        {/* Add New Slot */}
        <div className="mt-4">
          <select
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-600 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#5fe089]"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                handleAddSlot(day, e.target.value as SlotType)
                e.target.value = ""
              }
            }}
          >
            <option value="" disabled>
              + Add a new slot
            </option>
            {slotTypes
              .filter(
                (st) =>
                  !allSlots.some((s) => s.slotType === st)
              )
              .map((st) => (
                <option key={st} value={st}>
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </option>
              ))}
          </select>
        </div>
      </div>
    )
  })}
</div>


      {/* Action Buttons */}
      <div className="flex justify-end mt-10 gap-3">
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 bg-white px-6 rounded-full"
          onClick={() => {
            setPendingSlots([]);
            getAvailability().then((data) => setSlots(data));
          }}
        >
          Cancel
        </Button>
        <Button 
          className="bg-[#5fe089] text-black font-semibold px-6 rounded-full" 
          onClick={handleSaveChanges} 
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Availability;
