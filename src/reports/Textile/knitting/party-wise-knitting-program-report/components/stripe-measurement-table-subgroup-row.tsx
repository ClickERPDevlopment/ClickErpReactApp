import { PartyWiseKnittingProgramStripeMeasurementType } from "../stripe-measurement-type";

function StripeMeasurementTableSubGroupRow({
  data,
}: {
  data: PartyWiseKnittingProgramStripeMeasurementType[];
}) {


  const totalFeeder = data.reduce((acc, item) => acc + item.FEEDER, 0)
  const totalStripeMeasure = data.reduce((acc, item) => acc + item.STRIPE_MEASUREMENT, 0)

  return (
    <>
      <tr style={{ fontSize: "11px" }}>
        <td className="border border-gray-950 p-0.5">{data[0]?.GMT_PARTS}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.GMT_COLOR}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_COLOR}</td>
        <td className="border border-gray-950 p-0.5">{totalFeeder.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalStripeMeasure.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.UNIT}</td>
      </tr>
    </>
  );
}

export default StripeMeasurementTableSubGroupRow;
