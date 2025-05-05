import { FabricBookingReportDto_FabricQtyDetails, FabricBookingReportDto_WastagePercentage } from '../fabric-booking-type'

export default function Details({ lstFabricQtyDetails, lstWastagePercentage }: { lstFabricQtyDetails?: FabricBookingReportDto_FabricQtyDetails[], lstWastagePercentage?: FabricBookingReportDto_WastagePercentage[] }) {
    const data = lstFabricQtyDetails?.filter(e => e.IS_CONSIDER_AS_RIB_FOR_REPORT == "0");

    function getTotalFabricQty() {
        let qty = 0;
        try {
            data?.forEach(element => {
                qty += Number(element.TOTALFINISHFABRICS);
            });
        } catch (error) {
            console.log(error)
        }
        return qty.toFixed(2);
    }

    function getTotalYarnQty() {
        let qty = 0;
        try {
            data?.forEach(element => {
                qty += Number(element.TOTALYARN);
            });
        } catch (error) {
            console.log(error)
        }
        return qty.toFixed(2);
    }



    return (
        <div className='mt-10'>
            <table>
                <thead>
                    <tr>
                        <th className='p-1 border border-gray-600 text-sm text-center'>PO</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Art./Style</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Parts</th>
                        <th className='p-1 border border-gray-600 text-sm text-center min-w-[150px]'>Fabrication</th>
                        <th className='p-1 border border-gray-600 text-sm text-center min-w-[150px]'>Yarn count</th>
                        <th className='p-1 border border-gray-600 text-sm text-center min-w-[110px]'>GMT Color</th>
                        <th className='p-1 border border-gray-600 text-sm text-center min-w-[110px]'>FABRIC Color</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Color Code</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Lab Ref.LD</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Size</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>FINISH DIA</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>GSM</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Fabric Form</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Fabric W%</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Gmt W%</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Total Finish Conj./dz</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Total Finish Fabrics</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>UOM</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Total Yarn</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Sample fabric qty</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Remarks</th>
                    </tr>
                </thead>
                <tbody>

                    {data?.map(ele =>
                        <tr>
                            <td className='border border-gray-600 text-sm text-center'>{ele.PO}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.ARTSTYLE}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.PARTS}</td>
                            <td className='border border-gray-600 text-sm text-center min-w-[15%]'>{ele.FABRICATION}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.YARNCOUNT}</td>
                            <td className='border border-gray-600 text-sm text-center min-w-[110px]'>{ele.GMTCOLOR}</td>
                            <td className='border border-gray-600 text-sm text-center min-w-[110px]'>{ele.FABRICCOLOR}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.COLORCODE}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.LABREFLD}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.GMT_SIZE}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.FINISHDIA}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.GSM}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.FABRICFORM}</td>
                            <td className='border border-gray-600 text-sm text-center'>
                                {
                                    lstWastagePercentage?.filter(_ =>
                                        _.FABRIC == ele.FABRICATION &&
                                        _.GMT_PART == ele.PARTS &&
                                        _.GMT_COLOR == ele.GMTCOLOR &&
                                        _.FABRIC_COLOR == ele.FABRICCOLOR
                                    )[0]?.FABRIC_WASTAGE_PERCENTAGE_BUGET
                                }
                            </td>
                            <td className='border border-gray-600 text-sm text-center'>
                                {
                                    lstWastagePercentage?.filter(_ =>
                                        _.FABRIC == ele.FABRICATION &&
                                        _.GMT_PART == ele.PARTS &&
                                        _.GMT_COLOR == ele.GMTCOLOR &&
                                        _.FABRIC_COLOR == ele.FABRICCOLOR
                                    )[0]?.GMT_WASTAGE_PERCENTAGE_BUDGET
                                }
                            </td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.TOTALFINISHCONJDZN}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.TOTALFINISHFABRICS}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.UOM}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.TOTALYARN}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.SAMPLEFABRICQTY}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.REMARKS}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th className='p-1 border border-gray-600 text-sm text-center' colSpan={16}>Total</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>{getTotalFabricQty()}</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'></th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>{getTotalYarnQty()}</th>
                        <th className='p-1 border border-gray-600 text-sm text-center' colSpan={2}></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
