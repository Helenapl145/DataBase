interface SelectProps{
  handleSelected: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectorUser({handleSelected}:SelectProps) {
   
    return(
        <div className='flex flex-col'>
          <label htmlFor="saller" className='font-semibold text-lg'>Ordenar por:</label>
          <select name="saller" id="saller" className='bg-transparent border border-borderGray rounded h-12 w-44' onChange={handleSelected}>
            <option value="" selected hidden>Selecione</option>
            <option value="descending">Decrescente</option>
            <option value="growing">Cresente</option>t
          </select>
        </div>
    )
}