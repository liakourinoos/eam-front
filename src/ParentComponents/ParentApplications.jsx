import { useState } from "react";
import {RenderHeaderNavbar} from '../../global_assets/global_functions.jsx'
import { useAuth } from '../customHooks.jsx';
import Footer from '../generic components/Footer.jsx';
import ParentFinalApplications from "../views/Parent/ParentFinalApplications.jsx";
import ParentDraftApplications from "../views/Parent/ParentDraftApplications.jsx";

function ParentApplications() {
    const { userData,loading } = useAuth();

    const [selectedPage,setSelectedPage] = useState(1);

    if(loading){
        return(
            <div className="w-full h-screen bg-white flex items-center text-black justify-center text-3xl font-medium">            
                <h1>Loading...</h1>
            </div> 
        )
    }





    if(!loading && userData)
        return (
            <div className="w-full flex flex-col bg-pallete-50 min-h-screen ">
                {RenderHeaderNavbar(userData,2)}

                {/* main page */}
                <div className="w-full  flex-grow  flex flex-col ">

                    {/* buttons */}
                    <div className="w-full h-16 font-medium text-xl flex items-center justify-center my-5 gap-10 rounded-md ">
                        <button     className={` ${selectedPage===1 ? 'bg-pallete-400 border-gray-700' : "bg-gray-300 border-gray-400" } h-full rounded-md  w-1/6  border-2`}
                                    onClick={()=>setSelectedPage(1)}
                        >
                            Οριστικοποιημένες
                        </button>

                        <button     className={` ${selectedPage===2 ? 'bg-pallete-400 border-gray-700' : "bg-gray-300 border-gray-400" } h-full rounded-md  w-1/6  border-2`}
                                    onClick={()=>setSelectedPage(2)}
                        >
                            Μη Οριστικοποιημένες
                        </button>
                    </div>

                    {/* page displayed */}
                    <div className="flex flex-col flex-grow bg-pallete-50 ">                    
                        {selectedPage===1 && <ParentFinalApplications/>}
                        {selectedPage===2 && <ParentDraftApplications/>}
                    </div>
                </div>
            
                <Footer/>
            </div>
        );
}

export default ParentApplications;