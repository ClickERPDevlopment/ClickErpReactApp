
export default function Signature() {
    const catagories = ['Prepared By', 'Approve By', 'Team Leader', 'Planning', 'Authorise']
    return (
        <div className="flex justify-around items-center mt-10">
            {catagories.map(ele =>
                <div className="w-32 flex flex-col">
                    <div className="text-center">
                        <span></span>
                    </div>
                    <div className="text-center  border-t-2 border-gray-600">
                        <span>{ele}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
