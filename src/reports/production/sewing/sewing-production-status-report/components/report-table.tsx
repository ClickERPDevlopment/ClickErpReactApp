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
      const numberOfLine = Number(item.NO_OF_LINE);

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
          NO_OF_LINE: 0,
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
          NO_OF_LINE: 0
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
          FLOOR_ID: 0,
          NO_OF_LINE: 0
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
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].NO_OF_LINE += numberOfLine;

      grouped[dateKey].COMPANY[companyKey].COMPANY_TOTAL += target;
      grouped[dateKey].COMPANY[companyKey].HOURLY_PER_UNIT_TOTAL += hourlyPerUnit;
      grouped[dateKey].COMPANY[companyKey].HOURLY_PER_LINE_TOTAL += hourlyPerLine;
      grouped[dateKey].COMPANY[companyKey].OPERATOR_TOTAL += operator;
      grouped[dateKey].COMPANY[companyKey].AVAILMIN_TOTAL += availableMin;
      grouped[dateKey].COMPANY[companyKey].EARN_MIN_TOTAL += earnMin;
      grouped[dateKey].COMPANY[companyKey].ACTUALHOURS_TOTAL += actualHours;
      grouped[dateKey].COMPANY[companyKey].FACTORYID = item.FACTORYID;
      grouped[dateKey].COMPANY[companyKey].NO_OF_LINE += numberOfLine;

      grouped[dateKey].TARGET += target;
      grouped[dateKey].HOURLY_PER_UNIT += hourlyPerUnit;
      grouped[dateKey].HOURLY_PER_LINE += hourlyPerLine;
      grouped[dateKey].OPERATOR += operator;
      grouped[dateKey].AVAILMIN += availableMin;
      grouped[dateKey].EARN_MIN += earnMin;
      grouped[dateKey].ACTUALHOURS += actualHours;
      grouped[dateKey].NO_OF_LINE += numberOfLine;

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
          NO_OF_LINE: 0,
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
          FLOOR_ID: 0,
          NO_OF_LINE: 0
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
    NO_OF_LINE: number;
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
    NO_OF_LINE: number;
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
      NO_OF_LINE: number;
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
    byFloorTotal: Record<number, number>;
    byFactoryTotal: Record<number, number>;
    grandTotal: number;
  }

  function organizeHourlyProductionData(
    data: SewingHourlyProductionStatusReportType[]
  ): HourlyProductionData {
    const result: HourlyProductionData = {
      byFloor: {},
      byFactory: {},
      byHour: {},
      byFloorTotal: {},
      byFactoryTotal: {},
      grandTotal: 0
    };

    data.forEach(item => {
      const hour = item.HOUR;
      const floorId = item.FLOORID;
      const factoryId = item.FACTORYID;
      const output = item.SEWINGOUTPUT;

      if (!result.byFloor[hour]) result.byFloor[hour] = {};
      if (!result.byFactory[hour]) result.byFactory[hour] = {};
      if (!result.byHour[hour]) result.byHour[hour] = 0;
      if (!result.byFloorTotal[floorId]) result.byFloorTotal[floorId] = 0;
      if (!result.byFactoryTotal[factoryId]) result.byFactoryTotal[factoryId] = 0;

      result.byFloor[hour][floorId] = (result.byFloor[hour][floorId] || 0) + output;

      result.byFactory[hour][factoryId] = (result.byFactory[hour][factoryId] || 0) + output;

      result.byHour[hour] += output;

      result.byFloorTotal[floorId] += output;

      result.byFactoryTotal[factoryId] += output;

      result.grandTotal += output;

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

  let totalLine = 0;
  let totalFloor = 0;
  let grandTotalHourly = 0;


  const getFactoryColor = (factoryName: string): string => {
    let hash = 0;
    for (let i = 0; i < factoryName.length; i++) {
      hash = factoryName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 80%, 90%)`;
  };

  return (
    <div className="text-sm mt-3">
      <table className="border-collapse border border-gray-950 w-[100%]">
        <thead>
          <tr>
            <th

              rowSpan={2}
              className="border border-gray-950 p-1 text-center font-bold"
            >
              {
                moment(data[0]?.TARGETDATE).format("DD-MMM-YY")
              }
            </th>

            {Object.keys(grandTotal).map((company) => {
              const effectiveDateKey = Object.keys(grouped)[0] || '';
              const companyData = grouped[effectiveDateKey]?.COMPANY?.[company];
              const lineCount = companyData?.NO_OF_LINE || grandTotal[company]?.NO_OF_LINE || 0;

              totalLine += lineCount;

              return (
                <th
                  key={`company-${company}`}
                  colSpan={Object.keys(grandTotal[company].FLOORS).length + 1}
                  className="border border-gray-950 text-center font-bold"
                  style={{ backgroundColor: getFactoryColor(company) }}
                >
                  {company}({lineCount})
                </th>
              );
            })}

            {secondHeader?.map((item, index) => (
              <th
                key={`second-${index}`}
                rowSpan={2}
                className="border border-gray-950 p-1 text-center font-bold"
              >
                {item}({totalLine})
              </th>
            ))}
          </tr>

          <tr>
            {Object.keys(grandTotal).map((company) => (
              <>
                {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                  <th
                    key={`${company}-${floor}`}
                    className="border border-gray-950 p-1 text-center font-bold"
                    style={{ backgroundColor: getFactoryColor(company) }}
                  >
                    {floor}
                  </th>
                ))}
                <th className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
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
                <td className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  TARGET
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {Math.round(companyData?.FLOORS?.[floor]?.TARGET) || "0.00"}
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {Math.round(companyData?.COMPANY_TOTAL) || "0.00"}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-950 p-1 text-center font-bold" >
                  {Math.round(grouped[dateKey]?.TARGET) || "0.00"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  HOURLY/UNIT
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {Math.round(companyData?.FLOORS?.[floor]?.HOURLY_PER_UNIT) || "0.00"}
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {Math.round(companyData?.HOURLY_PER_UNIT_TOTAL) || "0.00"}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-950 p-1 text-center font-bold">
                  {Math.round(grouped[dateKey]?.HOURLY_PER_UNIT) || "0.00"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td className="border text-center  border-gray-950 p-1 text-nowrap font-bold">
                  HOURLY/LINE
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  const floorCount = Object.keys(grandTotal[company].FLOORS).length;
                  totalFloor += floorCount;
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {Math.round(companyData?.FLOORS?.[floor]?.HOURLY_PER_LINE) || "0.00"}
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {Math.round(companyData?.HOURLY_PER_LINE_TOTAL / floorCount) || "0"}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-950 p-1 text-center font-bold">
                  {Math.round(grouped[dateKey]?.HOURLY_PER_LINE / totalFloor) || "0"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  TGT EFF.
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {(companyData?.FLOORS?.[floor]?.EARN_MIN * 100 / companyData?.FLOORS?.[floor]?.AVAILMIN)?.toFixed(2) || "0.00"} %
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {(companyData?.EARN_MIN_TOTAL * 100 / companyData.AVAILMIN_TOTAL)?.toFixed(2) || "0.00"} %
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-950 p-1 text-center font-bold">
                  {(grouped[dateKey]?.EARN_MIN * 100 / grouped[dateKey].AVAILMIN)?.toFixed(2) || "0.00"} %
                </td>
              </tr>


              <tr key={dateKey}>
                <td className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  RUN MACHINE
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {Math.round(companyData?.FLOORS?.[floor]?.OPERATOR) || "0"}
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {Math.round(companyData?.OPERATOR_TOTAL) || "0"}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-950 p-1 text-center font-bold">
                  {Math.round(grouped[dateKey]?.OPERATOR) || "0"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  W/H
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  const floorCount = Object.keys(grandTotal[company].FLOORS).length;
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {(companyData?.FLOORS?.[floor]?.ACTUALHOURS).toFixed(2) || "0"}
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {(companyData?.ACTUALHOURS_TOTAL / floorCount).toFixed(2) || "0"}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-950 p-1 text-center font-bold">
                  {(grouped[dateKey]?.ACTUALHOURS / totalFloor).toFixed(2) || "0"}
                </td>
              </tr>


              {
                Array.from(uniqueHoursKeys).map(item => {
                  return <>
                    <tr key={dateKey}>

                      <td className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                        {getOrdinal(item)}
                      </td>

                      {Object.keys(grandTotal).map((company) => {
                        const companyData = grouped[dateKey]?.COMPANY?.[company];
                        return (
                          <>
                            {Object.keys(grandTotal[company].FLOORS).map((floor) => {
                              return <td
                                key={`${dateKey}-${company}-${floor}`}
                                className="border border-gray-950 p-1 text-center"
                                style={{ backgroundColor: getFactoryColor(company) }}
                              >
                                {

                                }
                                {organizedData.byFloor[Number(item)][companyData?.FLOORS?.[floor]?.FLOOR_ID ?? 0] || 0}
                              </td>
                            })}
                            <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                              {organizedData.byFactory[Number(item)][companyData?.FACTORYID ?? 0] || 0}
                            </td>
                          </>
                        );
                      })}

                      <td className="border border-gray-950 p-1 text-center font-bold">
                        {organizedData.byHour[Number(item)] || 0}
                      </td>
                    </tr>
                  </>
                })
              }


              <tr key={dateKey}>

                <td className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  PRODUCTION
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => {
                        return <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {organizedData.byFloorTotal[companyData?.FLOORS?.[floor]?.FLOOR_ID ?? 0] || 0}
                        </td>
                      })}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {organizedData.byFactoryTotal[companyData?.FACTORYID ?? 0] || 0}
                      </td>
                    </>
                  );
                })}

                <td className="border border-gray-950 p-1 text-center font-bold">
                  {organizedData.grandTotal}
                </td>
              </tr>


              <tr key={dateKey}>
                <td className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  HOURLY
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];

                  const floorCount = Object.keys(grandTotal[company].FLOORS).length;

                  let totalHourly = 0;

                  const cells = Object.keys(grandTotal[company].FLOORS).map((floor) => {
                    const floorData = companyData?.FLOORS?.[floor];
                    const floorId = floorData?.FLOOR_ID ?? 0;
                    const actualHours = floorData?.ACTUALHOURS ?? 0;
                    const noOfLine = floorData?.NO_OF_LINE ?? 0;
                    const total = organizedData.byFloorTotal[floorId] ?? 0;

                    const hourly =
                      actualHours > 0 && noOfLine > 0
                        ? total / actualHours / noOfLine
                        : 0;

                    totalHourly += hourly;
                    grandTotalHourly += hourly;

                    return (
                      <td
                        key={`${dateKey}-${company}-${floor}`}
                        className="border border-gray-950 p-1 text-center"
                        style={{ backgroundColor: getFactoryColor(company) }}
                      >
                        {isNaN(hourly) ? "0" : Math.round(hourly)}
                      </td>
                    );
                  });

                  // const factoryId = companyData?.FACTORYID ?? 0;
                  // const factoryTotal = organizedData.byFactoryTotal[factoryId] ?? 0;
                  // const totalHours = companyData?.ACTUALHOURS_TOTAL ?? 0;
                  // const totalLines = companyData?.NO_OF_LINE ?? 0;
                  // const factoryHourly =
                  //   totalHours > 0 && totalLines > 0
                  //     ? factoryTotal / totalHours / totalLines
                  //     : 0;

                  cells.push(
                    <td
                      key={`${dateKey}-${company}-factory`}
                      className="border border-gray-950 p-1 text-center font-bold"
                      style={{ backgroundColor: getFactoryColor(company) }}
                    >
                      {isNaN(totalHourly) ? "0" : Math.round(totalHourly / floorCount)}
                    </td>
                  );

                  return cells;
                })}

                <td className="border border-gray-950 p-1 text-center font-bold">
                  {(() => {
                    // const grandTotal = organizedData.grandTotal ?? 0;
                    // const totalHours = grouped[dateKey]?.ACTUALHOURS ?? 0;
                    // const totalLines = grouped[dateKey]?.NO_OF_LINE ?? 0;

                    // const result =
                    //   totalHours > 0 && totalLines > 0
                    //     ? grandTotal / totalHours / totalLines
                    //     : 0;

                    return isNaN(grandTotalHourly) ? "0" : Math.round(grandTotalHourly / totalFloor);
                  })()}
                </td>
              </tr>

              <tr key={dateKey}>
                <td className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  ACHIEVE %
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];

                  const cells = Object.keys(grandTotal[company].FLOORS).map((floor) => {
                    const floorId = companyData?.FLOORS?.[floor]?.FLOOR_ID ?? 0;
                    const floorTarget = companyData?.FLOORS?.[floor]?.TARGET ?? 0;
                    const floorTotal = organizedData.byFloorTotal[floorId] ?? 0;
                    const achieve = (floorTotal * 100) / floorTarget;
                    return (
                      <td
                        key={`${dateKey}-${company}-${floor}`}
                        className="border border-gray-950 p-1 text-center"
                        style={{ backgroundColor: getFactoryColor(company) }}
                      >
                        {isNaN(achieve) ? "0.00" : achieve.toFixed(2)} %
                      </td>
                    );
                  });

                  const factoryId = companyData?.FACTORYID ?? 0;
                  const companyTotal = companyData?.COMPANY_TOTAL ?? 0;
                  const factoryTotal = organizedData.byFactoryTotal[factoryId] ?? 0;
                  const factoryAchieve = (factoryTotal * 100) / companyTotal;

                  cells.push(
                    <td
                      key={`${dateKey}-${company}-factory`}
                      className="border border-gray-950 p-1 text-center font-bold"
                      style={{ backgroundColor: getFactoryColor(company) }}
                    >
                      {isNaN(factoryAchieve) ? "0.00" : factoryAchieve.toFixed(2)} %
                    </td>
                  );

                  return cells;
                })}

                <td className="border border-gray-950 p-1 text-center font-bold">
                  {(() => {
                    const grandTarget = grouped[dateKey]?.TARGET ?? 0;
                    const result = (organizedData.grandTotal * 100) / grandTarget;
                    return isNaN(result) ? "0.00" : result.toFixed(2);
                  })()} %
                </td>
              </tr>


            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;