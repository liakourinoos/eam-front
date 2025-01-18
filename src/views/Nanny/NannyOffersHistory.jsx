
import { useAuth } from '../../customHooks.jsx';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaRegQuestionCircle } from 'react-icons/fa';
import ArchivedOffer from "./ArchivedOffer.jsx";
import { fetchAllArchivedOffers } from '../../FetchFunctions.jsx';


export default function NannyOffersHistory() { // Corrected function declaration
    const { userData } = useAuth();
    const { data: offers, isLoading } = useQuery({
        queryFn: () => fetchAllArchivedOffers(userData?.id),
        queryKey: ['draftApplications', userData?.id],
        enabled: !!userData
    });



    const [sortBy, setSortBy] = useState("date-desc");
    return(
        <div className="w-auto flex-grow py-2  bg-gray-200   ">
            
            
            <div className=" w-11/12 mx-auto flex  ">
                <div className='w-1/3'></div>
                <p className="text-center font-bold w-1/3 text-4xl my-auto">Ιστορικό Αγγελιών</p>
                <div className='w-1/3 items-end  justify-center flex flex-col'> 
                    <p className=' text-lg font-medium'>Ταξινόμηση με βάση</p>
                    <select onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy}
                        className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs"
                    >
                        <option value={"date-desc"}>Ημερομηνία &#8593;</option>
                        <option value={"date-asc"}>Ημερομηνία &#8595;</option>
                    </select>
                </div>

            </div>
            
            {/* bar */}
            <div className="w-11/12 mt-5 mx-auto h-16 text-center rounded-md bg-gray-300 border-2 border-gray-500 flex items-center  font-medium text-xl ">
                <p className="w-1/3  ">Κωδικός</p>
                <div    className="w-1/3 flex items-center justify-center gap-1 "
                        title="Οι ημερομηνίες εμφανίζονται σε μορφή ΗΗ/ΜΜ/ΕΕΕΕ"
                >
                    <p >Ημερομηνία Λήψης Αιτήματος</p>
                    <FaRegQuestionCircle    className="text-xl"/>
                </div>
                <p className="w-1/3 ">Ενέργεια</p>

            </div>

            <div className='w-11/12 mx-auto h-full flex flex-col mb-5  gap-2 items-center justify-start  mt-2'>
                {isLoading && <span className="loading loading-lg mt-32"></span>
                }
                
                {!isLoading && Array.isArray(offers) && 
                    offers?.map((app,idx)=>(
                        <ArchivedOffer key={idx} code={app.id} finalDate={app.finalizedAt}/>
                    ))
                }




            </div>
            


        </div>
    );
}
    