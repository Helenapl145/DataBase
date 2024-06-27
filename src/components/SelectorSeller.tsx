interface SelectProps {
  title: string;
  seller: string[]; // Agora aceita um array de strings
  handleSelected: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectorSeller({ title, seller, handleSelected }: SelectProps) {
  let allSeller: { seller: string }[] = []; // Inicialização da variável allSeller
  
  if (seller && Array.isArray(seller)) { // Verifica se seller é um array
    for (var i = 0; i < seller.length; i++) {
      var eachSeller = {
        seller: seller[i]
      };
      allSeller.push(eachSeller);
    }
  } else {
    console.error('O valor de "seller" não é um array de strings.');
  }

  return (
    <div className='flex flex-col'>
      <label htmlFor="saller" className='font-semibold text-lg'>{title}</label>
      <select name="saller" id="saller" className='bg-transparent border border-borderGray rounded h-12 w-44' onChange={handleSelected}>
        <option value="" hidden>Selecione</option>
        {allSeller.map(item => (
          <option key={item.seller} value={`${item.seller}`}>{item.seller}</option>
        ))}
      </select>
    </div>
  )
}
