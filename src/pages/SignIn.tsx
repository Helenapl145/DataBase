import { useState } from "react"
import { ToastContainer } from "react-toastify"

import { useAuth } from "../hooks/auth"

import { Loading } from "../components/Loading"


export function SignIn(){
    const [emailUser, setEmail] = useState('')
    const [passwordUser, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const {signIn} = useAuth()

    function handleSubmit(e){
        e.preventDefault()
        setEmail('')
        setPassword('')
        setLoading(true)
        
        setTimeout(() => {
            signIn(emailUser, passwordUser)
            setLoading(false)
        }, 1500)
    }

    return(
        <div className="bg-bgWhite h-screen flex items-center justify-center font-poppins relative">
            {loading && (
                <div className="absolute flex justify-center items-center  w-screen h-screen  bg-gray-800/15">
                    <Loading />
                </div>
            )}
            <ToastContainer />
            <form className="flex flex-col bg-white w-96 h-[448px] rounded-[20px] p-16 gap-10 shadow-3xl">
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-2xl pl-2" htmlFor="emailUser">Email</label>
                    <input className="border rounded-[20px] pl-2 py-3" type="email" name="emailUser" id="emailUser" placeholder="digite seu email" value={emailUser} onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className="flex flex-col gap-2 ">
                    <label className="font-bold text-2xl pl-2" htmlFor="passwordUser">Senha</label>
                    <input className="border rounded-[20px] pl-2 py-3" type="password" name="passwordUser" id="passwordUser" placeholder="coloque sua senha" value={passwordUser} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>

                <button className="bg-btnLogin rounded-[20px] text-white font-medium text-2xl py-2" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}