import { useEffect, useState } from "react"

import { Sales } from "../components/Sales"

import {dateFormat} from '../services/dateFormat'
import { api } from "../services/api.ts"


interface Sale {
  price: number;
  classification: string;
  product: {
    name: string;
  };
  date: string;
  seller: {
    first_name: string;
  };
}

export function Dashboard() {
  const [data, setData] = useState<Sale[]>([])

  const date = dateFormat()

  data.forEach((item) => {
 
    const formattedPrice = parseFloat(item.price.toFixed(2))

  
    item.classification = formattedPrice >= 5000.00 ? 'categoryGood' : 'categoryBad';
    
  });
  

  useEffect(() => {
    async function fetchSales() {
      const access_token = localStorage.getItem("@db")

      const response = await api.get('/user/sales', {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      });
      setData(response.data)
    }

    fetchSales()
  }, [])

  return (
    <div className="font-poppins">
      <h2 className="text-xl font-semibold mb-10">Dashboard</h2>
      <span className="text-2xl text-subtitle">{date}</span>

      <h1 className="text-3xl font-semibold my-4">Últimas vendas deste mês</h1>

     

      <main className="bg-white w-full p-10 max-h-fit min-w-fit rounded-lg">
      {data.length === 0 && (<h1>Você não fez vendas esse mês</h1>)}
      {data.length > 0 && data.map((item, index) => (
        <Sales key={index} category={item.classification ? item.classification : 'border-red-500'} nameProduct={item.product.name} dateProduct={item.date} nameUser={item.seller.first_name} timeProduct={""}/>
      ))}
      </main>
    </div>
  )
}


