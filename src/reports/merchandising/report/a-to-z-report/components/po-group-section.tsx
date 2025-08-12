import { IAtoZReport } from "./IAtoZReport";
import TableRows from "./table-rows";

type props = {
  data: IAtoZReport[]
}

export default function PoGroupSection({ data }: props) {
  return (
    <TableRows data={data} />
  );
}
