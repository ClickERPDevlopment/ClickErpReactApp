import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "src/utility/react-query-key";
import useAxiosInstance from "src/lib/axios-instance";

export type LearningCurveType = {
  ID: number;
  FACTORYID: number;
  NAME: string;
  CURVE_DATE: Date;
  SMVFROM: number;
  SMVTO: number;
  ISACTIVE: boolean;
  CREATEBY: string;
  CREATEDATE: Date;
  UPDATEBY: string;
  UPDATEDATE: Date;
};

export function GetAllLearningCurve() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<LearningCurveType[]> =>
    (await axios.get("/production/LearningCurve")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.LearningCurve],
    queryFn: getData,
  });

  return query;
}
