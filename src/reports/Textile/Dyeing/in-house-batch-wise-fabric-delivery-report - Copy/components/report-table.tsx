import moment from "moment";
import { IInHouseBatchWiseFabricDeliveryReport } from "../in-house-batch-wise-fabric-delivery-report-type";
export interface IReportTableProps {
  data: IInHouseBatchWiseFabricDeliveryReport[];
}


const ReportTable: React.FC<IReportTableProps> = ({ data }) => {

  const totalBatchQtyKg = data.reduce((acc, item) => acc + item.BATCH_QTY_KG, 0);
  const totalGreyWeight = data.reduce((acc, item) => acc + item.GREY_WEIGHT, 0);
  const totalFinishQty = data.reduce((acc, item) => acc + item.FINISH_QUANTITY, 0);
  const totalProcessLoss = data.reduce((acc, item) => acc + item.PROCESS_LOSS, 0);

  return (
    <>
      {data.map((item, index) => (
        <tr key={index} className="text-center">
          {
            moment(item.PRODUCTION_DATE).format("DD-MMM-YY") === "01-Jan-01" ? (
              <td className="border border-gray-300"></td>
            ) : (
              <td className="border border-gray-300">{moment(item.PRODUCTION_DATE).format("DD-MMM-YY")}</td>
            )
          }
          <td className="border border-gray-300">{item.BUYER}</td>
          <td className="border border-gray-300">{item.STYLE}</td>
          <td className="border border-gray-300">{item.PONO}</td>
          <td className="border border-gray-300">{item.COLORNAME}</td>
          <td className="border border-gray-300">{item.FABRIC}</td>
          <td className="border border-gray-300">{item.GSM}</td>
          <td className="border border-gray-300">{item.BATCH_NO}</td>
          <td className="border border-gray-300">{item.BATCH_QTY_KG}</td>
          {
            moment(item.CHALLAN_DATE).format("DD-MMM-YY") === "01-Jan-01" ? (
              <td className="border border-gray-300"></td>
            ) : (
              <td className="border border-gray-300">{moment(item.CHALLAN_DATE).format("DD-MMM-YY")}</td>
            )
          }
          <td className="border border-gray-300">{item.CHALLAN_NO}</td>
          <td className="border border-gray-300">{item.GREY_WEIGHT}</td>
          <td className="border border-gray-300">{item.FINISH_QUANTITY}</td>
          <td className="border border-gray-300">{item.PROCESS_LOSS}</td>
        </tr>
      ))}
      <tr className="text-center font-bold">
        <td className="border border-gray-300" colSpan={8}>
          Total
        </td>
        <td className="border border-gray-300">{totalBatchQtyKg.toFixed(3)}</td>
        <td className="border border-gray-300"></td>
        <td className="border border-gray-300"></td>
        <td className="border border-gray-300">{totalGreyWeight.toFixed(3)}</td>
        <td className="border border-gray-300">{totalFinishQty.toFixed(3)}</td>
        <td className="border border-gray-300">{(totalProcessLoss / data.length).toFixed(3)}</td>
      </tr>
    </>
  );
};

export default ReportTable;
