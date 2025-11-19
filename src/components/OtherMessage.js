export default function OtherMessage({name, text}){
    return(
        <div className="w-full flex justify-start  mb-4">
            <div className=" rounded-lg p-2 w-[80vw] bg-gray-300 justify-end">
                <p className="font-medium">{name}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}