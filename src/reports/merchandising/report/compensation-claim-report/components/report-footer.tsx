import { ICompensationClaimMasterType } from "../compensation-claim-report-type";

function ReportFooter({ data }: { data: ICompensationClaimMasterType | undefined }) {
  // Signature labels
  const signatures = [
    { name: data?.CREATED_BY_NAME || "", label: "Prepared By" },
    { name: "", label: "Received By" },
    { name: "", label: "Quality In Charge" },
    { name: "", label: "In Charge" },
    { name: "", label: "Quality Manager" },
    { name: "", label: "Knitting Manager" },
    { name: "", label: "Manager (Yarn)" },
    { name: "", label: "DGM Knitting" },
    { name: "", label: "Approved By" },
  ];

  return (
    <div>
      <table className="w-full text-center border-0">
        <tbody>
          <tr>
            {signatures.map((sig, idx) => (
              <td key={idx} className="px-2 border-0">
                <span >{sig.name}</span>
              </td>
            ))}
          </tr>
          <tr>
            {signatures.map((sig, idx) => (
              <td key={idx} className="px-2 border-0">
                <span className="block border-t border-gray-950 text-sm">{sig.label}</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportFooter;
