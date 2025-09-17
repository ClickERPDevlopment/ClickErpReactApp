import { SupplierWiseEmbStockColorWiseReportType } from "../supplier-wise-emb-stock-color-wise-report-type";

function ReportSubgroup({
  data,
}: {
  data: SupplierWiseEmbStockColorWiseReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const pRcv = data?.reduce((acc, item) => acc + item.P_RECEIVEQTY, 0)
  const eRcv = data?.reduce((acc, item) => acc + item.E_RECEIVEQTY, 0)
  const peRcv = data?.reduce((acc, item) => acc + item.PE_RECEIVEQTY, 0)
  const wRcv = data?.reduce((acc, item) => acc + item.W_RECEIVEQTY, 0)

  const pProcess = data?.reduce((acc, item) => acc + item.P_PROCESS_QTY, 0)
  const eProcess = data?.reduce((acc, item) => acc + item.E_PROCESS_QTY, 0)
  const peProcess = data?.reduce((acc, item) => acc + item.PE_PROCESS_QTY, 0)
  const wProcess = data?.reduce((acc, item) => acc + item.W_PROCESS_QTY, 0)

  const pStock = data?.reduce((acc, item) => acc + item.P_STOCK, 0)
  const eStock = data?.reduce((acc, item) => acc + item.E_STOCK, 0)
  const peStock = data?.reduce((acc, item) => acc + item.PE_STOCK, 0)
  const wStock = data?.reduce((acc, item) => acc + item.W_STOCK, 0)

  const orderQty = data?.reduce((acc, item) => acc + item.ORDQTY, 0)

  return (
    <>
      <tr style={{ fontSize: "12px" }} className="font-light">
        <td className="border border-gray-950 p-0.1">{data[0]?.BUYER}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.STYLENO}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.STYLENAME}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.PONO}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.COLORNAME}</td>
        <td className="border border-gray-950 p-0.1 text-center">{orderQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{pRcv.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{eRcv.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{peRcv.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{wRcv.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{pProcess.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{eProcess.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{peProcess.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{wProcess.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{pStock.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{eStock.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{peStock.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1 text-center">{wStock.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{ }</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
