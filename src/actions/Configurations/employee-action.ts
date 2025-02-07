import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "src/utility/react-query-key";
import useAxiosInstance from "src/lib/axios-instance";

export type EmployeeType = {
  EMP_ID: number;
  NAME: string;
};

export function GetAllEmployee() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<EmployeeType[]> =>
    (await axios.get("/production/Employee")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.Employee],
    queryFn: getData,
  });

  return query;
}
