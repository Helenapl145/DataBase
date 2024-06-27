interface SelectProps {
  title: string;
  year: string[]; // Agora aceita um array de strings
  handleSelected: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectorYear({ title, year, handleSelected }: SelectProps) {
  let allYear: { year: string }[] = []; // Inicialização da variável allYear
  
  if (year && Array.isArray(year)) { // Verifica se year é um array
    for (var i = 0; i < year.length; i++) {
      var eachYear = {
        year: year[i]
      };
      allYear.push(eachYear);
    }
  } else {
    console.error('O valor de "year" não é um array de strings.');
  }

  return (
    <div className='flex flex-col'>
      <label htmlFor="saller" className='font-semibold text-lg'>{title}</label>
      <select name="saller" id="saller" className='bg-transparent border border-borderGray rounded h-12 w-44' onChange={handleSelected}>
        <option value="" hidden>Selecione</option>
        {allYear.map(item => (
          <option key={item.year} value={`${item.year}`}>{item.year}</option>
        ))}
      </select>
    </div>
  )
}
