'use client';
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddHospital } from "@/lib/Api/Hospital/Api";
import { useAuth } from "@/src/contexts/AuthContext";


interface HospitalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onHospitalAdded: (hospital: any) => void;
}

export default function HospitalModal({ isOpen, onClose, onHospitalAdded }: HospitalModalProps) {
    const {user}=useAuth();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        isClinic: false,
        
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.name || !formData.address || !formData.phone) {
            alert("Please fill all required fields.");
            return;
        }

        setLoading(true);
        try {
            const newHospital = await AddHospital(formData.name,formData.address,formData.phone,formData.isClinic,user?.doctorId);
            onHospitalAdded(newHospital);
            onClose();
        } catch (error) {
            console.error("Error adding hospital:", error);
            alert("Failed to add hospital");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Hospital / Clinic</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-3">
                    <Input
                        placeholder="Hospital or Clinic Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    <Input
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <label className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            checked={formData.isClinic}
                            onChange={(e) => setFormData({ ...formData, isClinic: e.target.checked })}
                        />
                        <span>This is a clinic</span>
                    </label>
                </div>

                <DialogFooter className="mt-4">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Add"}
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
