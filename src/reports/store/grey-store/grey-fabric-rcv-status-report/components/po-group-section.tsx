import { IGreyReceiveStatusReportDto } from "./IGreyFabricStock";
import TableRow from "./table-rows";
// import TotalRow from "./total-row";

type props = {
  data: IGreyReceiveStatusReportDto[]
  buyerIndex: number
  poStyleIndex: number
}

export default function PoGroupSection({ data, buyerIndex, poStyleIndex }: props) {
  return (
    <>
      {data.map((f, key) => (
        <TableRow
          key={key}
          rowIndex={key}
          data={f}
          buyerIndex={buyerIndex}
          poStyleIndex={poStyleIndex} />))}

      {/* <TotalRow data={data} title={`${data[0]?.PO_NO} -Total`} /> */}
    </>

  );
}
