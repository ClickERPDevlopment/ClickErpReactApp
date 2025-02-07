import React from 'react'
import ReportTable from './report-table';

function ReportSubgroup({ data, searchParams }: { data: IStyleWiseAvgEfficiencyReport[], searchParams: { toDate: any, fromDate: any } }) {

    var uniqueKeys: Set<string> = new Set();

    function groupBy(data: IStyleWiseAvgEfficiencyReport[], keys: string[]) {
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

    interface GroupedByStyle {
        [key: string]: {
            items: IStyleWiseAvgEfficiencyReport[];
        };
    }

    var groupedByStyle: GroupedByStyle = {};

    if (data) {
        groupedByStyle = groupBy(data, ['STYLENO']);
    }

    var uniqueKeysArray: string[] = Array.from(uniqueKeys);

    return (
        <>
            {
                uniqueKeysArray?.map((key) => (
                    <ReportTable key={key} data={groupedByStyle[key].items}></ReportTable>
                ))
            }
        </>
    )
}

export default ReportSubgroup
