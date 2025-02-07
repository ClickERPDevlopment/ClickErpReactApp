import React from 'react'
import ReportTable from './report-table';
import moment from 'moment';
import ReportFooter from './report-footer';
import ReportHeader from './report-header';

function Report({data}:{data:iaccWorkOrder[]}) {



    // data.forEach(element => {
    //     if(element.GMT_SIZE_NAME==null||element.GMT_SIZE_NAME=="")
    //     {
    //         element.GMT_SIZE_NAME = "ALL SIZE";
    //     }
    // });


    var uniqueKeys:Set<string> = new Set();

    function groupBy(data:iaccWorkOrder[], keys:string[]) {
        return data.reduce((result:any, item:any) => {
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

    interface GroupedByBuyer {
        [key: string]: {
            items: iaccWorkOrder[];
        };
    }

    var groupedByBuyer :GroupedByBuyer = {};

    if(data)
    {
        groupedByBuyer = groupBy(data, ['BUYER_NAME','BRAND_NAME']);
    }

    var uniqueKeysArray:string[] = Array.from(uniqueKeys);

    //set table header 
    var firstHeader = ["ART. NO","ORDER NO","PRODUCT DEPT.","ITEM", "GMT COLOR"];
    var secondHeader = ["TTL","UOM","RATE","AMOUNT", "ITEM DESCRIPTION", "QUALITY"];

    var uniqueSizes:Set<string> = new Set();

    data.forEach(item=>{
        if(item.GMT_SIZE_NAME!=null) uniqueSizes.add(item.GMT_SIZE_NAME);
    })

   var sizeHeader = Array.from(uniqueSizes);

   var header = firstHeader.concat(sizeHeader).concat(secondHeader);

    return (
        <div className='container'>
            <div className='p-2'>
                <ReportHeader masterData={data[0]}/>

                {uniqueKeysArray?.map((key) => (
                <ReportTable key={key} data={groupedByBuyer[key].items} firstHeader = {firstHeader} sizeHeader={sizeHeader} secondHeader = {secondHeader}></ReportTable>
                ))}

                <div>
                  <p className='mt-2'><span className='font-bold'>Rmarks: </span>{data[0]?.REMARKS}</p>
                </div>

                <div>
                    <ReportFooter masterData={data[0]}></ReportFooter>
                </div>
            </div>
        </div>
     )  
}

export default Report
