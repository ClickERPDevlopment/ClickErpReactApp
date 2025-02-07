import React from 'react'
import ReportTable from './report-table';
function ReportGroup({ data, firstHeader }: { data: IAccessoriesReceiveStatusByChallanNoReport[], firstHeader: string[] | null }) {


    var uniqueKeys: Set<string> = new Set();

    function groupBy(data: IAccessoriesReceiveReturnChallanGatePassReport[], keys: string[]) {
        return data.reduce((result: any, item: any) => {
            const key = keys.map(k => item[k]).join('_');
            uniqueKeys.add(key);
            if (!result[key]) {
                result[key] = {
                    items: []
                };
            }
            result[key].items.push(item);

            return result;
        }, {});
    }

    interface IGroup {
        [key: string]: {
            items: IAccessoriesReceiveStatusByChallanNoReport[];
        };
    }

    var groupedData: IGroup = {};

    // if (data) {
    //     groupedData = groupBy(data, ['CHALLAN_NO', 'MATERIAL', 'UOM', 'MTL_SIZE', 'ML_COLOR_1']);
    // }

    var uniqueKeysArray: string[] = Array.from(uniqueKeys);


    const totalRcvQty = data.reduce((prev, curr) => prev + curr.RECEIVE_QTY, 0);


    return (
        <div className='mb-2 mt-2'>
            <table className='border-collapse border border-gray-300  w-[100%]'>
                <thead>
                    <tr className='bg-lime-200 text-center'>
                        {
                            firstHeader?.map(item => <th className='border border-gray-300 p-1'>{item}</th>)
                        }
                    </tr>
                </thead>
                <tbody>

                    <ReportTable data={data} />

                    <tr className='text-center font-bold'>
                        <td className='border border-gray-300 p-1' colSpan={8}>Total</td>
                        <td className='border border-gray-300 p-1'>{totalRcvQty}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default ReportGroup
