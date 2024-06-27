interface UserProps {
    costPrice: string;
    nameUser: string;
    category: string;
}

export function User({costPrice, nameUser, category}: UserProps){
    return (
        <div className="flex justify-between pb-5 mb-5 border-b-2 border-lineProducts">
            <h3><span className={`${category} border-4 rounded-md h-full mr-4`}></span>{nameUser}</h3>
            <span>{costPrice}</span>
        </div>
    )
}