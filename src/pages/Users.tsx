import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SelectorUser } from '../components/SelectUser'
import { User } from '../components/User'

import { api } from '../services/api'
import { fetchProfile } from '../services/api'
import {dateFormat} from '../services/dateFormat'

interface Sale {
  seller: {
    first_name: string;
    last_name: string;
  };
  price: number;
}

interface SellerSales {
  medal: any
  seller: string;
  allSale: string;
}


export function Users(){
  const [data, setData] = useState<Sale[]>([]);
  const [order, setOrder] = useState<string>();
  const [dataSelected, setDataSelected] = useState<SellerSales[]>([]);
  const date = dateFormat()
  const navigate = useNavigate()
  const accessLevel = fetchProfile()

  const salesSeller: Record<string, number> = {};

  let levelUser: number;

  accessLevel.then((result) => {
    verifyLevel(result)
    })
  
  data.forEach(item => {
    const seller = `${item.seller.first_name} ${item.seller.last_name}`;
      
    if (!salesSeller[seller]) {
      salesSeller[seller] = 0;
    }

    salesSeller[seller] += item.price;
  });

  function verifyLevel(value){
    levelUser = value
    if(levelUser === 0){
      navigate('/error')
    }
  }

  function changeValue(value) {
    let thousands = Math.floor(value / 1000);
    const hundred = Math.floor((value % 1000) / 100);
      
    if (hundred >= 5) {
      thousands++;
    }
      
    return `R$ ${thousands ? thousands.toLocaleString('pt-BR') + 'k' : ''}`;
  }


  function handleSelected(e){
    const valueOption = e.target.value
    setOrder(valueOption)
  }

  const resultsSeller = Object.entries(salesSeller).map(([seller, allSale]) => ({
    seller,
    allSale: changeValue(allSale)
  }));


  const convertToNumber = (sale) => {
    return parseFloat(sale.replace('R$ ', '').replace('k', '')) * 1000;
  };

  const assignMedals = (items) => {
    const medals = ['border-categoryGold', 'border-categorySilver', 'border-categoryBronze'];
    return items.map((item, index) => ({
      ...item,
      medal: medals[index] || null
    }));
  };


    
  useEffect(() => {
    if(order === 'descending'){
        const descendingOrder = [...resultsSeller].sort((a, b) => convertToNumber(b.allSale) - convertToNumber(a.allSale));

        const descendingWithMedals = assignMedals(descendingOrder);
        setDataSelected(descendingWithMedals)
 
    }else if (order === 'growing') {
        const ascendingOrder = [...resultsSeller].sort((a, b) => convertToNumber(a.allSale) - convertToNumber(b.allSale));
 

     
        const ascendingWithMedals = assignMedals(ascendingOrder);
        setDataSelected(ascendingWithMedals)
    }
   },[order])

    useEffect(() => {
        async function fetchSales() {
          const access_token = localStorage.getItem("@dtlabs")
  
          const response = await api.get('/sales', {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${access_token}`
            }
          });
          setData(response.data)
        }
  
        fetchSales()
      },[])
      
    return (
        <div className='font-poppins'>
          <h2 className="text-xl font-semibold mb-8">Usuários</h2>
          <h1 className="text-2xl text-subtitle mb-2">{date}</h1>
          <hr className='border border-line w-full  mb-8'/>
          <SelectorUser handleSelected={handleSelected}/>

          <main className="bg-white w-full p-10 max-h-fit mt-8 rounded-lg">
            {dataSelected && (
                dataSelected.map(item => (
                  <User  key={item.seller} category={item.medal ? item.medal : 'border-white'}   nameUser={item.seller} costPrice={item.allSale}/>
                ))
            )}

            {dataSelected.length === 0 && (<h1>Selecione uma ordem!</h1>)}
          </main>
        </div>
    )
}