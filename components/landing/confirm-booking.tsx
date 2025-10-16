"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const GREEN = "#5FE089";

export default function ConfirmBooking() {
  const router = useRouter();
  const [self, setSelf] = useState(true);
  const [payment, setPayment] = useState<"online">("online");

  return (
    <main className="w-full">
      <section className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
          {/* Left: Form */}
          <Card className="rounded-2xl bg-[#F8F8F8]">
            <CardContent className="p-4 md:p-6">
              <div className="text-[18px] md:text-[16px] font-semibold text-[#414141] mb-3">
                Appointment For
              </div>

              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setSelf(true)}
                  className={`px-3 py-1.5 rounded-[12px] text-[14px] font-[600px]  ${
                    self
                      ? "bg-[#5FE089] text-[#414141] "
                      : "bg-white text-[#6B7280] "
                  }`}
                >
                  My Self
                </button>
                <button
                  type="button"
                  onClick={() => setSelf(false)}
                  className={`px-3 py-1.5 rounded-[12px] text-[14px] font-[600px]  ${
                    !self
                      ? "bg-[#5FE089] text-[#414141] "
                      : "bg-white text-[#414141] "
                  }`}
                >
                  + Someone else
                </button>
              </div>

              <div className="space-y-4 rounded-2xl border border-[#E5E7EB] p-4 md:p-6">
                <div className="space-y-2">
                  <Label className="text-[14px] font-semibold text-[#414141]">Patient Name</Label>
                  <Input
                    placeholder="Enter Your Name"
                    className="h-11 rounded-[12px] border-[#E5E7EB] text-[14px] placeholder:text-[#9CA3AF]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[14px] font-semibold text-[#414141]">Phone Number</Label>
                  <Input
                    placeholder="03XX-XXXXXXX"
                    className="h-11 rounded-[12px] border-[#E5E7EB] text-[14px] placeholder:text-[#9CA3AF]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[14px] font-semibold text-[#414141]">Select Payment Method</Label>
                  <button
                    type="button"
                    onClick={() => setPayment("online")}
                    className={`flex items-center justify-between w-full h-12 rounded-[12px] border mt-6 px-4 text-[14px] ${
                      payment === "online"
                        ? "bg-white border-[#01503F]"
                        : "bg-white border-[#01503F]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex h-4 w-4 items-center justify-center rounded-full border ${
                          payment === "online"
                            ? "bg-white border-[#01503F]"
                            : "bg-white border-[#D1D5DB]"
                        }`}
                      >
                        {payment === "online" && (
                          <span className="h-2.5 w-2.5 rounded-full bg-[#01503F]" />
                        )}
                      </span>
                      <span className="text-[#414141]">Online Payment</span>
                    </div>
                    <span className="text-[#414141]">Rs. 5,000</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: Doctor summary */}
          <Card className="rounded-2xl bg-[#F8F8F8]">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src="/images/doctors/d7.png"
                    alt="Doctor profile"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[22px] font-semibold text-[#414141]">Dr. Attia Tabassum</div>
                  <div className="text-[14px] text-[#52525B]">
                    General Surgeon, Breast Surgeon
                  </div>
                  <div className="text-[14px] text-[#52525B]">
                    Video consultation: Rs. 5,000
                  </div>
                   <div className="inline-flex mt-4 items-center rounded-full px-4 py-2 text-[14px] font-medium text-[#111827]" style={{ background: '#EEEEEE' }}>
                  Oct 10, 2:00 PM
                </div>
                </div>
              </div>

             

        <div className="mt-5">
                <Button
                  className="w-full h-10 rounded-full text-[14px] font-medium"
                  style={{ backgroundColor: GREEN, color: "#0A0A0A" }}
          onClick={() => router.push("/book-appointment/payment")}
                >
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
