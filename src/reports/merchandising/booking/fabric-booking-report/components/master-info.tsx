import moment from 'moment'
import { FabricBookingReportDto_MasterData } from '../fabric-booking-type'



export default function MasterInfo({ masterData }: { masterData: FabricBookingReportDto_MasterData }) {
    return (
        <div className='container'>
            <h1 className='text-right'>{moment(masterData?.CONS_DATE).format('d-MMM-yy')}</h1>

            <div className='top_head_table_content' >
                <div className='order_info'>
                    <h1 className='factory-name'>{masterData?.COMPANY_NAME}</h1>
                    <h3 className='report-name' >FABRICS BOOKING SHEET</h3>
                    {/* <table className='table_one'>
                        <tbody>
                            <tr>
                                <td className='first_column'>Job No.</td>
                                <td className='value_colum'> " + Convert.ToString(dtMaster.Rows[0]["PONO"]) + @"</td>
                            </tr>
                            <tr>
                                <td className='first_column'>Buyer PO</td>
                                <td className='value_colum'> " + Convert.ToString(dtMaster.Rows[0]["SUB_PONO"]) + @"</td>
                            </tr>";
                       
                        <tr>
                            <td className='first_column'>Item Type</td>
                            <td className='value_colum'> " + dtMaster.Rows[0]["ITEMTYPE"].ToString() + @"</td>
                        </tr>";
                        docText += @"

                        <tr>
                            <td className='first_column'>Buyer Name</td>
                            <td className='value_colum'> " + dtMaster.Rows[0]["BUYER_NAME"].ToString() + @"</td>
                        </tr>";

                        docText += @"

                        <tr>
                            <td className='first_column'>Lead Time</td>
                            <td className='value_colum'>" + (Convert.ToDateTime(dtMaster.Rows[0]["SHIPMENT_DATE"]).Subtract(Convert.ToDateTime(dtMaster.Rows[0]["RECEIVE_DATE"])).Days.ToString()) + @" Days</td>
                        </tr>";

                        docText += @"

                        <tr>
                            <td className='first_column'>Release Date</td>
                            <td className='value_colum'>" + Convert.ToDateTime(dtMaster.Rows[0]["CREATED_DATE"]).ToString("dd-MMM-yy") + @"</td>
                        </tr>";

                        docText += @"

                        <tr>
                            <td className='first_column'>Fabric Source</td>
                            <td className='value_colum'>" + Convert.ToString(dtMaster.Rows[0]["FABRIC_SOURCE"]) + @"</td>
                        </tr>";

                        if (dtMaster.Rows[0]["UPDATED_DATE"] != DBNull.Value)
                        {
                            docText += @"
                            < tr >
                <td className='first_column'>Update Date</td>
                <td className='value_colum'>"
                + (dtMaster.Rows[0]["UPDATED_DATE"] == DBNull.Value
                    ? ""
                    : Convert.ToDateTime(dtMaster.Rows[0]["UPDATED_DATE"]).ToString("dd-MMM-yy"))
                + @"</td>
            </>";
        }

                    docText += @"
                </tbody>
            </table> */}
                    {/* <table className='table_two'>
                <tbody>";

                    if (!isMultiStyle)
                    {
                        docText += @"

                        < tr >
                <td className='second_column'>Order Qty</td>
                <td className='value_colum'> " + dtMaster.Rows[0]["ORDER_QTY"].ToString() + @" Pcs</td>
            </>";
        }
                docText += @"
                <tr>
                    <td className='second_column'>Shipment Date</td>
                    <td className='value_colum'> " + Convert.ToDateTime(dtMaster.Rows[0]["SHIPMENT_DATE"]).ToString("dd-MMM-yy") + @"</td>
                </tr>
                <tr>
                    <td className='second_column'>Po Rcv Date</td>
                    <td className='value_colum'> " + Convert.ToDateTime(dtMaster.Rows[0]["RECEIVE_DATE"]).ToString("dd-MMM-yy") + @"</td>
                </tr>
                <tr>
                    <td className='second_column'>Season</td>
                    <td className='value_colum'> " + Convert.ToString(dtMaster.Rows[0]["SESSIONNO"]) + @"</td>
                </tr>
                <tr>
                    <td className='second_column'>Dealing Merchant</td>
                    <td className='value_colum'> " + po.DEALMERCHANDISERNAME + @"</td>
                </tr>
                <tr>
                    <td className='second_column'>Embellishment</td>
                    <td className='value_colum'> " + Convert.ToString(dtMaster.Rows[0]["EMBELLISHMENT"]) + @"</td>
                </tr>

            </tbody>
        </table> */}
                </div >

                {/* < !----STYLE IMAGE------------------------------->
                <div className='GMT_Image' style='" + _headerVisibleStyle + @"'>
                    <img src='" + dtMaster.Rows[0]["STYLEID"].ToString() + @".jpg' alt='GMT IMAGE' srcset='' />
                </div>
                <!----END IMAGE-------------------------------> */}

            </div >

            {/* <h4 style='border: 2px solid black; width: 150px; text-align: center; margin:10px 0;'>OPEN FINISH</h4>
            <h4 style='border: 2px solid black; width: !important; text-align: center; margin:10px 0;'>" + SpecialTeatment + @"</h4> */}



            {/* if (oDs.Tables["INCM"].Rows.Count > 0) {

                docText += @"
                < div className = 'order_info' >
            <table className='table_one'>
                <thead>
                    <tr>
                        <th className='first_column' style='padding: 3px 6px;' colspan='3'>INCM DETAILS</th>
                    </tr>
                    <tr>
                        <th className='first_column' style='padding: 3px 6px;'>In-cm</th>
                        <th className='first_column' style='padding: 3px 6px;'>Job Qty</th>
                        <th className='first_column' style='padding: 3px 6px;'>Consumption</th>
                    </tr>
                </thead>
                <tbody>";

                    foreach (DataRow dtRow in oDs.Tables["INCM"].Rows)
                    {
                        docText += @"
                        < tr >
                            <td className='first_column'>" + Convert.ToString(dtRow["IN_CM"]) + @"</td>
                            <td className='first_column'>" + Convert.ToString(dtRow["JOB_QTY"]) + @"</td>
                            <td className='first_column'>" + Convert.ToString(dtRow["CONSUMPTION_QTY"]) + @"</td>
                        </tr>";
            }

                docText += @"
            </tbody>
        </table >
            "; */}
        </div >
    )
}
