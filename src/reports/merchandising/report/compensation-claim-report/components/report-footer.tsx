import { ICompensationClaimMasterType } from "../compensation-claim-report-type";

function ReportFooter({ data }: { data: ICompensationClaimMasterType | undefined }) {
  // Signature labels
  const signatures = [
    { name: data?.CREATED_BY_NAME || "", label: "Prepared By" },
    { name: "", label: "Received By" },
    { name: "", label: "QC In Charge" },
    { name: "", label: "In Charge" },
    { name: "", label: "Q. Manager" },
    { name: "", label: "K. Manager" },
    { name: "", label: "Manager (Yarn)" },
    { name: "", label: "DGM Knitting" },
    { name: "", label: "Approved By" },
  ];

  return (
    <div className="mt-10">
      <table className="w-full text-center border-0">
        <tbody>
          <tr>
            {signatures.map((sig, idx) => (
              <td key={idx} className="px-2 border-0">
                <div className="min-w-[80px]">
                  <span className="block">{sig.name}</span>
                  <span className="block border-t mt-2 pt-1 text-sm">{sig.label}</span>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportFooter;
