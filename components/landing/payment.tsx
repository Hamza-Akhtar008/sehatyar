"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Method = "card" | "easypaisa" | "jazzcash" | "bank";

const GREEN = "#5FE089";

export default function Payment() {
  const [method, setMethod] = useState<Method>("card");

  const methods: Array<{
    id: Method;
    label: string;
    icon: string;
    sub?: string;
  }> = [
    { id: "card", label: "Credit or Debit Card", icon: "/visa.svg" },
    { id: "easypaisa", label: "EasyPaisa", icon: "/easypaisa.svg" },
    { id: "jazzcash", label: "Jazz Cash", icon: "/jazzcash.svg" },
    { id: "bank", label: "Bank Transfer", icon: "/bank.svg" },
  ];

  return (
    <main className="w-full">
      <section className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
          {/* Left: Payment methods */}
          <Card className="rounded-2xl bg-[#F8F8F8]">
            <CardContent className="p-4 md:p-6">
              <div className="text-[16px] md:text-[18px] font-semibold text-[#414141] mb-4">
                Choose a new payment method
              </div>

              <div className="space-y-4">
                {methods.map((m) => {
                  const active = method === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={`flex items-center justify-between w-full rounded-[12px] border px-4 py-4 transition-colors text-left ${
                        active ? "border-[#01503F] bg-white" : "border-[#01503F] bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={m.icon}
                          alt={m.label}
                          width={36}
                          height={24}
                          className="object-contain"
                        />
                        <span className="text-[14px] md:text-[15px] text-[#414141]">{m.label}</span>
                      </div>
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                          active ? "border-[#01503F]" : "border-[#D1D5DB]"
                        }`}
                        aria-hidden
                      >
                        {active && (
                          <span className="h-2.5 w-2.5 rounded-full bg-[#01503F]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Right: Payment details */}
          <Card className="rounded-2xl bg-[#F8F8F8]">
            <CardContent className="p-4 md:p-6">
              <div className="text-[18px] font-semibold text-[#414141] mb-4">Payment Details</div>

              <div className="space-y-3 text-[14px] text-[#414141]">
                <div className="flex items-center justify-between">
                  <span>Original Fee</span>
                  <span>Rs. 5,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Payable</span>
                  <span>Rs. 5,000</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  className="w-full h-11 rounded-full text-[14px] font-medium"
                  style={{ backgroundColor: GREEN, color: "#0A0A0A" }}
                >
                  Pay Rs. 5000
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
