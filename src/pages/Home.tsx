import { ReportCard } from "./report-card";
import {
  IEReportMenu,
  merchandisingReportMenu,
  ProductionReportMenu,
  QualityReportMenu,
  storeReportMenu,
  textileReportMenu,
} from "../lib/menu/report-menu";

import useAppClient from "../hooks/use-AppClient";
import { useEffect, useState } from "react";
import axios from "axios";
import useApiUrl from "../hooks/use-ApiUrl";
import { Link } from "react-router";

const Home = () => {
  const { currentClient } = useAppClient();

  const [apiClientName, setApiClientName] = useState([]);
  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      await axios
        .get(api.ProductionUrl + "/production/clientinfo/ClientName")
        .then((res) => setApiClientName(res.data));
    }
    getData();
  }, [api.ProductionUrl]);

  return (
    <>
      <nav>
        <div className="container flex gap-5 justify-center items-center py-5">
          <p className="inline-block text-sm border border-slate-400 font-bold px-2 rounded p-2">
            App Client: {currentClient}
          </p>
          <p className="inline-block text-sm border border-slate-400 font-bold px-2 rounded p-2">
            Api Client: {apiClientName}
          </p>
        </div>
        <div className="container flex gap-5 justify-end items-center">
          <Link to={"/dashboard"} className="hover:underline">
            Dashboard
          </Link>
        </div>
      </nav>
      <div className="p-2 flex justify-center items-start gap-7 flex-wrap">
        <ReportCard title="Merchandising" menu={merchandisingReportMenu} />
        <ReportCard title="Store" menu={storeReportMenu} />
        <ReportCard title="Textile" menu={textileReportMenu} />
        <ReportCard title="IE" menu={IEReportMenu} />
        <ReportCard title="Production" menu={ProductionReportMenu} />
        <ReportCard title="Quality" menu={QualityReportMenu} />
      </div>
    </>
  );
};

export default Home;
