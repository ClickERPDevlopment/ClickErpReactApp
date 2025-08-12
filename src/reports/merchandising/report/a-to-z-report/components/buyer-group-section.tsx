import { IAtoZReport } from "./IAtoZReport";
import PoGroupSection from "./po-group-section";

type props = {
  data: IAtoZReport[]
}
const uniquePo = (data: IAtoZReport[]) => [...new Set(data?.map(item => item.PONO))];

export default function BuyerGroupSection({ data }: props) {
  return (
    uniquePo(data)?.map((po, i) => (
      <PoGroupSection data={data?.filter(y => y.PONO === po)} key={i} />
    )));
}
