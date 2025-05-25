/* eslint-disable @typescript-eslint/no-explicit-any */
import { PartyWiseKnittingProgramType } from "../party-wise-knitting-program-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
}: {
  data: PartyWiseKnittingProgramType[];
  firstHeader: string[] | null;
  index: number
}) {


  const collarCuffData = data?.filter((item) => item.FABRIC_PART === "COLLAR" || item.FABRIC_PART === "CUFF") || [];
  const othersData = data?.filter((item) => item.FABRIC_PART !== "COLLAR" && item.FABRIC_PART !== "CUFF") || [];

  const collarCuffKeys: Set<string> = new Set();
  const othersKeys: Set<string> = new Set();

  function groupBy(
    data: PartyWiseKnittingProgramType[],
    keys: string[],
    keyStore: Set<string>
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      keyStore.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);
      return result;
    }, {});
  }


  const collarCuffGrouped = groupBy(collarCuffData, ["KNITTING_PROGRAM_NO", "BUYER", "STYLENO", "YARN", "YARN_LOT", "BRAND_NAME", "FABRIC", "FABRIC_TYPE", "GSM", "COLORNAME", "STITCH_LENGTH", "LYCRA_CM", "REMARKS"], collarCuffKeys);

  const othersGrouped = groupBy(othersData, ["KNITTING_PROGRAM_NO", "BUYER", "STYLENO", "YARN", "YARN_LOT", "BRAND_NAME", "FABRIC", "FABRIC_TYPE", "MC_DIA", "GAUGE", "FINISH_DIA", "GSM", "COLORNAME", "STITCH_LENGTH", "LYCRA_CM", "REMARKS"], othersKeys);

  const collarCuffKeysArray = Array.from(collarCuffKeys);
  const othersKeysArray = Array.from(othersKeys);

  return (
    <>
      {collarCuffKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={collarCuffGrouped[key].items}
          firstHeader={firstHeader}
          index={index}
        ></ReportSubgroup>
      ))}

      {othersKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={othersGrouped[key].items}
          firstHeader={firstHeader}
          index={index + collarCuffKeysArray.length}
        ></ReportSubgroup>
      ))}

    </>
  );
}

export default ReportTable;
