import moment from "moment";
import { SewingProductionStatusReportType } from "../sewing-production-status-report-type";
import { SewingHourlyProductionStatusReportType } from "../sewing-hourly-production-status-report-type";

function ReportTable({
  data,
  sewingHourlyProductionData,
  secondHeader,
}: {
  data: SewingProductionStatusReportType[];
  sewingHourlyProductionData: SewingHourlyProductionStatusReportType[];
  firstHeader: string[] | null;
  companyHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  const uniqueHoursKeys: Set<string> = new Set();

  sewingHourlyProductionData.forEach((item) => { uniqueHoursKeys.add(item.HOUR.toString()) })

  function groupBy(data: SewingProductionStatusReportType[]) {
    const grouped: IGroupedData = {};
    const grandTotal: IGrandTotal = {};
    const companyTotals: Record<string, number> = {};
    const finalTotal: IFinalTotal = { TARGET: 0 };

    data.forEach((item) => {
      const dateKey = moment(item.TARGETDATE).format("DD-MMM-YY");
      const companyKey = item.PREFIX || "Unknown";
      const floorKey = item.UNITNAME || "Unknown Floor";
      const target = Number(item.HOURLYTARGET);

      const hourlyPerUnit = Number(item.HOURLYTARGET) / Number(item.TARGETHOUR);
      const hourlyPerLine = Number(hourlyPerUnit) / Number(item.NO_OF_LINE);
      const availableMin = Number(item.AVAILMIN);
      const earnMin = Number(item.EARN_MIN);

      const operator = Number(item.OPERATOR);
      const actualHours = Number(item.ACTUALHOURS);

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          TARGET_DATE: dateKey,
          TARGET: 0,
          HOURLY_PER_UNIT: 0,
          HOURLY_PER_LINE: 0,
          OPERATOR: 0,
          ACTUALHOURS: 0,
          AVAILMIN: 0,
          EARN_MIN: 0,
          COMPANY: {},
        };
      }

      if (!grouped[dateKey].COMPANY[companyKey]) {

        grouped[dateKey].COMPANY[companyKey] = {
          FLOORS: {},
          COMPANY_TOTAL: 0,
          FACTORYID: 0,
          HOURLY_PER_LINE_TOTAL: 0,
          HOURLY_PER_UNIT_TOTAL: 0,
          AVAILMIN_TOTAL: 0,
          EARN_MIN_TOTAL: 0,
          OPERATOR_TOTAL: 0,
          ACTUALHOURS_TOTAL: 0,
        };
      }

      if (!grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey]) {
        grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey] = {
          TARGET: 0,
          HOURLY_PER_UNIT: 0,
          HOURLY_PER_LINE: 0,
          EARN_MIN: 0,
          AVAILMIN: 0,
          OPERATOR: 0,
          ACTUALHOURS: 0,
          FLOOR_ID: 0
        };
      }

      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].TARGET += target;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].HOURLY_PER_UNIT += hourlyPerUnit;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].HOURLY_PER_LINE += hourlyPerLine;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].OPERATOR += operator;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].AVAILMIN += availableMin;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].EARN_MIN += earnMin;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].ACTUALHOURS += actualHours;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].FLOOR_ID = item.FLOORID;

      grouped[dateKey].COMPANY[companyKey].COMPANY_TOTAL += target;
      grouped[dateKey].COMPANY[companyKey].HOURLY_PER_UNIT_TOTAL += hourlyPerUnit;
      grouped[dateKey].COMPANY[companyKey].HOURLY_PER_LINE_TOTAL += hourlyPerLine;
      grouped[dateKey].COMPANY[companyKey].OPERATOR_TOTAL += operator;
      grouped[dateKey].COMPANY[companyKey].AVAILMIN_TOTAL += availableMin;
      grouped[dateKey].COMPANY[companyKey].EARN_MIN_TOTAL += earnMin;
      grouped[dateKey].COMPANY[companyKey].ACTUALHOURS_TOTAL += actualHours;
      grouped[dateKey].COMPANY[companyKey].FACTORYID = item.FACTORYID;

      grouped[dateKey].TARGET += target;
      grouped[dateKey].HOURLY_PER_UNIT += hourlyPerUnit;
      grouped[dateKey].HOURLY_PER_LINE += hourlyPerLine;
      grouped[dateKey].OPERATOR += operator;
      grouped[dateKey].AVAILMIN += availableMin;
      grouped[dateKey].EARN_MIN += earnMin;
      grouped[dateKey].ACTUALHOURS += actualHours;

      if (!grandTotal[companyKey]) {
        grandTotal[companyKey] = {
          FLOORS: {},
          FACTORYID: 0,
          COMPANY_TOTAL: 0,
          HOURLY_PER_LINE_TOTAL: 0,
          HOURLY_PER_UNIT_TOTAL: 0,
          EARN_MIN_TOTAL: 0,
          AVAILMIN_TOTAL: 0,
          OPERATOR_TOTAL: 0,
          ACTUALHOURS_TOTAL: 0,
        };
      }

      if (!grandTotal[companyKey].FLOORS[floorKey]) {

        grandTotal[companyKey].FLOORS[floorKey] = {
          TARGET: 0,
          HOURLY_PER_UNIT: 0,
          HOURLY_PER_LINE: 0,
          AVAILMIN: 0,
          EARN_MIN: 0,
          OPERATOR: 0,
          ACTUALHOURS: 0,
          FLOOR_ID: 0
        };
      }

      grandTotal[companyKey].FLOORS[floorKey].TARGET += target;
      grandTotal[companyKey].COMPANY_TOTAL += target;

      companyTotals[companyKey] = (companyTotals[companyKey] || 0) + target;
      finalTotal.TARGET += target;

      uniqueKeys.add(dateKey);
    });

    return { grouped, grandTotal, finalTotal, companyTotals };
  }

  interface IFloorData {
    TARGET: number;
    HOURLY_PER_UNIT: number;
    HOURLY_PER_LINE: number;
    OPERATOR: number;
    ACTUALHOURS: number;
    AVAILMIN: number;
    EARN_MIN: number;
    FLOOR_ID: number;
  }

  interface ICompanyData {
    FLOORS: Record<string, IFloorData>;
    FACTORYID: number;
    COMPANY_TOTAL: number;
    HOURLY_PER_UNIT_TOTAL: number;
    HOURLY_PER_LINE_TOTAL: number;
    OPERATOR_TOTAL: number;
    ACTUALHOURS_TOTAL: number;
    AVAILMIN_TOTAL: number;
    EARN_MIN_TOTAL: number;
  }

  interface IGroupedData {
    [date: string]: {
      TARGET_DATE: string;
      TARGET: number;
      HOURLY_PER_UNIT: number;
      HOURLY_PER_LINE: number;
      OPERATOR: number;
      ACTUALHOURS: number;
      AVAILMIN: number;
      EARN_MIN: number;
      COMPANY: Record<string, ICompanyData>;
    };
  }

  interface IGrandTotal {
    [companyName: string]: ICompanyData;
  }

  interface IFinalTotal {
    TARGET: number;
  }

  const { grouped, grandTotal, finalTotal, companyTotals } = data
    ? groupBy(data)
    : {
      grouped: {},
      grandTotal: {},
      finalTotal: { TARGET: 0 },
      companyTotals: {},
    };

  console.log(finalTotal, companyTotals)

  const uniqueKeysArray = Array.from(uniqueKeys);

  const companyFloorData: {
    company: string;
    floor: string | null;
  }[] = [];

  Object.keys(grandTotal).forEach((company) => {
    Object.keys(grandTotal[company].FLOORS).forEach((floor) => {
      companyFloorData.push({ company, floor });
    });
    companyFloorData.push({ company, floor: null });
  });

  interface HourlyProductionData {
    byFloor: Record<number, Record<number, number>>;
    byFactory: Record<number, Record<number, number>>;
    byHour: Record<number, number>;
  }

  function organizeHourlyProductionData(
    data: SewingHourlyProductionStatusReportType[]
  ): HourlyProductionData {
    const result: HourlyProductionData = {
      byFloor: {},
      byFactory: {},
      byHour: {}
    };

    data.forEach(item => {
      const hour = item.HOUR;
      const floorId = item.FLOORID;
      const factoryId = item.FACTORYID;
      const output = item.SEWINGOUTPUT;

      if (!result.byFloor[hour]) result.byFloor[hour] = {};
      if (!result.byFactory[hour]) result.byFactory[hour] = {};
      if (!result.byHour[hour]) result.byHour[hour] = 0;

      result.byFloor[hour][floorId] = (result.byFloor[hour][floorId] || 0) + output;

      result.byFactory[hour][factoryId] = (result.byFactory[hour][factoryId] || 0) + output;

      result.byHour[hour] += output;
    });

    return result;
  }


  const organizedData = organizeHourlyProductionData(sewingHourlyProductionData);


  const getOrdinal = <T extends number | string>(value: T): string => {
    const num = Number(value);
    if (isNaN(num)) return String(value);

    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];

    return `${num}${suffix}`;
  };

  return (
    <div className="text-sm mt-3">
      <table className="border-collapse border border-gray-300 w-[100%]">
        <thead>
          <tr>
            <th

              rowSpan={2}
              className="border border-gray-300 p-1 text-center font-bold"
            >
              {
                moment(data[0]?.TARGETDATE).format("DD-MMM-YY")
              }
            </th>

            {Object.keys(grandTotal).map((company) => (
              <th
                key={`company-${company}`}
                colSpan={Object.keys(grandTotal[company].FLOORS).length + 1} // +1 for company total
                className="border border-gray-300 text-center font-bold"
              >
                {company}
              </th>
            ))}

            {secondHeader?.map((item, index) => (
              <th
                key={`second-${index}`}
                rowSpan={2}
                className="border border-gray-300 p-1 text-center font-bold"
              >
                {item}
              </th>
            ))}
          </tr>

          <tr>
            {Object.keys(grandTotal).map((company) => (
              <>
                {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                  <th
                    key={`${company}-${floor}`}
                    className="border border-gray-300 p-1 text-center font-bold"
                  >
                    {floor}
                  </th>
                ))}
                <th className="border border-gray-300 p-1 text-center font-bold">
                  Total
                </th>
              </>
            ))}
          </tr>
        </thead>

        <tbody>
          {uniqueKeysArray.map((dateKey) => (
            <>
              <tr key={dateKey}>
                <td className="border text-center border-gray-300 p-1 text-nowrap font-bold">
                  TARGET
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-300 p-1 text-center"
                        >
                          {companyData?.FLOORS?.[floor]?.TARGET?.toFixed(2) || "0.00"}
                        </td>
                      ))}
                      <td className="border border-gray-300 p-1 text-center font-bold">
                        {companyData?.COMPANY_TOTAL?.toFixed(2) || "0.00"}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-300 p-1 text-center font-bold">
                  {grouped[dateKey]?.TARGET.toFixed(2) || "0.00"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td className="border text-center border-gray-300 p-1 text-nowrap font-bold">
                  HOURLY/UNIT
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-300 p-1 text-center"
                        >
                          {(companyData?.FLOORS?.[floor]?.HOURLY_PER_UNIT)?.toFixed(2) || "0.00"}
                        </td>
                      ))}
                      <td className="border border-gray-300 p-1 text-center font-bold">
                        {companyData?.COMPANY_TOTAL?.toFixed(2) || "0.00"}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-300 p-1 text-center font-bold">
                  {grouped[dateKey]?.HOURLY_PER_UNIT.toFixed(2) || "0.00"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td className="border text-center border-gray-300 p-1 text-nowrap font-bold">
                  HOURLY/LINE
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-300 p-1 text-center"
                        >
                          {(companyData?.FLOORS?.[floor]?.HOURLY_PER_LINE)?.toFixed(2) || "0.00"}
                        </td>
                      ))}
                      <td className="border border-gray-300 p-1 text-center font-bold">
                        {companyData?.HOURLY_PER_LINE_TOTAL?.toFixed(2) || "0.00"}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-300 p-1 text-center font-bold">
                  {grouped[dateKey]?.HOURLY_PER_LINE.toFixed(2) || "0.00"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td className="border text-center border-gray-300 p-1 text-nowrap font-bold">
                  TGT EFF.
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-300 p-1 text-center"
                        >
                          {(companyData?.FLOORS?.[floor]?.EARN_MIN * 100 / companyData?.FLOORS?.[floor]?.AVAILMIN)?.toFixed(2) || "0.00"} %
                        </td>
                      ))}
                      <td className="border border-gray-300 p-1 text-center font-bold">
                        {(companyData?.EARN_MIN_TOTAL * 100 / companyData.AVAILMIN_TOTAL)?.toFixed(2) || "0.00"} %
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-300 p-1 text-center font-bold">
                  {(grouped[dateKey]?.EARN_MIN * 100 / grouped[dateKey].AVAILMIN)?.toFixed(2) || "0.00"} %
                </td>
              </tr>


              <tr key={dateKey}>
                <td className="border text-center border-gray-300 p-1 text-nowrap font-bold">
                  RUN MACHINE
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-300 p-1 text-center"
                        >
                          {(companyData?.FLOORS?.[floor]?.OPERATOR)?.toFixed(2) || "0.00"}
                        </td>
                      ))}
                      <td className="border border-gray-300 p-1 text-center font-bold">
                        {companyData?.OPERATOR_TOTAL?.toFixed(2) || "0.00"}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-300 p-1 text-center font-bold">
                  {grouped[dateKey]?.OPERATOR.toFixed(2) || "0.00"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td className="border text-center border-gray-300 p-1 text-nowrap font-bold">
                  W/H
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-300 p-1 text-center"
                        >
                          {(companyData?.FLOORS?.[floor]?.ACTUALHOURS)?.toFixed(2) || "0.00"}
                        </td>
                      ))}
                      <td className="border border-gray-300 p-1 text-center font-bold">
                        {companyData?.ACTUALHOURS_TOTAL?.toFixed(2) || "0.00"}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-300 p-1 text-center font-bold">
                  {grouped[dateKey]?.ACTUALHOURS.toFixed(2) || "0.00"}
                </td>
              </tr>


              {
                Array.from(uniqueHoursKeys).map(item => {
                  return <>
                    <tr key={dateKey}>

                      <td className="border text-center border-gray-300 p-1 text-nowrap font-bold">
                        {getOrdinal(item)}
                      </td>

                      {Object.keys(grandTotal).map((company) => {
                        const companyData = grouped[dateKey]?.COMPANY?.[company];
                        return (
                          <>
                            {Object.keys(grandTotal[company].FLOORS).map((floor) => {
                              return <td
                                key={`${dateKey}-${company}-${floor}`}
                                className="border border-gray-300 p-1 text-center"
                              >
                                {

                                }
                                {organizedData.byFloor[Number(item)][companyData?.FLOORS?.[floor]?.FLOOR_ID ?? 0] || 0}
                              </td>
                            })}
                            <td className="border border-gray-300 p-1 text-center font-bold">
                              {organizedData.byFactory[Number(item)][companyData?.FACTORYID ?? 0] || 0}
                            </td>
                          </>
                        );
                      })}

                      <td className="border border-gray-300 p-1 text-center font-bold">
                        {organizedData.byHour[Number(item)] || 0}
                      </td>
                    </tr>
                  </>
                })
              }

            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;