import useAppClient from "@/hooks/use-AppClient";

export interface ReportHeaderProps {
  companyName?: string;
  companyAddress?: string;
  reportTitle?: string;
}

const clinet = useAppClient();

const ReportHeader: React.FC<ReportHeaderProps> = ({
  companyName = "International Classic Composite Ltd.",
  companyAddress = "568 & 584, Naojour, Kodda, Jaydevpur, Gazipur.",
}) => {
  return (
    <header className="report-header">
      <div>
        <p className="text-sm font-bold text-start w-full">
          "CLICK"
        </p>

        <h1 className="text-2xl font-bold text-center">{clinet.currentClient == clinet.EURO ? "EUROTEX KNITWEAR LTD" : companyName}</h1>

        <h4 className="text-sm font-bold text-center">{clinet.currentClient == clinet.EURO ? "Nayamati, Kutubpur, Fatullah, Narayanganj" : companyAddress}</h4>

        <h3 className="text-xl font-bold text-center mt-2">CLAIM LETTER</h3>
      </div>
    </header>
  );
};

export default ReportHeader;
