/* eslint-disable no-var */
import useAppClient from "./use-AppClient";
import useDevEnv from "./use-DevEnv";

export default function useApiUrl() {
  const { currentEnv, devEnv } = useDevEnv();
  const { NUR, VERSATILE, ICCL, AG, EURO, PRESENTATION } = useAppClient();
  const clientName = process.env.REACT_APP_CLIENT_NAME;

  const DevUrl = "http://localhost:40000/api";
  const DevRootUrl = "http://localhost:40000";
  var ProductionUrl = "";
  var ProductionRootUrl = "";
  // var icclUrl = "http://119.148.62.103:6503/reports/api";
  // var versatileUrl = "http://103.192.156.110:6503/reports/api";

  var icclUrl = "http://119.148.62.103:6503/api";
  var icclRootUrl = "http://119.148.62.103:6503";

  var versatileUrl = "http://103.192.156.110:6503/api";
  var versatileRootUrl = "http://103.192.156.110:6503";

  var presentationUrl = "http://localhost:6001/api";
  var presentationRootUrl = "http://localhost:6001";

  var agUrl = "http://103.95.98.115:6307/api";
  var agRootUrl = "http://103.95.98.115:6307";

  var nurUrl = "http://163.47.147.34:6007/api";
  var nurRootUrl = "http://163.47.147.34:6007";

  var euroUrl = "http://192.168.1.155:6001/api";
  var euroRootUrl = "http://192.168.1.155:6001";

  if (currentEnv === devEnv) {
    if (clientName === AG) {
      if (process.env.REACT_APP_LINUX_NODE_ENV === "production") {
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
  return { ProductionUrl, ProductionRootUrl };
}
