import { Outlet } from "react-router-dom";

import { Navbar } from "../components/Navbar";


export function Default(){
    return(
        <div className="bg-bgWhite h-full flex ">
         
            <Navbar />
          
            <div className="p-10 w-full h-screen overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}