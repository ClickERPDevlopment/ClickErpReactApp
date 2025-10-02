import moment from "moment";
import { SewingSummaryReportType } from "../sewing-summary-report-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
function ReportTable({
  data,
  firstHeader,
  isMonthView,
  searchParam
}: {
  data: SewingSummaryReportType[];
  firstHeader: string[] | null;
  companyHeader: string[] | null;
  secondHeader: string[] | null;
  isMonthView: boolean,
  searchParam: { fromDate: string, toDate: string };
}) {


  function groupBy(data: SewingSummaryReportType[]) {
    const grouped: IGroupedData = {};
    const finalData: IFinalData = {
      UNIQUE_LINES: new Set<string>(),
      TARGET: 0,
      SEWING_OUTPUT: 0,
      PERFORMANCE: 0,
      TGT_EARN_MIN: 0,
      EARN_MIN: 0,
      AVL_MIN: 0,
      ACHV_EFF: 0,
      TGT_EFF: 0,
      RUNNING_MC: 0,
      EARNED_CM: 0,
      EARNED_FOB: 0,
      SMV: 0,
      WORKING_HOUR: 0,
      FIRST_HOUR_ACHV: 0,
      HP: 0,
      ROW_COUNT: 0,
      OP: 0,
      DEFECTQTY: 0,
      CHECKQTY: 0,
      SMV_QTY: 0,
      TARGETHOURS: 0,
    };

    data.forEach((item) => {
      const companyKey = item.COMPANY_PREFIX || "Unknown";
      const floorKey = item.FLOORNAME || "Unknown Floor";
      const lineKey = item.LINENAME || "Unknown Line";

      const target = Number(item.TOTALTARGET);
      const sewingOutput = Number(item.SEWINGOUTPUT);
      const performance = sewingOutput > 0 ? (target * 100) / sewingOutput : 0;

      const earnMin = Number(item.EARNINGMIN);
      const tgtEarnMin = Number(item.TARGET_EARN_MIN);
      const avlMin = Number(item.AVAILABLEMIN);
      const achvEff = avlMin > 0 ? (earnMin * 100) / avlMin : 0;
      const tgtEff = target > 0 ? (sewingOutput * 100) / target : 0;

      const runningMC = Number(item.RUNNINGMC);
      const earnedCM = Number(item.TOTALCM);
      const earnedFOB = Number(item.TOTALFOB);
      const smv = Number(item.SMVSEWING);
      const workingHour = Number(item.ACTUALHOURS);
      const targetHour = Number(item.TARGETHOURS);
      const firstHourAchv = Number(item.FIRST_HOUR_ACHIEVE);
      const defectQty = Number(item.DEFECTQTY);
      const checkQty = Number(item.CHECKQTY);
      const op = Number(item.OPERATOR);
      const hp = Number(item.HELPER);
      const smvQty = Number(item.SEWINGOUTPUT) * Number(item.SMVSEWING);

      if (!grouped[companyKey]) {
        grouped[companyKey] = {};
      }

      if (!grouped[companyKey][floorKey]) {
        grouped[companyKey][floorKey] = {
          UNIQUE_LINES: new Set<string>(),
          TARGET: 0,
          SEWING_OUTPUT: 0,
          PERFORMANCE: 0,
          TGT_EARN_MIN: 0,
          EARN_MIN: 0,
          AVL_MIN: 0,
          ACHV_EFF: 0,
          TGT_EFF: 0,
          RUNNING_MC: 0,
          EARNED_CM: 0,
          EARNED_FOB: 0,
          SMV: 0,
          WORKING_HOUR: 0,
          FIRST_HOUR_ACHV: 0,
          DEFECTQTY: 0,
          CHECKQTY: 0,
          ROW_COUNT: 0,
          OP: 0,
          HP: 0,
          SMV_QTY: 0,
          TARGETHOURS: 0
        };
      }

      const floorData = grouped[companyKey][floorKey];

      floorData.TARGET += target;
      floorData.SEWING_OUTPUT += sewingOutput;
      floorData.PERFORMANCE += performance;
      floorData.TGT_EARN_MIN += tgtEarnMin;
      floorData.EARN_MIN += earnMin;
      floorData.AVL_MIN += avlMin;
      floorData.ACHV_EFF += achvEff;
      floorData.TGT_EFF += tgtEff;
      floorData.RUNNING_MC += runningMC;
      floorData.EARNED_CM += earnedCM;
      floorData.EARNED_FOB += earnedFOB;
      floorData.SMV += smv;
      floorData.WORKING_HOUR += workingHour;
      floorData.TARGETHOURS += targetHour;
      floorData.FIRST_HOUR_ACHV += firstHourAchv;
      floorData.DEFECTQTY += defectQty;
      floorData.CHECKQTY += checkQty;
      floorData.UNIQUE_LINES.add(lineKey);
      floorData.ROW_COUNT += 1;
      floorData.OP += op;
      floorData.HP += hp;
      floorData.SMV_QTY += smvQty;

      finalData.TARGET += target;
      finalData.SEWING_OUTPUT += sewingOutput;
      finalData.PERFORMANCE += performance;
      finalData.TGT_EARN_MIN += tgtEarnMin;
      finalData.EARN_MIN += earnMin;
      finalData.AVL_MIN += avlMin;
      finalData.ACHV_EFF += achvEff;
      finalData.TGT_EFF += tgtEff;
      finalData.RUNNING_MC += runningMC;
      finalData.EARNED_CM += earnedCM;
      finalData.EARNED_FOB += earnedFOB;
      finalData.SMV += smv;
      finalData.WORKING_HOUR += workingHour;
      finalData.TARGETHOURS += targetHour;
      finalData.FIRST_HOUR_ACHV += firstHourAchv;
      finalData.DEFECTQTY += defectQty;
      finalData.CHECKQTY += checkQty;
      finalData.ROW_COUNT += 1;
      finalData.OP += op;
      finalData.HP += hp;
      finalData.UNIQUE_LINES.add(lineKey);
      finalData.SMV_QTY += smvQty;


    });

    return { grouped, finalData };
  }

  interface IGroupedData {
    [company: string]: {
      [floor: string]: IFinalData;
    };
  }

  interface IFinalData {
    UNIQUE_LINES: Set<string>;
    TARGET: number;
    SEWING_OUTPUT: number;
    PERFORMANCE: number;
    TGT_EARN_MIN: number;
    EARN_MIN: number;
    AVL_MIN: number;
    ACHV_EFF: number;
    TGT_EFF: number;
    RUNNING_MC: number;
    EARNED_CM: number;
    EARNED_FOB: number;
    SMV: number;
    WORKING_HOUR: number;
    FIRST_HOUR_ACHV: number;
    ROW_COUNT: number;
    OP: number;
    HP: number;
    DEFECTQTY: number;
    CHECKQTY: number;
    SMV_QTY: number;
    TARGETHOURS: number;
  }

  const { grouped, finalData } = groupBy(data);

  interface CompanyFloorHeader {
    company: string;
    floor: string;
    colSpan: number;
  }

  const companyFloorHeader: CompanyFloorHeader[] = [];
  const companyColSpan: { [company: string]: number } = {};

  for (const company in grouped) {
    const floors = Object.keys(grouped[company]);
    companyColSpan[company] = floors.length;
    floors.forEach(floor => {
      companyFloorHeader.push({ company, floor, colSpan: 1 });
    });
  }


  const companyFloorsMap: { [company: string]: string[] } = {};

  companyFloorHeader.forEach(item => {
    if (!companyFloorsMap[item.company]) {
      companyFloorsMap[item.company] = [];
    }
    companyFloorsMap[item.company].push(item.floor);
  });

  const grandTotalBg = "#f4f4cb";
  const totalBg = "#b1e7ed";

  return (
    <div className="text-sm mt-3 text-gray-950 font-semibold">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-gray-950">
          {
            !isMonthView ? "Day (Sewing)" : "Month (Sewing)"
          }
        </p>
        <p className="text-sm font-bold text-gray-950">

          {
            isMonthView
              ? `Production Month: ${moment(searchParam.fromDate).format("MMM-YY")}`
              : `Production Date: ${moment(searchParam.fromDate).format("DD-MMM-YY")}`
          }

        </p>
      </div>
      <table className="border-collapse border border-gray-950 w-[100%]">

        <thead>
          <tr>
            {firstHeader?.map(item => (
              <th rowSpan={2} className="border border-gray-950 p-0.1 text-center font-bold">{item}</th>
            ))}
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells =
                <th colSpan={floors.length + 1} key={company} className="border border-gray-950 p-0.1 text-center font-bold">
                  {
                    company
                  }
                </th>
              return cells;
            })}
            <th rowSpan={2} className="border border-gray-950 p-0.1 text-center font-bold">Grand Total</th>
          </tr>
          <tr>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                return (
                  <th key={floor} className="border border-gray-950 p-0.1 text-center font-bold">
                    {floor}
                  </th>
                );
              });

              cells.push(
                <th key={company} className="border border-gray-950 p-0.1 text-center font-bold">
                  Total
                </th>
              );
              return cells;
            })}
          </tr>
        </thead>

        <tbody style={{ backgroundColor: isMonthView ? "#d5f2da" : "#f2eaea" }}>
          <tr>
            <td className="border  border-gray-950 p-0.1 text-nowrap text-start font-bold">Target Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {Math.round(floorData.TARGET)}
                  </td>
                );
              });
              const companyTotal = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].TARGET;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {Math.round(companyTotal)}
                </td>
              );

              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{Math.round(finalData.TARGET)}</td>
          </tr>


          <tr>
            <td className="border  border-gray-950 p-0.1 text-nowrap text-start font-bold">Achievement Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {floorData.SEWING_OUTPUT}
                  </td>
                );
              });
              const companyTotal = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].SEWING_OUTPUT;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {companyTotal}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{finalData.SEWING_OUTPUT}</td>
          </tr>


          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Target Loss Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {Math.round(floorData.SEWING_OUTPUT - floorData.TARGET)}
                  </td>
                );
              });
              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT - grouped[company][floor].TARGET);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {Math.round(companyTotal)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{Math.round(finalData.SEWING_OUTPUT - finalData.TARGET)}</td>
          </tr>

          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Performance %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              let uniqueLine = 0;
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                uniqueLine++;
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {(floorData.SEWING_OUTPUT * 100 / floorData.TARGET).toFixed(2)} %
                  </td>
                );
              });
              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT * 100 / grouped[company][floor].TARGET);
              }, 0);
              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {(companyTotal / uniqueLine).toFixed(2)} %
                </td>
              );

              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.SEWING_OUTPUT * 100 / finalData.TARGET).toFixed(2)} %</td>
          </tr>


          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Target Efficiency %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              let uniqueLine = 0;
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                uniqueLine++;
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {(floorData.TGT_EARN_MIN * 100 / floorData.AVL_MIN).toFixed(2)} %
                  </td>
                );
              });
              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].TGT_EARN_MIN * 100 / grouped[company][floor].AVL_MIN);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {(companyTotal / uniqueLine).toFixed(2)} %
                </td>
              );

              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.TGT_EARN_MIN * 100 / finalData.AVL_MIN).toFixed(2)} %</td>
          </tr>

          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Achieved Efficiency %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              let uniqueLine = 0;
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                uniqueLine++;
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {(floorData.EARN_MIN * 100 / floorData.AVL_MIN).toFixed(2)} %
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].EARN_MIN * 100 / grouped[company][floor].AVL_MIN);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {(companyTotal / uniqueLine).toFixed(2)} %
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.EARN_MIN * 100 / finalData.AVL_MIN).toFixed(2)} %</td>
          </tr>


          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Output Line</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {floorData.UNIQUE_LINES.size}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].UNIQUE_LINES.size;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {companyTotal}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{finalData.UNIQUE_LINES.size}</td>
          </tr>


          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Running MC</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {floorData.RUNNING_MC}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].RUNNING_MC;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {companyTotal}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{finalData.RUNNING_MC}</td>
          </tr>



          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Earned CM</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    ${Math.round(floorData.EARNED_CM)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].EARNED_CM);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  ${Math.round(companyTotal)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">${Math.round(finalData.EARNED_CM)}</td>
          </tr>


          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Earned FOB</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    ${Math.round(floorData.EARNED_FOB)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].EARNED_FOB);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  ${Math.round(companyTotal)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">${Math.round(finalData.EARNED_FOB)}</td>
          </tr>


          {/* <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Earned CM %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let uniqueLine = 0;

              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                uniqueLine++;
                return (
                  <td

                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {(floorData.EARNED_CM * 100 / floorData.EARNED_FOB).toFixed(2)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].EARNED_FOB * 100 / grouped[company][floor].EARNED_FOB);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {companyTotal.toFixed(2)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.EARNED_FOB * 100 / finalData.EARNED_CM).toFixed(2)}</td>
          </tr> */}


          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">FOB Per Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    ${(floorData.EARNED_FOB / floorData.SEWING_OUTPUT).toFixed(2)}
                  </td>
                );
              });
              const companyTotalFOB = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].EARNED_FOB);
              }, 0);

              const companyTotalAchv = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  ${(companyTotalFOB / companyTotalAchv).toFixed(2)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">${(finalData.EARNED_FOB / finalData.SEWING_OUTPUT).toFixed(2)}</td>
          </tr>


          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">SMV</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {(floorData.SMV_QTY / floorData.SEWING_OUTPUT).toFixed(2)}
                  </td>
                );
              });

              const companyTotalSmvQty = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SMV_QTY);
              }, 0);

              const companyTotalAchvQty = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT);
              }, 0);


              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {(companyTotalSmvQty / companyTotalAchvQty).toFixed(2)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.SMV_QTY / finalData.SEWING_OUTPUT).toFixed(2)}</td>
          </tr>


          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Target Hourly Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              const cells = floors.map(floor => {

                const floorData = grouped[company][floor];

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {(floorData.TARGET / Math.round(floorData.TARGETHOURS / floorData.ROW_COUNT)).toFixed(2)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].TARGET / Math.round(grouped[company][floor].TARGETHOURS / grouped[company][floor].ROW_COUNT));
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {companyTotal.toFixed(2)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.TARGET / Math.round(finalData.TARGETHOURS / finalData.ROW_COUNT)).toFixed(2)}</td>
          </tr>


          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Achieved Hourly Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0;

              const cells = floors.map(floor => {

                floorCount += 1;

                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {(floorData.SEWING_OUTPUT / Math.round(floorData.WORKING_HOUR / floorData.ROW_COUNT)).toFixed(2)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT);
              }, 0);

              const hour = floors.reduce((sum, floor) => {
                return sum + (Math.round(grouped[company][floor].WORKING_HOUR / grouped[company][floor].ROW_COUNT));
              }, 0);


              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {(companyTotal / (hour / floorCount)).toFixed(2)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.SEWING_OUTPUT / Math.round(finalData.WORKING_HOUR / finalData.ROW_COUNT)).toFixed(2)}</td>
          </tr>

          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Hourly Pcs Loss</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0;

              const cells = floors.map(floor => {

                floorCount += 1;

                const floorData = grouped[company][floor];

                const tgtHourly = floorData.TARGET / Math.round(floorData.TARGETHOURS / floorData.ROW_COUNT);
                const achvHourly = floorData.SEWING_OUTPUT / Math.round(floorData.WORKING_HOUR / floorData.ROW_COUNT);

                return (

                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {(achvHourly - tgtHourly).toFixed(2)}
                  </td>
                );
              });


              const companyTotalTarget = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].TARGET);
              }, 0);

              const companyTotalAchv = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT);
              }, 0);

              const hour = floors.reduce((sum, floor) => {
                return sum + (Math.round(grouped[company][floor].WORKING_HOUR / grouped[company][floor].ROW_COUNT));
              }, 0);


              const tHour = floors.reduce((sum, floor) => {
                return sum + (Math.round(grouped[company][floor].TARGETHOURS / grouped[company][floor].ROW_COUNT));
              }, 0);


              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {((companyTotalAchv / (hour / floorCount)) - (companyTotalTarget / (tHour / floorCount))).toFixed(2)}
                </td>
              );
              return cells;
            })}

            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
              {(((finalData.SEWING_OUTPUT) / Math.round(finalData.WORKING_HOUR / finalData.ROW_COUNT)) - ((finalData.TARGET) / Math.round(finalData.TARGETHOURS / finalData.ROW_COUNT))).toFixed(2)}
            </td>
          </tr>

          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Working Hour</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0;

              const cells = floors.map(floor => {

                floorCount += 1;

                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {Math.round(floorData.WORKING_HOUR / floorData.ROW_COUNT)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + Math.round(grouped[company][floor].WORKING_HOUR / grouped[company][floor].ROW_COUNT);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {Math.round(companyTotal / floorCount)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{Math.round(finalData.WORKING_HOUR / finalData.ROW_COUNT)}</td>
          </tr>



          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">1st Hour Achieve%</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {


              let floorCount = 0;
              let companyTotalAchv = 0;
              const cells = floors.map(floor => {

                floorCount += 1;
                const floorData = grouped[company][floor];
                const tgtHourly = floorData.TARGET / Math.round(floorData.TARGETHOURS / floorData.ROW_COUNT);

                companyTotalAchv += floorData.FIRST_HOUR_ACHV * 100 / tgtHourly;

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {(floorData.FIRST_HOUR_ACHV * 100 / tgtHourly).toFixed(2)} %
                  </td>
                );
              });

              //const companyTotal = floors.reduce((sum, floor) => {
              //   return sum + grouped[company][floor].FIRST_HOUR_ACHV;
              // }, 0);

              // const companyTotalTarget = floors.reduce((sum, floor) => {
              //   return sum + (grouped[company][floor].TARGET / grouped[company][floor].TARGETHOURS);
              // }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {(companyTotalAchv / floorCount).toFixed(2)} %
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
              {(finalData.FIRST_HOUR_ACHV * 100 / ((finalData.TARGET) / Math.round(finalData.TARGETHOURS / finalData.ROW_COUNT))).toFixed(2)}
              %</td>
          </tr>


          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Helper %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let lineCount = 0;

              const cells = floors.map(floor => {
                lineCount++;
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {(floorData.HP * 100 / floorData.OP).toFixed(2)} %
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].HP * 100 / grouped[company][floor].OP);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {(companyTotal / lineCount).toFixed(2)} %
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.HP * 100 / finalData.OP).toFixed(2)} %</td>
          </tr>

          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">DHU %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0

              const cells = floors.map(floor => {

                const floorData = grouped[company][floor];
                floorCount += 1;
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {floorData.CHECKQTY > 0 && (floorData.DEFECTQTY * 100 / floorData.CHECKQTY).toFixed(2)} %
                  </td>
                );
              });

              const companyTotalDefectQty = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].DEFECTQTY);
              }, 0);

              const companyTotalCheckQty = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].CHECKQTY);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {companyTotalCheckQty > 0 && (companyTotalDefectQty * 100 / companyTotalCheckQty).toFixed(2)} %
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
              {finalData.CHECKQTY > 0 && (finalData.DEFECTQTY * 100 / finalData.CHECKQTY).toFixed(2)} %
            </td>
          </tr>

          {
            isMonthView &&
            <>
              <tr style={{ backgroundColor: "" }}>
                <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Avg. Target Per Day</td>
                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let floorCount = 0

                  const cells = floors.map(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;
                    return (
                      <td
                        key={`${company}-${floor}`}
                        className="border text-center border-gray-950 p-0.1 text-nowrap"
                      >
                        {(floorData.TARGET / floorData.ROW_COUNT).toFixed(2)}
                      </td>
                    );
                  });

                  const companyTotal = floors.reduce((sum, floor) => {
                    return sum + (grouped[company][floor].TARGET / grouped[company][floor].ROW_COUNT);
                  }, 0);

                  cells.push(
                    <td
                      style={{ backgroundColor: totalBg }}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                    >
                      {(companyTotal / floorCount).toFixed(2)}
                    </td>
                  );
                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.TARGET / finalData.ROW_COUNT).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Avg. Achieved Per Day</td>
                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let floorCount = 0

                  const cells = floors.map(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;
                    return (
                      <td
                        key={`${company}-${floor}`}
                        className="border text-center border-gray-950 p-0.1 text-nowrap"
                      >
                        {(floorData.SEWING_OUTPUT / floorData.ROW_COUNT).toFixed(2)}
                      </td>
                    );
                  });

                  const companyTotal = floors.reduce((sum, floor) => {
                    return sum + (grouped[company][floor].SEWING_OUTPUT / grouped[company][floor].ROW_COUNT);
                  }, 0);

                  cells.push(
                    <td
                      style={{ backgroundColor: totalBg }}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                    >
                      {(companyTotal / floorCount).toFixed(2)}
                    </td>
                  );
                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.SEWING_OUTPUT / finalData.ROW_COUNT).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Avg. Target Loss Per Day</td>
                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let floorCount = 0

                  const cells = floors.map(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;
                    const avgAchieve = floorData.SEWING_OUTPUT / floorData.ROW_COUNT;
                    const avgTarget = floorData.TARGET / floorData.ROW_COUNT;

                    return (
                      <td
                        key={`${company}-${floor}`}
                        className="border text-center border-gray-950 p-0.1 text-nowrap"
                      >
                        {(avgAchieve - avgTarget).toFixed(2)}
                      </td>
                    );
                  });

                  const companyTotal = floors.reduce((sum, floor) => {

                    const avgAchieve = grouped[company][floor].SEWING_OUTPUT / grouped[company][floor].ROW_COUNT;
                    const avgTarget = grouped[company][floor].TARGET / grouped[company][floor].ROW_COUNT;

                    return sum + (avgAchieve - avgTarget);
                  }, 0);

                  cells.push(
                    <td
                      style={{ backgroundColor: totalBg }}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                    >
                      {(companyTotal / floorCount).toFixed(2)}
                    </td>
                  );
                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.SEWING_OUTPUT - finalData.TARGET / finalData.ROW_COUNT).toFixed(2)}</td>
              </tr>

              <tr style={{ backgroundColor: "" }}>
                <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">MMR</td>


                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let totalMP = 0;
                  let totalRunningMC = 0;
                  let floorCount = 0;

                  floors.forEach(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;
                    totalMP += floorData.OP + floorData.HP;
                    totalRunningMC = floorData.RUNNING_MC;

                  });

                  const cells =
                    <td
                      colSpan={floorCount + 1}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                    >
                      {totalRunningMC > 0 && (totalMP / totalRunningMC).toFixed(2)}
                    </td>
                    ;

                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{finalData.RUNNING_MC > 0 && (finalData.OP + finalData.HP / finalData.RUNNING_MC).toFixed(2)}</td>
              </tr>
            </>
          }
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </div >
  );

}

export default ReportTable;
