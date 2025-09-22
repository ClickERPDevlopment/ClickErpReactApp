/* eslint-disable @typescript-eslint/no-unused-vars */
import useAppClient from "./use-AppClient";
import useDevEnv from "./use-DevEnv";
//

export default function useApiUrl() {
  const { currentEnv, devEnv } = useDevEnv();
  const { NUR, VERSATILE, ICCL, AG, EURO, FAME, PRESENTATION } = useAppClient();
  const clientName = import.meta.env.VITE_APP_CLIENT_NAME;

  const DevUrl = "http://localhost:40000/api";
  const DevRootUrl = "http://localhost:40000";
  const DevBaseUrl = "http://localhost";

  let ProductionUrl = "";
  let ProductionRootUrl = "";
  let BaseUrl = "";

  const icclUrl = "http://119.148.62.103:6503/api";
  const icclRootUrl = "http://119.148.62.103:6503";
  const icclBaseUrl = "http://119.148.62.103";

  const versatileUrl = "http://103.192.156.110:6503/api";
  const versatileRootUrl = "http://103.192.156.110:6503";
  const versatileBaseUrl = "http://103.192.156.110";

  const presentationUrl = "http://localhost:6001/api";
  const presentationRootUrl = "http://localhost:6001";
  const presentationBaseUrl = "http://localhost";

  const agUrl = "http://10.10.101.6:6307/api";
  const agRootUrl = "http://10.10.101.6:6307";
  const agBaseUrl = "http://10.10.101.6";

  // const agUrl = "http://103.95.98.115:6307/api";
  // const agRootUrl = "http://103.95.98.115:6307";

  const nurUrl = "http://163.47.147.34:6007/api";
  const nurRootUrl = "http://163.47.147.34:6007";
  const nurBaseUrl = "http://163.47.147.34";

  // const euroUrl = "http://192.168.1.155:6001/api";
  // const euroRootUrl = "http://192.168.1.155:6001";

  const euroUrl = "http://202.74.240.105:6307/api";
  const euroRootUrl = "http://202.74.240.105:6307";
  const euroBaseUrl = "http://202.74.240.105";

  const fameUrl = "http://118.179.81.150:6307/api";
  const fameRootUrl = "http://118.179.81.150:6307";
  const fameBaseUrl = "http://118.179.81.150";

  // console.log("currentEnv: ", currentEnv);
  if (currentEnv === devEnv) {
    // console.log("Dev Environment");
    // console.log("clientName: ", clientName);
    if (clientName === AG) {
      if (import.meta.env.VITE_APP_LINUX_NODE_ENV === "production") {
        ProductionUrl = agUrl;
        ProductionRootUrl = agRootUrl;
        BaseUrl = agBaseUrl;
      } else {
        ProductionUrl = DevUrl;
        ProductionRootUrl = DevRootUrl;
        BaseUrl = DevUrl;
      }
    } else {
      ProductionUrl = DevUrl;
      ProductionRootUrl = DevRootUrl;
      BaseUrl = DevBaseUrl;
    }
  } else {
    // console.log("Production Environment");
    // console.log("clientName: ", clientName);
    if (VERSATILE === clientName) {
      ProductionUrl = versatileUrl;
      ProductionRootUrl = versatileRootUrl;
      BaseUrl = versatileBaseUrl;
    } else if (ICCL === clientName) {
      ProductionUrl = icclUrl;
      ProductionRootUrl = icclRootUrl;
      BaseUrl = icclBaseUrl;
    } else if (AG === clientName) {
      ProductionUrl = agUrl;
      ProductionRootUrl = agRootUrl;
      BaseUrl = agBaseUrl;
    } else if (NUR === clientName) {
      ProductionUrl = nurUrl;
      ProductionRootUrl = nurRootUrl;
      BaseUrl = nurBaseUrl;
    } else if (EURO === clientName) {
      ProductionUrl = euroUrl;
      ProductionRootUrl = euroRootUrl;
      BaseUrl = euroBaseUrl;
    } else if (clientName === PRESENTATION) {
      ProductionUrl = presentationUrl;
      ProductionRootUrl = presentationRootUrl;
      BaseUrl = presentationBaseUrl;
    } else if (clientName === FAME) {
      ProductionUrl = fameUrl;
      ProductionRootUrl = fameRootUrl;
      BaseUrl = fameBaseUrl;
    }
  }

  // ProductionUrl = euroUrl;
  // ProductionRootUrl = euroRootUrl;
  return { BaseUrl, ProductionUrl, ProductionRootUrl };
}
