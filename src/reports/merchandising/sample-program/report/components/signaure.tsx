
export default function Signature() {
    const data = ["Merchandiser", "Knitting", "Dyeing"];
    return (
        <div className="mt-12 flex justify-around">
            {data?.map(ele =>
                <div>
                    <span></span>
                    <div className="border-t border-t-gray-600 w-36 flex justify-center">
                        <span>{ele}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
