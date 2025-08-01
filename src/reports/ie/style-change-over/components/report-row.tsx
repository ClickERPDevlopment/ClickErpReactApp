import moment from "moment";
import { IStyleChangeOver } from "../style-change-over-type";

function Reportrow({ data }: { data: IStyleChangeOver[] }) {
  return (
    <>
      {data.map((item, index) => (
        <tr className="text-center text-sm">
          {index == 0 && (
            <td
              className="border border-gray-300 p-0.1 text-nowrap"
              rowSpan={data.length}
            >
              {moment(item.ENTRY_DATE).format("DD-MMM-YYYY")}
            </td>
          )}
          <td className="border border-gray-300 p-0.5">{item.LINE_NAME}</td>
          <td className="border border-gray-300 p-0.5">{item.BUYER_NAME}</td>
          <td className="border border-gray-300 p-0.5">{item.STYLE_NO}</td>
          <td className="border border-gray-300 p-0.5">{item.PO_NO}</td>
          <td className="border border-gray-300 p-0.5">{item.SMV}</td>
          <td className="border border-gray-300 p-0.5 text-nowrap">
            {moment(item.LAYOUT_START_TIME).format("DD-MMM-YYYY hh:mm A")}
          </td>
          <td className="border border-gray-300 p-0.5 text-nowrap">
            {moment(item.LAYOUT_END_TIME).format("DD-MMM-YYYY hh:mm A")}
          </td>
          <td className="border border-gray-300 p-0.5">
            {item.TOTAL_TIME}
            {/* {
                                (() => {
                                    const startTime = new Date(item.LAYOUT_START_TIME).getTime();
                                    const endTime = new Date(item.LAYOUT_END_TIME).getTime();

                                    if (!isNaN(startTime) && !isNaN(endTime)) {
                                        const diffInMs = endTime - startTime;

                                        const hours = Math.floor(diffInMs / (1000 * 60 * 60));
                                        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

                                        return `${hours}h ${minutes}m`;
                                    } else {
                                        return 'Invalid date';
                                    }
                                })()
                            } */}
          </td>

          <td className="border border-gray-300p-0.5">{item.PRODUCTION_TYPE}</td>

          <td className="border border-gray-300 p-0.5">{item.OPERATOR}</td>
          <td className="border border-gray-300 p-0.5">{item.HP}</td>
          <td className="border border-gray-300 p-0.5">{item.IRON_MAN}</td>
          <td className="border border-gray-300 p-0.5 text-center">
            {Number(item.OPERATOR) + Number(item.HP) + Number(item.IRON_MAN)}
          </td>
          <td className="border border-gray-300 p-0.5">{item.REASON}</td>
          <td className="border border-gray-300 p-0.5">{item.TECHNICIAN_NAME}</td>
          <td className="border border-gray-300 p-0.5">{item.REMARKS}</td>
        </tr>
      ))}
    </>
  );
}

export default Reportrow;
