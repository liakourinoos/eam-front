import { useState, useEffect } from "react";
import { RenderHeaderNavbar } from '../../global_assets/global_functions.jsx'
import { useAuth } from '../customHooks.jsx';
import Footer from '../generic components/Footer.jsx';
import NannyDraftOffers from '../views/Nanny/NannyDraftOffers.jsx';
import NannyFinalOffers from '../views/Nanny/NannyFinalOffers.jsx';
import { useLocation } from "react-router-dom";
function NannyOffers() {
    const { userData, loading } = useAuth();

    const [selectedPage, setSelectedPage] = useState(1);

    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || "");
    
    useEffect(() => {
        if (location.state?.successMessage) {
            // Clear the state after setting the success message
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

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


    if (loading) {
        return (
            <div className="w-full h-screen bg-white flex items-center text-black justify-center text-3xl font-medium">
                <span className='text-3xl font-bold'>Φόρτωση...</span>
            </div>
        )
    }
    



    if (!loading && userData)
        return (
            <div className="w-full flex flex-col bg-white min-h-screen ">
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
                {RenderHeaderNavbar(userData, 1)}

                {/* main page */}
                <div className="w-full  flex-grow  flex flex-col">

                    {/* buttons */}
                    <div className="w-full h-16 font-medium text-xl flex items-center justify-center my-5 gap-10 rounded-md ">
                        <button className={`border-2  hover:text-white hover:bg-pallete-700 hover:border-pallete-700 hover:border-2
                                            ${selectedPage === 1 ? '  border-pallete-800 bg-pallete-800 text-white' : '  border-pallete-800 bg-white text-pallete-800'} h-full rounded-md  w-1/6  `}
                            onClick={() => setSelectedPage(1)}

                        >
                            Οριστικοποιημένες
                        </button>

                        <button className={`border-2  hover:text-white hover:bg-pallete-700 hover:border-pallete-700 hover:border-2
                                        ${selectedPage === 2 ? '  border-pallete-800 bg-pallete-800 text-white' : '  border-pallete-800 bg-white text-pallete-800'} h-full rounded-md  w-1/6  `}
                            onClick={() => setSelectedPage(2)}

                        >
                            Μη Οριστικοποιημένες
                        </button>
                    </div>

                    {/* page displayed */}
                    <div className="flex-grow">
                        {selectedPage === 1 && <NannyFinalOffers />}
                        {selectedPage === 2 && <NannyDraftOffers />}
                    </div>
                </div>

                <Footer />
            </div>
        );
}

export default NannyOffers;