import { RenderHeaderNavbar } from '../../global_assets/global_functions.jsx';
import { useAuth } from '../customHooks.jsx';
import Footer from '../generic components/Footer.jsx';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import NannyOffersHistory from '../views/Nanny/NannyOffersHistory.jsx';
import NannyContactsHistory from '../views/Nanny/NannyContactsHistory.jsx';
import NannyDealsHistory from '../views/Nanny/NannyDealsHistory.jsx';
import NannyPaymentsHistory from '../views/Nanny/NannyPaymentsHistory.jsx';

export default function NannyHistory({ initialPage = 1 }) {
    const { id } = useParams();
    const { userData, loading } = useAuth();
    const [selectedPage, setSelectedPage] = useState(initialPage); // Which page is currently selected

    if(loading){
        return(
            <div className="w-full h-screen bg-white flex items-center text-black justify-center text-3xl font-medium">            
                <h1>Loading...</h1>
            </div> 
        )
    }

    if(!loading && userData) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center bg-white">
                {RenderHeaderNavbar(userData, 4)}
                {/* Buttons */}
                <div className="mt-5 mb-7 space-x-4  ">

                        <button
                            onClick={() => setSelectedPage(1)}
                            className={`cursor-pointer w-80 ${selectedPage === 1 ? "bg-pallete-400 border-gray-700" : "bg-gray-300 border-gray-400"}  text-black py-2 px-6 rounded-lg border border-gray-400 font-semibold text-lg w-1/6 h-20`}>
                            Αγγελίες
                        </button>
                        <button
                            onClick={() => setSelectedPage(2)}
                            className={`cursor-pointer w-80 ${selectedPage === 2 ? "bg-pallete-400 border-gray-700" : "bg-gray-300 border-gray-400"} text-black py-2 px-6 rounded-lg border border-gray-400 font-semibold text-lg w-1/6 h-20` }>
                            Συμφωνητικά
                        </button>
                        <button
                            onClick={() => setSelectedPage(3)}
                            className={`cursor-pointer w-80 ${selectedPage === 3? "bg-pallete-400 border-gray-700" : "bg-gray-300 border-gray-400"} text-black py-2 px-6 rounded-lg border border-gray-400 font-semibold text-lg w-1/6 h-20`}>
                            Πληρωμές
                        </button>
                        <button
                            onClick={() => setSelectedPage(4)}
                            className={`cursor-pointer w-80 ${selectedPage === 4 ? "bg-pallete-400 border-gray-700" : "bg-gray-300 border-gray-400"} text-black py-2 px-6 rounded-lg border border-gray-400 font-semibold text-lg w-1/6 h-20`}>
                            Επικοινωνίες
                        </button>
                </div>
                
                {/* Content Displayed Based on Selected Page */}
                <div className=" w-full flex-col flex-grow flex ">
                    {selectedPage === 1 && <NannyOffersHistory/>}
                    {selectedPage === 2 && <NannyDealsHistory/>}
                    {selectedPage === 3 && <NannyPaymentsHistory/>}
                    {selectedPage === 4 && <NannyContactsHistory/>}
                </div>

                <Footer/>
            </div>
        );
    }
}

NannyHistory.propTypes = {
    initialPage: PropTypes.number
};