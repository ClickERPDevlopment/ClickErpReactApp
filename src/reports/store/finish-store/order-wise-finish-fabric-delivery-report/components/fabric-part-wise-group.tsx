import React from "react";
import ColorPoStyleWiseRow from "./color-po-style-wise-row";

interface props {
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
  lstBooking: OrderWiseFFDeliveryBookingDto[];
}

export default function FabricPartWiseGroup({
  lstAllocation,
  lstBooking,
}: props) {
  var fabricPartIds: number[] = [];

  lstAllocation?.forEach((e) => {
    if (!fabricPartIds.includes(e.FABRIC_PART_ID)) {
      fabricPartIds.push(e.FABRIC_PART_ID);
    }
  });

  return (
    <>
      {fabricPartIds.map((id) => (
        <ColorPoStyleWiseRow
          lstAllocation={lstAllocation.filter((d) => d.FABRIC_PART_ID === id)}
          lstBooking={lstBooking.filter((d) => d.FABRIC_PART_ID === id)}
        />
      ))}
    </>
  );
}
