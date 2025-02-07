import React, { useContext } from "react";
import YarnBookingReportContext from "./yb-rpt-context";

export default function YarnBookingReportComments() {
  var data = useContext(YarnBookingReportContext);

  return (
    <table className="my-5 w-full">
      <thead>
        <tr>
          <th className="border border-black w-20">SL</th>
          <th className="border border-black w-auto">COMMENTS</th>
        </tr>
      </thead>
      <tbody>
        {data?.lstComments?.map((comm, index) => (
          <tr key={Math.random()}>
            <td className="border border-black text-center text-sm">
              {index + 1}
            </td>
            <td className="border border-black pl-3 text-sm">
              {comm.COMMENTS}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
