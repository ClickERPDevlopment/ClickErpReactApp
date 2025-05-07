import { SampleProgramReportDto_CollarCuffType } from '../sample-program-report.-type'

export default function CollarCuff({ lstCollarCuff }: { lstCollarCuff?: SampleProgramReportDto_CollarCuffType[] }) {
    if (lstCollarCuff) {
        return lstCollarCuff?.length <= 0 ? null :
            (
                <div className='mt-5 flex'>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={9} className='p-1 min-w-36 border border-gray-600 text-center'>Collar, Cuff & Placket Details</th>
                            </tr>
                            <tr>
                                <th className='p-1 min-w-36 border border-gray-600 text-center'>Fabric</th>
                                <th className='p-1 min-w-24 border border-gray-600 text-center'>Color</th>
                                <th className='p-1 min-w-20 border border-gray-600 text-center'>Size</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Collar Pcs</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Collar Size</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Cuff Pcs</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Cuff Size</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Plkt Pcs</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Plkt Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lstCollarCuff?.map((ele) =>
                                <tr>
                                    <td className='p-1 border border-gray-600 text-center'>{ele.FABRIC}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele.COLORNAME}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele.SIZENAME}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele.COLLAR_PCS}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele.COLLAR_SIZE}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele.CUFF_PCS}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele.CUFF_SIZE}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele.PLACKET_QTY}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele.PLACKET_SIZE}</td>
                                </tr>
                            )}
                        </tbody>
                        {/* <tfoot>
                    <tr>

                        <th className='p-1 border border-gray-600 text-center' colSpan={10}>Total</th>
                        <th className='p-1 border border-gray-600 text-center'>
                            {
                                lstCollarCuff?.reduce((p, c) => p + Number(c.REQ_FINISH_FAB), 0).toFixed(2)
                            }
                        </th>
                        <th className='p-1 border border-gray-600 text-center'></th>
                        <th className='p-1 border border-gray-600 text-center'>
                            {
                                lstCollarCuff?.reduce((p, c) => p + Number(c.TOTAL_YARN), 0).toFixed(2)
                            }
                        </th>
                    </tr>
                </tfoot> */}
                    </table>
                </div>
            )
    }
}
