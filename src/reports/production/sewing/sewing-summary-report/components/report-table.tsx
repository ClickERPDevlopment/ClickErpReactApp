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
      UNIQUE_SEWINGDATE: new Set<string>(),
      TARGET: 0,
      RUNNNING_TOTALTARGET: 0,
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
      FIRST_HOUR_ACHV_PER: 0,
      FIRST_HOUR_TGT: 0
    };

    data.forEach((item) => {
      const companyKey = item.COMPANY_PREFIX || "Unknown";
      const floorKey = item.FLOORNAME || "Unknown Floor";
      const lineKey = item.LINENAME || "Unknown Line";
      const sewingDateKey = item.SEWINGDATE || "Unknown Line";

      const target = Number(item.TOTALTARGET);
      const runningTarget = Number(item.RUNNNING_TOTALTARGET);
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


      const firstHourAchvPer = (firstHourAchv * 100) / (target / targetHour);

      const firstHourTarget = (target / targetHour);

      if (!grouped[companyKey]) {
        grouped[companyKey] = {};
      }

      if (!grouped[companyKey][floorKey]) {
        grouped[companyKey][floorKey] = {
          UNIQUE_LINES: new Set<string>(),
          UNIQUE_SEWINGDATE: new Set<string>(),
          TARGET: 0,
          RUNNNING_TOTALTARGET: 0,
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
          TARGETHOURS: 0,
          FIRST_HOUR_ACHV_PER: 0,
          FIRST_HOUR_TGT: 0
        };
      }

      const floorData = grouped[companyKey][floorKey];

      floorData.TARGET += target;
      floorData.RUNNNING_TOTALTARGET += runningTarget;
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
      floorData.UNIQUE_SEWINGDATE.add(sewingDateKey);
      floorData.ROW_COUNT += 1;
      floorData.OP += op;
      floorData.HP += hp;
      floorData.SMV_QTY += smvQty;
      floorData.FIRST_HOUR_ACHV_PER += firstHourAchvPer;
      floorData.FIRST_HOUR_TGT += firstHourTarget;

      finalData.TARGET += target;
      finalData.RUNNNING_TOTALTARGET += runningTarget;
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
      finalData.UNIQUE_SEWINGDATE.add(sewingDateKey);
      finalData.SMV_QTY += smvQty;
      finalData.FIRST_HOUR_ACHV_PER += firstHourAchvPer;
      finalData.FIRST_HOUR_TGT += firstHourTarget;
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
    UNIQUE_SEWINGDATE: Set<string>;
    TARGET: number;
    RUNNNING_TOTALTARGET: number;
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
    FIRST_HOUR_ACHV_PER: number;
    FIRST_HOUR_TGT: number;
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
                    {(floorData.SEWING_OUTPUT * 100 / floorData.RUNNNING_TOTALTARGET).toFixed(2)} %
                  </td>
                );
              });
              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT * 100 / grouped[company][floor].RUNNNING_TOTALTARGET);
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
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{(finalData.SEWING_OUTPUT * 100 / finalData.RUNNNING_TOTALTARGET).toFixed(2)} %</td>
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
                    {Math.round(floorData.RUNNING_MC / floorData.UNIQUE_SEWINGDATE.size)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].RUNNING_MC / grouped[company][floor].UNIQUE_SEWINGDATE.size;
              }, 0);

              // const totalSewigData = floors.reduce((sum, floor) => {
              //   return sum + grouped[company][floor].UNIQUE_SEWINGDATE.size;
              // }, 0);

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
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">{Math.round(finalData.RUNNING_MC / finalData.UNIQUE_SEWINGDATE.size)}</td>
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

              let floorCount = 0;

              const cells = floors.map(floor => {

                floorCount++;
                const floorData = grouped[company][floor];

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {Math.round(floorData.TARGET / floorData.UNIQUE_SEWINGDATE.size / floorData.UNIQUE_LINES.size / (floorData.TARGETHOURS / floorData.ROW_COUNT))}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].TARGET / grouped[company][floor].UNIQUE_SEWINGDATE.size / grouped[company][floor].UNIQUE_LINES.size / (grouped[company][floor].TARGETHOURS / grouped[company][floor].ROW_COUNT));
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

            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
              {Math.round(finalData.TARGET / finalData.UNIQUE_SEWINGDATE.size / finalData.UNIQUE_LINES.size / (finalData.TARGETHOURS / finalData.ROW_COUNT))}
            </td>

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
                    {Math.round(floorData.SEWING_OUTPUT / floorData.UNIQUE_SEWINGDATE.size / floorData.UNIQUE_LINES.size / (floorData.WORKING_HOUR / floorData.ROW_COUNT))}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT / grouped[company][floor].UNIQUE_SEWINGDATE.size / grouped[company][floor].UNIQUE_LINES.size / (grouped[company][floor].WORKING_HOUR / grouped[company][floor].ROW_COUNT));
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
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
              {Math.round(finalData.SEWING_OUTPUT / finalData.UNIQUE_SEWINGDATE.size / finalData.UNIQUE_LINES.size / (finalData.WORKING_HOUR / finalData.ROW_COUNT))}
            </td>
          </tr>

          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Hourly Pcs Loss</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0;

              const cells = floors.map(floor => {

                floorCount += 1;

                const floorData = grouped[company][floor];

                const tgtHourly = floorData.TARGET / floorData.UNIQUE_SEWINGDATE.size / floorData.UNIQUE_LINES.size / (floorData.TARGETHOURS / floorData.ROW_COUNT);
                const achvHourly = floorData.SEWING_OUTPUT / floorData.UNIQUE_SEWINGDATE.size / floorData.UNIQUE_LINES.size / (floorData.WORKING_HOUR / floorData.ROW_COUNT);

                return (

                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {Math.round(achvHourly - tgtHourly)}
                  </td>
                );
              });

              const companyTotalTargetHourly = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].TARGET / grouped[company][floor].UNIQUE_SEWINGDATE.size / grouped[company][floor].UNIQUE_LINES.size / (grouped[company][floor].TARGETHOURS / grouped[company][floor].ROW_COUNT));
              }, 0);

              const companyTotalAchvHourly = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT / grouped[company][floor].UNIQUE_SEWINGDATE.size / grouped[company][floor].UNIQUE_LINES.size / (grouped[company][floor].WORKING_HOUR / grouped[company][floor].ROW_COUNT));
              }, 0);


              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {Math.round((companyTotalAchvHourly / floorCount) - (companyTotalTargetHourly / floorCount))}
                </td>
              );
              return cells;
            })}

            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
              {Math.round(finalData.SEWING_OUTPUT / finalData.UNIQUE_LINES.size / finalData.UNIQUE_SEWINGDATE.size / (finalData.WORKING_HOUR / finalData.ROW_COUNT)) - Math.round((finalData.TARGET / finalData.UNIQUE_SEWINGDATE.size / finalData.UNIQUE_LINES.size / (finalData.TARGETHOURS / finalData.ROW_COUNT)))}
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
                    {(floorData.WORKING_HOUR / floorData.ROW_COUNT).toFixed(2)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].WORKING_HOUR / grouped[company][floor].ROW_COUNT;
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
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
              {(finalData.WORKING_HOUR / finalData.ROW_COUNT).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">1st Hour Achieve%</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {


              let floorCount = 0;
              //let companyTotalAchv = 0;

              let cmpFirstHourAchvPer = 0;

              const cells = floors.map(floor => {

                floorCount += 1;
                const floorData = grouped[company][floor];

                //companyTotalAchv += floorData.FIRST_HOUR_ACHV_PER / floorData.ROW_COUNT;

                cmpFirstHourAchvPer += floorData.FIRST_HOUR_ACHV * 100 / floorData.FIRST_HOUR_TGT;

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.1 text-nowrap"
                  >
                    {Math.round((floorData.FIRST_HOUR_ACHV * 100 / floorData.FIRST_HOUR_TGT))} %
                  </td>
                );
              });

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                >
                  {Math.round(cmpFirstHourAchvPer / floorCount)} %
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
              {Math.round(finalData.FIRST_HOUR_ACHV * 100 / finalData.FIRST_HOUR_TGT)}
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
                <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Working Day</td>
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
                        {floorData.UNIQUE_SEWINGDATE.size}
                      </td>
                    );
                  });

                  const companyTotal = floors.reduce((sum, floor) => {
                    return sum + (grouped[company][floor].UNIQUE_SEWINGDATE.size);
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
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
                  {finalData.UNIQUE_SEWINGDATE.size}
                </td>
              </tr>
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
                        {Math.round(floorData.TARGET / (floorData.UNIQUE_SEWINGDATE.size))}
                      </td>
                    );
                  });

                  const companyTotal = floors.reduce((sum, floor) => {
                    return sum + (grouped[company][floor].TARGET / (grouped[company][floor].UNIQUE_SEWINGDATE.size));
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
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
                  {Math.round(finalData.TARGET / (finalData.UNIQUE_SEWINGDATE.size))}
                </td>
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
                        {Math.round(floorData.SEWING_OUTPUT / (floorData.UNIQUE_SEWINGDATE.size))}
                      </td>
                    );
                  });

                  const companyTotal = floors.reduce((sum, floor) => {
                    return sum + (grouped[company][floor].SEWING_OUTPUT / (grouped[company][floor].UNIQUE_SEWINGDATE.size));
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
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
                  {Math.round((finalData.SEWING_OUTPUT) / (finalData.UNIQUE_SEWINGDATE.size))}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-950 p-0.1 text-nowrap text-start font-bold">Avg. Target Loss Per Day</td>
                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let floorCount = 0

                  const cells = floors.map(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;
                    const avgAchieve = floorData.SEWING_OUTPUT / (floorData.UNIQUE_SEWINGDATE.size);
                    const avgTarget = floorData.TARGET / (floorData.UNIQUE_SEWINGDATE.size);

                    return (
                      <td
                        key={`${company}-${floor}`}
                        className="border text-center border-gray-950 p-0.1 text-nowrap"
                      >
                        {Math.round(avgAchieve - avgTarget)}
                      </td>
                    );
                  });

                  const totalAchieve = floors.reduce((sum, floor) => {
                    const avgAchieve =
                      grouped[company][floor].SEWING_OUTPUT /
                      (grouped[company][floor].UNIQUE_SEWINGDATE.size);

                    return sum + avgAchieve;
                  }, 0);

                  const totalTarget = floors.reduce((sum, floor) => {
                    const avgTarget =
                      grouped[company][floor].TARGET /
                      (grouped[company][floor].UNIQUE_SEWINGDATE.size);

                    return sum + avgTarget;
                  }, 0);


                  cells.push(
                    <td
                      style={{ backgroundColor: totalBg }}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                    >
                      {Math.round((totalAchieve) - (totalTarget))}
                    </td>
                  );
                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
                  {Math.round((finalData.SEWING_OUTPUT / (finalData.UNIQUE_SEWINGDATE.size)) - (finalData.TARGET / (finalData.UNIQUE_SEWINGDATE.size)))}
                </td>
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
                    totalRunningMC += floorData.RUNNING_MC;

                  });



                  const cells =
                    <td
                      colSpan={floorCount + 1}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.1 text-nowrap font-bold"
                    >
                      {totalRunningMC > 0 && ((totalMP / totalRunningMC)).toFixed(2)}
                    </td>
                    ;

                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.1 text-nowrap">
                  {finalData.RUNNING_MC > 0 && ((finalData.OP + finalData.HP) / finalData.RUNNING_MC).toFixed(2)}
                </td>
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
