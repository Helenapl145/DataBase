import { useEffect, useState } from "react";

interface UserDataProps{
    data?: InfoUserProps | undefined
}

interface InfoUserProps {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    cpf: string;
    
}

export function InfoUser({data}: UserDataProps){
    const [id, setId] = useState('');

    const generateId = () => {
      const idGroups = Array.from({ length: 3 }, () =>
        Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('')
      );
      const formattedId = idGroups.join('-');
      setId(formattedId);
    };

    useEffect(() => {
        generateId()
    }, [])
    
    return(
        <form className='grid  lg:grid-cols-3 grid-cols-1 gap-10'>
           <div>
                <span className='text-borderGray lg:text-base text-xs'>Primeiro Nome</span>
                <h2 className={'border p-2 min-w-fit font-semibold rounded-md lg:text-lg text-sm'}>{data?.first_name}</h2>
           </div>
           <div>
                <span className='text-borderGray lg:text-base text-xs'>Sobrenome</span>
                <h2 className={'border p-2 min-w-fit font-semibold rounded-md lg:text-lg text-sm'}>{data?.last_name}</h2>
           </div>
           <div>
                <span className='text-borderGray lg:text-base text-xs'>Telefone</span>
                <h2 className={'border p-2 min-w-fit font-semibold rounded-md lg:text-lg text-sm text-numberPhone'}>{data?.phone}</h2>
           </div>
           <div>
                <span className='text-borderGray lg:text-base text-xs'>E-mail</span>
                <h2 className={'border p-2 min-w-fit font-semibold rounded-md lg:text-lg text-sm'}>{data?.email}</h2>
           </div>
           <div>
                <span className='text-borderGray lg:text-base text-xs'>CPF</span>
                <h2 className={'border p-2 min-w-fit font-semibold rounded-md lg:text-lg text-sm'}>{data?.cpf}</h2>
           </div>
           <div>
                <span className='text-borderGray lg:text-base text-xs'>ID</span>
                <h2 className={'border p-2 min-w-fit font-semibold rounded-md lg:text-lg text-sm'}>{id}</h2>
           </div>
        </form>
    )
}