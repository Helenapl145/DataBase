import imgRobo from '../assets/notFound.svg'

export function Error(){
    return(
        <div className='bg-white h-screen flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold text-[80px]'>
                Oops! <br />
                Page not found.
            </h1>
            <span className='text-info text-[40px]'>Erro code: 404</span>
            <img className='mt-[52px]' src={imgRobo} alt="Imagem de um robô com defeito" />
        </div>
    )
}