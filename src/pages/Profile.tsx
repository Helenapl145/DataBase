import { useEffect, useState } from 'react'

import imgProfile from '../assets/profile.png'

import { InfoUser } from '../components/InfoUser'

import { api } from "../services/api.ts"

interface UserProfile {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    cpf: string;
    occupancy: string;
  }

export function Profile() {
    const [data, setData] = useState<UserProfile | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            const access_token = localStorage.getItem("@dtlabs")
            const response = await api.get('/users/me', {
                headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${access_token}`
                }
            });
            console.log(response.data.occupancy)
            setData(response.data)
        }
        
        fetchProfile()
    }, [])
    return(
        <div className='flex justify-center mt-16 h-screen'>
            <section className='bg-white h-fit w-4/5 min-w-fit lg:w-3/4 p-10 flex flex-col rounded-lg'>
                <header className='flex flex-col items-center gap-1 mb-10'>
                    <img src={imgProfile} alt="Imagem de perfil" className='rounded-full'/>
                    <h1 className='font-semibold text-2xl'>{data?.first_name} {data?.last_name}</h1>
                    <span className='text-borderGray '>{data?.occupancy}</span>
                </header>

                
                {data && (
                    <InfoUser data={data}/>
                )}
              
            </section>
        </div>
    )
}