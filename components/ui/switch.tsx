"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // 🧭 Track styles
        "peer relative inline-flex h-[1.3rem] w-[2.6rem] shrink-0 items-center rounded-full border border-transparent transition-all shadow-xs outline-none",
        "data-[state=checked]:bg-[#5fe089] data-[state=unchecked]:bg-gray-300",
        "focus-visible:ring-[3px] focus-visible:ring-[#5fe089]/50 focus-visible:border-[#5fe089]",
        "hover:brightness-95 hover:cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // 🧭 Thumb styles
          "pointer-events-none block h-[1.1rem] w-[1.1rem] rounded-full bg-white shadow transition-transform duration-200 ease-in-out",
          // ✅ Move thumb fully to the right when checked
          "data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[calc(1.5rem)]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
