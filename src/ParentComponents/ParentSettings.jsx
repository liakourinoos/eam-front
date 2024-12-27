import { useState,useContext } from "react";
// import Header from "./generic components/Header";
import Footer from "../generic components/Footer.jsx";
// import NannyNavbar from './generic components/NannyNavbar.jsx'
import ParentProfileEdit from "../views/Profile/ProfileEdit.jsx";
import AccountEdit from "../views/Profile/AccountEdit.jsx";
import {RenderHeaderNavbar} from '../../global_assets/global_functions.jsx'
import { useAuth } from "../customHooks.jsx";

function ParentSettings(){
    const [shownPage,setShownPage]= useState(1);
    const toggleShownPage=(num)=> setShownPage(num)

    const { userData } = useAuth();

    return(
        <div className="w-full  "> 
        
        {RenderHeaderNavbar(userData,0)}
            {/* //main div to change what type of info will be changed */}
            <div className="w-full bg-white flex ">

                {/* left div to select which page will be shown */}
                <div className="w-1/5 flex flex-col items-center h-full  mt-10 ml-10 sticky top-5 ">
                    <button className={`${shownPage==1 ? "text-red-500 underline":" text-black" } font-medium text-lg  `}
                            onClick={()=>toggleShownPage(1)}
                    >Το Προφίλ Μου</button>
                    <button className={`${shownPage==2 ? "text-red-500 underline":" text-black" } font-medium text-lg  `}
                            onClick={()=>toggleShownPage(2)}
                    >Στοιχεία Λογαριασμού</button>

                </div>

                {/* right div */}

                <div className="w-full   ">
                    {shownPage ==1 && <ParentProfileEdit />}
                    {/* {shownPage==1 && <p>Option 1</p>} */}
                    {/* {shownPage ==2 && <ParentAccount Edit/>} */}
                    {shownPage==2 && <AccountEdit  />}




                </div>


            </div>
            <Footer/>
        </div>


    );


}

export default ParentSettings;