export default function ReportFooter() {
    const signs = ["Received By", "Store In-Charge", "Knitting In-Charge", "Manager (Yarn)", "DGM (Knitting)", "Authorised Sign"]
    return (
        <div className="mt-20 flex justify-around font-bold">
            {signs?.map(ele =>
                <div className="flex flex-col justify-end">
                    <span></span>
                    <div className="border-t border-t-gray-600 w-36 flex justify-center">
                        <span>{ele}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
