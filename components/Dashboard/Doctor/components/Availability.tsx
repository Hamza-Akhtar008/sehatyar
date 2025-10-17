"use client";
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { getAvailability, createAvailability, deleteAvailability } from '@/lib/Api/availability';
import { AvailabilityType, SlotType } from "@/src/types/enums";

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

  useEffect(() => {
    setLoading(true);
    getAvailability()
      .then((data) => setSlots(data))
      .finally(() => setLoading(false));
  }, []);

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
        <Button className="bg-[#5fe089] text-black font-medium rounded-full">
          + Edit Availability
        </Button>
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
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-gray-800 font-medium">{day}</h4>
              <Switch
                checked={true} // availability[day].active}
                onCheckedChange={() => handleToggle(day)}
                className="data-[state=checked]:bg-[#5fe089]"
              />
            </div>

            {/* Backend-driven slots with time selection */}
            {slotTypes.map((slotType) => {
              // Check in both saved and pending slots
              const allSlots = [...slots, ...pendingSlots];
              const slot = allSlots.find(s => 
                s.dayOfWeek?.toLowerCase() === day.toLowerCase() && 
                s.slotType === slotType && 
                s.availabilityType === availabilityType
              );
              
              const isPending = !slot?.id; // If no ID, it's a pending slot
              
              return slot ? (
                <div key={slotType} className="flex flex-col mb-3">
                  <div className="inline-flex items-center bg-[#e6e4e4] text-[#52525B] rounded-full px-4 py-2 text-sm mr-2 mb-2">
                    {slotType.charAt(0).toUpperCase() + slotType.slice(1)}
                    {isPending && <span className="ml-2 text-xs text-orange-500">(new)</span>}
                    <button onClick={() => handleRemoveSlot(slot.id, isPending)} className="ml-2 text-xs text-red-500">×</button>
                  </div>
                  
                  {/* Time selection */}
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-1">Start:</span>
                      <input
                        type="time"
                        className="border rounded px-2 py-1 text-xs"
                        defaultValue={slot.startTime || undefined}
                        onChange={(e) => {
                          if (e.target.value) {
                            handleUpdateSlotTimes(slot, e.target.value, slot.endTime || "", isPending);
                          }
                        }}
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-1">End:</span>
                      <input
                        type="time"
                        className="border rounded px-2 py-1 text-xs"
                        defaultValue={slot.endTime || undefined}
                        onChange={(e) => {
                          if (e.target.value) {
                            handleUpdateSlotTimes(slot, slot.startTime || "", e.target.value, isPending);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : null;
            })}

            {/* Add slotType dropdown */}
            <div className="mt-2">
              <select
                className="border rounded px-2 py-1 text-xs"
                defaultValue=""
                onChange={e => {
                  if (e.target.value) {
                    handleAddSlot(day, e.target.value as SlotType);
                    e.target.value = "";
                  }
                }}
              >
                <option value="" disabled>Add time slot</option>
                {slotTypes.filter(st => {
                  const allSlots = [...slots, ...pendingSlots];
                  return !allSlots.some(s => 
                    s.dayOfWeek?.toLowerCase() === day.toLowerCase() && 
                    s.slotType === st && 
                    s.availabilityType === availabilityType
                  );
                }).map(st => (
                  <option key={st} value={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
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
