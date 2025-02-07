import moment from 'moment';
import React from 'react';

interface IReportTableProps {
  data: IAccessoriesReceiveStatusByChallanNoReport[];
}

const ReportTable: React.FC<IReportTableProps> = ({ data }) => {

  const totalRcvQty = data.reduce((prev, curr) => prev + curr.RECEIVE_QTY, 0);

  return (
    <>
      {
        data.map((item, index) => (
          <tr key={index} className='text-center'>
            <td className='border border-gray-300 p-1'>{item.BUYER_NAME}</td>
            <td className='border border-gray-300 p-1'>{item.PONO}</td>
            <td className='border border-gray-300 p-1'>{item.STYLENO}</td>
            <td className='border border-gray-300 p-1'>{item.ITEM_NO}</td>
            <td className='border border-gray-300 p-1'>{moment(item.RECEIVE_DATE).format('DD-MMM-YYYY')}</td>
            <td className='border border-gray-300 p-1'>{item.ITEM_NAME}</td>
            <td className='border border-gray-300 p-1'>{item.COLORNAME}</td>
            <td className='border border-gray-300 p-1'>{item.SIZENAME}</td>
            <td className='border border-gray-300 p-1'>{item.RECEIVE_QTY}</td>
          </tr>
        ))
      }
    </>
  );
};

export default ReportTable;
