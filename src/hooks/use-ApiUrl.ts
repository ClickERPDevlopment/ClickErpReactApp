/* eslint-disable @typescript-eslint/no-unused-vars */
import useAppClient from "./use-AppClient";
import useDevEnv from "./use-DevEnv";
//

export default function useApiUrl() {
  const { currentEnv, devEnv } = useDevEnv();
  const { NUR, VERSATILE, ICCL, AG, EURO, PRESENTATION } = useAppClient();
  const clientName = import.meta.env.VITE_APP_CLIENT_NAME;

  const DevUrl = "http://localhost:40000/api";
  const DevRootUrl = "http://localhost:40000";
  
  let ProductionUrl = "";
  let ProductionRootUrl = "";

  const icclUrl = "http://119.148.62.103:6503/api";
  const icclRootUrl = "http://119.148.62.103:6503";

  const versatileUrl = "http://103.192.156.110:6503/api";
  const versatileRootUrl = "http://103.192.156.110:6503";

  const presentationUrl = "http://localhost:6001/api";
  const presentationRootUrl = "http://localhost:6001";

  const agUrl = "http://10.10.101.6:6307/api";
  const agRootUrl = "http://10.10.101.6:6307";

  const nurUrl = "http://163.47.147.34:6007/api";
  const nurRootUrl = "http://163.47.147.34:6007";

  const euroUrl = "http://192.168.1.155:6001/api";
  const euroRootUrl = "http://192.168.1.155:6001";

  console.log("currentEnv: ", currentEnv);
  if (currentEnv === devEnv) {
    console.log("Dev Environment");
    console.log("clientName: ", clientName);
    if (clientName === AG) {
      if (import.meta.env.VITE_APP_LINUX_NODE_ENV === "production") {
        ProductionUrl = agUrl;
        ProductionRootUrl = agRootUrl;
      } else {
        ProductionUrl = DevUrl;
        ProductionRootUrl = DevRootUrl;
      }
    } else {
      ProductionUrl = DevUrl;
      ProductionRootUrl = DevRootUrl;
    }
  } else {
    console.log("Production Environment");
    console.log("clientName: ", clientName);
    if (VERSATILE === clientName) {
      ProductionUrl = versatileUrl;
      ProductionRootUrl = versatileRootUrl;
    } else if (ICCL === clientName) {
      ProductionUrl = icclUrl;
      ProductionRootUrl = icclRootUrl;
    } else if (AG === clientName) {
      ProductionUrl = agUrl;
      ProductionRootUrl = agRootUrl;
    } else if (NUR === clientName) {
      ProductionUrl = nurUrl;
      ProductionRootUrl = nurRootUrl;
    } else if (EURO === clientName) {
      ProductionUrl = euroUrl;
      ProductionRootUrl = euroRootUrl;
    } else if (clientName === PRESENTATION) {
      ProductionUrl = presentationUrl;
      ProductionRootUrl = presentationRootUrl;
    }
  }

  // ProductionUrl = icclUrl;
  // ProductionRootUrl = icclRootUrl;
  return { ProductionUrl, ProductionRootUrl };
}
