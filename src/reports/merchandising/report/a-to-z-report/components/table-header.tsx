
export default function TableHeader() {
    return (
        <>
            <tr>
                <th className="min-w-[100px]  text-balance  text-center p-1 rounded-tl-md border-r border-gray-500" rowSpan={2}>
                    Buyer
                </th>
                <th className="min-w-[100px]  text-balance  text-center p-1 border-r border-gray-500 " rowSpan={2}>
                    Order/Job #
                </th>
                <th className="min-w-[100px] text-balance  text-center p-1  border-r border-gray-500" rowSpan={2}>
                    Style
                </th>
                <th className="min-w-[70px] text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>
                    Qrder Qty [A]
                </th>
                <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Consumption release Dt. </th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={6}>Yarn</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Yarn Issue Last.Dt.</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Knitting Start Dt.</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={3}>Knitting</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Knitting Close Dt.</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={7}>Dyeing</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={3}>Finish fabric</th>
                <th className="text-balance text-center p-1 border-r border-gray-500" rowSpan={2}>Fin Fabrics Del. Last Date</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={3}>General Info</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={2}>Cutting</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={2}>Input</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={2}>Sewing</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={3}>Finishing</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={3}>Packing</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={2}>Shipping</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500">Summery</th>
            </tr>
            <tr>
                {/* <th colSpan={6}>Yarn</th> */}

                <th className="text-balance text-center p-1 border-r border-gray-500  ">Required (KG) [B]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Allocation [C]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Bal <span className="text-nowrap">[D=B-C]</span>	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Yarn Allocation Close Dt.	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Issue [E]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Issue Bal <span className="text-nowrap">[F=C-E] </span></th>


                {/* <th colSpan={3}>Knitting</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Knitting Qty [G]	<span className="hidden">(Grey rcv by gmt) </span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500  "> Knitting Bal <span className="text-nowrap">[H=B-G]</span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500  "> WIP <span className="text-nowrap">[I=E-G]</span></th>


                {/* <th colSpan={7}>Dyeing</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Gray rcvd [J]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Batch Qty [K]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Ready for batch <span className="text-nowrap">[L=J-K]</span> 	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Dyeing Qty [M]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Finishing Qty [N]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Deliver Qty [O]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500">RFT <span className="text-nowrap">[P=N-O]</span> 	</th>

                {/* <th colSpan={3}>Finish fabric</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Req Qty<span className="text-nowrap">[Q=B*0.89]</span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Rcvd Qty [R]	</th>
                <th className="text-balance text-center p-1  border-r border-gray-500">Revd Bal <span className="text-nowrap">[S=Q-R]</span></th>


                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={4}>General Info</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500 min-w-24">PO<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Style<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Order Qty<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Cutting</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Qty<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Bal<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Input</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Qty<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Ready<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Sewing</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Output<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">WIP<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Finishing</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Input<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Output<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">WIP<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Packing</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Input<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Output<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">WIP<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Shipping</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Qty<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Bal<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500">Summery</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Cut to Ship(%)<span className="text-nowrap"></span></th>
            </tr>
        </>

    )
}
