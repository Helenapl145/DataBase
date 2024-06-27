import { useEffect, useState } from "react";
import { parseISO, format } from 'date-fns';

interface SalesProps {
    nameProduct: string;
    dateProduct: string;
    timeProduct: string;
    nameUser: string;
    category: string;
}

export function Sales({nameProduct, dateProduct, nameUser, category}: SalesProps){
    const [newDate, setNewDate] = useState('')
    const [newTime, setNewTime] = useState('')
    
    function transformDate() {
        const dateTime = parseISO(dateProduct);
        const date = format(dateTime, 'yyyy/MM/dd');
        const time = format(dateTime, 'HH:mm:ss');
        setNewDate(date)
        setNewTime(time)
   
    }

    useEffect(() => {
          transformDate(); 
     }, [dateProduct]);

    return (
        <div className="grid lg:grid-cols-4 lg:gap-10 grid-cols-1 gap-2 text-center lg:text-start pb-5 mb-5 border-b-2 border-lineProducts">
            <h3><span className={`border-${category} border-4 rounded-md h-full mr-2`}></span>{nameProduct}</h3>
            <span>{newDate}</span>
            <span>{newTime}</span>
            <h3>{nameUser}</h3>
        </div>
    )
}