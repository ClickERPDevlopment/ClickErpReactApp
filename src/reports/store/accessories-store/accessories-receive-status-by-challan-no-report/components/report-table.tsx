import moment from "moment";
import { IAccessoriesReceiveStatusByChallanNoReport } from "../accessories-receive-status-by-challan-no-report-type";
export interface IReportTableProps {
  data: IAccessoriesReceiveStatusByChallanNoReport[];
}

const ReportTable: React.FC<IReportTableProps> = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <tr key={index} className="text-center">
          <td className="border border-gray-300 p-1">{item.BUYER_NAME}</td>
          <td className="border border-gray-300 p-1">{item.PONO}</td>
          <td className="border border-gray-300 p-1">{item.STYLENO}</td>
          <td className="border border-gray-300 p-1">{item.ITEM_NO}</td>
          <td className="border border-gray-300 p-1">
            {moment(item.RECEIVE_DATE).format("DD-MMM-YYYY")}
          </td>
          <td className="border border-gray-300 p-1">{item.ITEM_NAME}</td>
          <td className="border border-gray-300 p-1">{item.COLORNAME}</td>
          <td className="border border-gray-300 p-1">{item.SIZENAME}</td>
          <td className="border border-gray-300 p-1">{item.RECEIVE_QTY}</td>
        </tr>
      ))}
    </>
  );
};

export default ReportTable;
