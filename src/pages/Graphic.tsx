import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import { SelectorSeller } from '../components/SelectorSeller';
import { SelectorYear } from '../components/SelectorYear';

import { dateFormat } from '../services/dateFormat';
import { api, fetchProfile } from "../services/api";


interface Sale {
  date: string;
  price: number;
  seller: {
    first_name: string;
  };
}

interface PriceData {
  year: string;
  month: string;
  price: number;
}

interface YearData {
  year: string;
  data: PriceData[];
}

interface SellerData {
  seller: string;
  data: PriceData[];
}


interface GraphicProps {
  width?: number;
  height?: number;
  margin?: { top: number; right: number; left: number; bottom: number };
}

export function Graphic({ width = 600, height = 300, margin = { top: 20, right: 30, left: 20, bottom: 5 } }: GraphicProps) {
  const [data, setData] = useState<Sale[]>([]);
  const [newDataSeller, setNewDataSeller] = useState<SellerData>({ seller: '', data: [] });
  const [yearSelected, setYearSelected] = useState<string | undefined>();

  const accessLevel = fetchProfile();
  const date = dateFormat();
  const navigate = useNavigate();
  
  let levelUser: number; 

  const allPriceYear: Record<string, Record<string, number>> = {};
  const allPriceSeller: Record<string, Record<string, Record<string, number>>> = {};
  
  const allSeller: SellerData[] = [];
  const allYear: YearData[] = [];

  accessLevel.then((result) => {
    verifyLevel(result);
  });

  function verifyLevel(value: number) {
    levelUser = value;
    if (levelUser === 0) {
      navigate('/error');
    }
  }

  function convertMonths(number: number): string {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return months[number];
  }

  data.forEach(item => {
    const allDate = item.date;
    const year = new Date(allDate).getFullYear().toString();
    const month = parseISO(allDate);
    const convertedMonth = format(month, 'MMMM', { locale: pt });
    const price = item.price;
    const priceConverted = Number(price.toFixed(2));
    const seller = item.seller.first_name;

    if (!allPriceSeller[seller]) {
      allPriceSeller[seller] = {};
    }
    if (!allPriceSeller[seller][year]) {
      allPriceSeller[seller][year] = {};
    }
    if (allPriceSeller[seller][year][convertedMonth]) {
      allPriceSeller[seller][year][convertedMonth] += priceConverted;
    } else {
      allPriceSeller[seller][year][convertedMonth] = priceConverted;
    }
  });

  for (const seller in allPriceSeller) {
    const sellerData: SellerData = { seller: seller, data: [] };
    for (const year in allPriceSeller[seller]) {
      for (const convertedMonth in allPriceSeller[seller][year]) {
        const data = { year: year, month: convertedMonth, price: allPriceSeller[seller][year][convertedMonth] };
        sellerData.data.push(data);
      }
    }
    allSeller.push(sellerData);
  }

  data.forEach(item => {
    const allDate = item.date;
    const year = new Date(allDate).getFullYear().toString();
    const month = new Date(allDate).getMonth();
    const convertedMonth = convertMonths(month);
    const price = item.price;
    const priceConverted = Number(price.toFixed(2));

    if (!allPriceYear[year]) {
      allPriceYear[year] = {};
    }
    if (allPriceYear[year][convertedMonth]) {
      allPriceYear[year][convertedMonth] += priceConverted;
    } else {
      allPriceYear[year][convertedMonth] = priceConverted;
    }
  });

  for (const year in allPriceYear) {
    const yearData: YearData = { year: year, data: [] };
    for (const convertedMonth in allPriceYear[year]) {
      const data = { month: convertedMonth, price: allPriceYear[year][convertedMonth], year: '',};
      yearData.data.push(data);
    }
    allYear.push(yearData);
  }

  function handleSelectedYear(e: React.ChangeEvent<HTMLSelectElement>) {
    const yearSelected = e.target.value;
    setYearSelected(yearSelected);
  }

  function handleSelectSeller(e: React.ChangeEvent<HTMLSelectElement>) {
    const sellerSelected = e.target.value;
    const filteredSeller = allSeller.find(dado => dado.seller === sellerSelected);
    if (filteredSeller) {
      filteredSeller.data = filteredSeller.data.filter(item => item.year === yearSelected);
      setNewDataSeller(filteredSeller);
      
    }
  }

  useEffect(() => {
    
    async function fetchSales() {
      
      const access_token = localStorage.getItem("@dtlabs");

      const response = await api.get('/sales', {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      });
      setData(response.data);
    }
    fetchSales();
 
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <h2 className="text-2xl font-semibold mb-2">Gráficos de venda</h2>
      <span className="text-xl text-subtitle">{date}</span>

      <nav className='flex flex-col lg:flex-row my-10 gap-8'>
        <SelectorYear key={1} title='Ano de Referência' year={allYear.map(item => item.year)} handleSelected={handleSelectedYear} />
        <SelectorSeller key={2} title='Vendedores' seller={allSeller.map(item => item.seller)} handleSelected={handleSelectSeller} />
      </nav>

      <main className='grid lg:grid-cols-2 gap-10 self-center lg:self-stretch'>
        {yearSelected && (
          <div>
            <h2 className='text-center font-bold text-2xl text-black'>{yearSelected}</h2>
            <BarChart
              width={width}
              height={height}
              data={newDataSeller.data}
              margin={margin}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#EB4C4C" />
            </BarChart>
          </div>
        )}

        {newDataSeller.data.length === 0 && (
          <h1>Escolha os filtros que deseja e recomendamos começar pelo ano</h1>
        )}
      </main>
    </div>
  );
}
