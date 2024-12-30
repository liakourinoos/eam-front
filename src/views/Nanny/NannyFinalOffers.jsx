import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { useState } from "react";
import {  FaRegQuestionCircle } from 'react-icons/fa';
import FinalOffer from "./FinalOffer";
import {useAuth} from '../../customHooks'
import { fetchAllFinalOffers } from "../../FetchFunctions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function NannyFinalOffers() {

    const {userData} = useAuth();

    const [sortBy,setSortBy] = useState("date-desc")

    const {data:offers,isLoading} = useQuery({
        queryFn:()=>fetchAllFinalOffers(userData?.id),
        queryKey:['finalOffers'],
        enabled:!!userData


    })

    useEffect(() => {
        if(userData){
            console.log(userData?.id)
        }
        
    },[userData])

    return (
        <div className="w-full py-2 ">
            
            {/*  new application and sort by  */}
            <div className="h-16 w-11/12 mx-auto flex  items-center justify-between ">
                <Link to='/offerform' className="h-full w-2/12 text-xl bg-pallete-200 font-medium flex items-center gap-4 justify-center rounded-md">
                    <VscNewFile className="text-3xl" />
                    <span>Νέα Αγγελία </span>
                </Link>

                <div>
                    <p className='text-lg font-medium'>Ταξινόμηση με βάση</p>
                    <select onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy}
                        className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs"
                    >
                        <option disabled value={""}>Επιλέξτε</option>
                        <option value={"date-desc"}>Ημερομηνία &#8593;</option>
                        <option value={"date-asc"}>Ημερομηνία &#8595;</option>
                        <option value={"status"}>Κατάσταση</option>
                    </select>
                </div>
            </div>
            <div className="w-11/12 mt-5 mx-auto h-16 text-center rounded-md bg-gray-300 border-2 border-gray-500 flex items-center  font-medium text-xl ">
                <p className="w-1/3  ">Κωδικός</p>
                <div    className="w-1/3 flex items-center justify-center gap-1 "
                        title="Οι ημερομηνίες εμφανίζονται σε μορφή ΗΗ/ΜΜ/ΕΕΕΕ"
                >
                    <p >Ημερομηνία Οριστικοποίησης</p>
                    <FaRegQuestionCircle    className="text-xl"/>
                </div>
                <p className="w-1/3 ">Ενέργεια</p>

            </div>

            {/* data */}
            <div className='w-11/12 mx-auto h-full flex flex-col mb-5  gap-2 items-center justify-start overflow-y-scroll mt-2'>
                {isLoading && <span className="loading loading-lg mt-32"></span>
                }
                
                {!isLoading && Array.isArray(offers) && 
                    offers.map((app,idx)=>(
                        <FinalOffer key={idx} code={app.id} finalDate={app.finalizedAt}/>
                    ))
                }


            </div>



        </div>
    );
}

export default NannyFinalOffers;