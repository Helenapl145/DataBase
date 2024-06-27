import { NavLink, useNavigate} from "react-router-dom";
import { GoHomeFill, GoGraph  } from "react-icons/go";
import { ImDatabase } from "react-icons/im";
import { PiUserCircle } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";

import Logo from '../assets/logo.png'
import { useAuth } from "../hooks/auth"

export function Navbar(){
    const {signOut} = useAuth()
    const navigate = useNavigate()

    function handleSignOut(){
        signOut()
        navigate('/')
    }

    return(
        <aside className="bg-white lg:w-1/5 w-1/4 min-w-fit max-h-full lg:pl-10 lg:pt-10 pl-4 pt-4 font-poppins flex flex-col items-start ">
            <img src={Logo} alt="Logo da dtLabs" className="self-center w-24"/>
            <hr className="my-10 border border-line w-20 lg:w-11/12 self-center"/>
            <ul className="flex flex-col gap-12"> 
             
    
            <NavLink 
                to='/dashboard'  
                className={`flex items-center gap-2 lg:text-xl ${
                location.pathname === '/dashboard' ? 'text-active font-bold border-r-4 border-active pr-8 lg:pr-36' : 'hover:text-active'
                }`}
            >
                <GoHomeFill className="lg:text-2xl text-x"/> Dashboard
            </NavLink>

                <NavLink 
                    to='/graphic'  
                    className={({ isActive }) =>
                    isActive ? 'flex items-center gap-2 lg:text-xl text-active font-bold border-r-4 border-active pr-8 lg:pr-36' : 'flex items-center gap-2 lg:text-xl hover:text-active'}>
                    <GoGraph className="lg:text-2xl text-xl"/>Gráficos
                </NavLink>

                <NavLink 
                    to='/users' 
                    className={({ isActive }) =>
                    isActive ? 'flex items-center gap-2 lg:text-xl text-active font-bold border-r-4 border-active pr-8 lg:pr-36' : 'flex items-center gap-2 lg:text-xl hover:text-active'}>
                        <ImDatabase className="lg:text-2xl text-xl"/> Usuários
                </NavLink>
            </ul>

            <hr className="my-12 border border-line w-24 self-center"/>

            <ul className="flex flex-col gap-12">
                <NavLink 
                    to='/profile' 
                    className={({ isActive }) =>
                    isActive ? 'flex items-center gap-2 lg:text-xl text-active font-bold border-r-4 border-active pr-8 lg:pr-36' : 'flex items-center gap-2 lg:text-xl hover:text-active'}>
                    <PiUserCircle className="lg:text-2xl text-xl"/>Perfil
                </NavLink>

                <button onClick={handleSignOut} className="flex items-center gap-2 hover:text-active">  
                    <FiLogOut className="lg:text-2xl text-xl"/> Logout
                </button>
            </ul>
        </aside>
    )
}