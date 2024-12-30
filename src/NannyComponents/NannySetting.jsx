import { useState } from "react";
import Footer from "../generic components/Footer.jsx";
import ProfileEdit from "../views/Profile/ProfileEdit.jsx";
import AccountEdit from "../views/Profile/AccountEdit.jsx";
import Certifications from "../views/Profile/Certifications.jsx";
import {RenderHeaderNavbar} from '../../global_assets/global_functions.jsx'
import { useAuth } from "../customHooks.jsx";
import AvailabilityAndSkills from "../views/Profile/AvailabilityAndSkills.jsx";

function NannySettings(){
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
                    <button className={`${shownPage==3 ? "text-red-500 underline":" text-black" } font-medium text-lg  `}
                            onClick={()=>toggleShownPage(3)}
                    >Πιστοποιητικά</button>
                    <button className={`${shownPage==4 ? "text-red-500 underline":" text-black" } font-medium text-lg  `}
                            onClick={()=>toggleShownPage(4)}
                    >Διαθεσιμότητα & Εξοικιώσεις</button>

                </div>

                {/* right div */}

                <div className="w-full   ">
                    {shownPage ==1 && <ProfileEdit />}
                    {shownPage==2 && <AccountEdit  />}
                    {shownPage==3 && <Certifications  />}
                    {shownPage==4 && <AvailabilityAndSkills  />}



                </div>


            </div>
            <Footer/>
        </div>


    );


}

export default NannySettings;