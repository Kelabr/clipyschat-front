export default function Message({name, text}){
    return(
        <div className="w-full flex justify-end mb-4">
            <div className=" rounded-lg p-2 w-[80vw] bg-gray-500">
                <p className="font-medium">{name}</p>
                <p>{text}</p>
            </div>
        </div>

    )
}