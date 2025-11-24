import React, { Suspense } from "react";
import IndividualMeetingRoom from "@/components/ui/call/ClientMeetingRoom";

export default function CallPage() {
  return (
    <Suspense fallback={<div>Loading meeting...</div>}>
      <IndividualMeetingRoom />
    </Suspense>
  );
}
