import { RenderHeaderNavbar } from '../../global_assets/global_functions.jsx';
import { useAuth } from '../customHooks.jsx';
import Footer from '../generic components/Footer.jsx';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ParentApplicationsHistory from '../views/Parent/ParentApplicationsHistory.jsx';
import ParentPaymentsHistory from '../views/Parent/ParentPaymentsHistory.jsx';
import ParentContactsHistory from '../views/Parent/ParentContactsHistory.jsx';
import ParentReviewsHistory from '../views/Parent/ParentReviewsHistory.jsx';

export default function ParentHistory({ initialPage = 1 }) {
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
            <div className="w-full  h-screen flex flex-col items-center bg-white">
                {RenderHeaderNavbar(userData, 5)}
                {/* Buttons */}                                                                                        
                <div className="mt-5 mb-7 space-x-4">
                        <button
                            onClick={() => setSelectedPage(1)}className={`cursor-pointer w-80 ${selectedPage === 1 ? "bg-pallete-400 border-gray-700" : "bg-gray-300 border-gray-400"}  text-black py-2 px-6 rounded-lg border border-gray-400 font-bold text-lg h-20`}>
                            Αιτήσεις
                        </button>
                        <button
                            onClick={() => setSelectedPage(2)}className={`cursor-pointer w-80 ${selectedPage === 2 ? "bg-pallete-400 border-gray-700" : "bg-gray-300 border-gray-400"} text-black py-2 px-6 rounded-lg border border-gray-400 font-bold text-lg  h-20` }>
                            Πληρωμές
                        </button>
                        <button
                            onClick={() => setSelectedPage(3)}className={`cursor-pointer w-80 ${selectedPage === 3? "bg-pallete-400 border-gray-700" : "bg-gray-300 border-gray-400"} text-black py-2 px-6 rounded-lg border border-gray-400 font-bold text-lg  h-20`}>
                            Αξιολογήσεις
                        </button>
                        <button
                            onClick={() => setSelectedPage(4)}className={`cursor-pointer w-80 ${selectedPage === 4 ? "bg-pallete-400 border-gray-700" : "bg-gray-300 border-gray-400"} text-black py-2 px-6 rounded-lg border border-gray-400 font-bold text-lg  h-20`}>
                            Επικοινωνία
                        </button>
                </div>
                
                {/* Content Displayed Based on Selected Page */}
                <div className=" w-full flex-col flex-grow  flex  ">
                    {selectedPage === 1 && <ParentApplicationsHistory/>}
                    {selectedPage === 2 && <ParentPaymentsHistory/>}
                    {selectedPage === 3 && <ParentReviewsHistory/>}
                    {selectedPage === 4 && <ParentContactsHistory/>}
                </div>

                <Footer/>
            </div>
        );
    }
}

ParentHistory.propTypes = {
    initialPage: PropTypes.number
};