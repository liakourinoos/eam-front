import { useState, useEffect } from "react";
import Footer from "../generic components/Footer.jsx";
import ProfileEdit from "../views/Profile/ProfileEdit.jsx";
import AccountEdit from "../views/Profile/AccountEdit.jsx";
import Certifications from "../views/Profile/Certifications.jsx";
import { RenderHeaderNavbar } from '../../global_assets/global_functions.jsx'
import { useAuth } from "../customHooks.jsx";
import AvailabilityAndSkills from "../views/Profile/AvailabilityAndSkills.jsx";

function NannySettings() {
    const [shownPage, setShownPage] = useState(1);
    const toggleShownPage = (num) => setShownPage(num)

    const { userData } = useAuth();


    const [successMessage, setSuccessMessage] = useState("");
    const duration = 3000;
    useEffect(() => {
        if (successMessage.length > 0) {//make it appear for some seconds
            const timer = setTimeout(() => {
                setSuccessMessage(""); // Hide the alert after the duration
            }, duration);
            // Cleanup the timer on component unmount
            return () => clearTimeout(timer);
        }
    }, [successMessage, duration])
    return (
        <div className="w-full  ">
            {successMessage.length > 0 &&
                <div role="alert" className="alert alert-success fixed top-20 left-1/2 transform z-10 -translate-x-1/2 w-1/2 flex items-center justify-center  p-4 rounded shadow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current text-white text-2xl "
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className='text-white font-bold text-xl'>{successMessage}</span>
                </div>
            }
            {RenderHeaderNavbar(userData, 0)}
            {/* //main div to change what type of info will be changed */}
            <div className="w-full bg-white flex ">

                {/* left div to select which page will be shown */}
                <div className="w-1/5 flex flex-col items-center h-full  mt-10 ml-10 sticky top-5 ">
                    <button className={`${shownPage == 1 ? "text-pallete-800 font-semibold underline" : " text-black"} hover:text-pallete-700 font-medium text-lg  `}
                        onClick={() => toggleShownPage(1)}
                    >Το Προφίλ Μου</button>
                    <button className={`${shownPage == 2 ? "text-pallete-800 font-semibold underline" : " text-black"} hover:text-pallete-700 font-medium text-lg  `}
                        onClick={() => toggleShownPage(2)}
                    >Στοιχεία Λογαριασμού</button>
                    <button className={`${shownPage == 3 ? "text-pallete-800 font-semibold underline" : " text-black"} hover:text-pallete-700 font-medium text-lg  `}
                        onClick={() => toggleShownPage(3)}
                    >Πιστοποιητικά</button>
                    <button className={`${shownPage == 4 ? "text-pallete-800 font-semibold underline" : " text-black"} hover:text-pallete-700 font-medium text-lg  `}
                        onClick={() => toggleShownPage(4)}
                    >Διαθεσιμότητα & Εξοικιώσεις</button>

                </div>

                {/* right div */}

                <div className="w-full   ">
                    {shownPage == 1 && <ProfileEdit setSuccessMessage={setSuccessMessage} />}
                    {shownPage == 2 && <AccountEdit setSuccessMessage={setSuccessMessage}/>}
                    {shownPage == 3 && <Certifications setSuccessMessage={setSuccessMessage}/>}
                    {shownPage == 4 && <AvailabilityAndSkills setSuccessMessage={setSuccessMessage}/>}



                </div>


            </div>
            <Footer />
        </div>


    );


}

export default NannySettings;