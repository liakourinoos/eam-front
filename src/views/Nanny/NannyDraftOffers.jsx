import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { useState } from "react";
import { FaRegQuestionCircle } from 'react-icons/fa';
import DraftOffer from "./DraftOffer";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../customHooks";
import { fetchAllDraftOffers } from "../../FetchFunctions";


function NannyDraftOffers() {
    const { userData } = useAuth();

    const { data: offers, isLoading } = useQuery({
        queryFn: () => fetchAllDraftOffers(userData?.id),
        queryKey: ['draftoffers', userData?.id],
        enabled: !!userData
    })


    const [sortBy, setSortBy] = useState("date-desc")
    return (
        <div className="w-full py-2 ">

            <div className="h-16 w-11/12 mx-auto flex  items-center justify-between ">
                <Link to='/offerform' className="h-full w-2/12 text-xl border-2 border-pallete-800 text-pallete-800 hover:bg-pallete-800 hover:text-white font-medium flex items-center gap-4 justify-center rounded-md">
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

            {/* bar */}
            <div className="w-11/12 mt-5 mx-auto h-16 text-center rounded-md bg-gray-300 border-2 border-gray-500 flex items-center  font-medium text-xl ">
                <p className="w-1/2  ">Κωδικός</p>
                <p className="w-1/2 ">Ενέργειες</p>
            </div>

            {/* data */}

            <div className='w-11/12 flex h-full mx-auto  flex-col mb-5 gap-2 items-center justify-start mt-2'>
                {isLoading &&
                    <div className="w-full h-96 flex-grow flex items-center justify-center">
                        <span className="loading loading-lg"></span>
                    </div>
                }

                {!isLoading && offers?.length === 0 &&
                    <div className="w-full flex-grow h-96  flex items-center justify-center">
                        <span className="text-3xl font-semibold text-gray-500">Δεν βρέθηκαν μη οριστικοποιημένες αγγελίες.</span>
                    </div>
                }

                {!isLoading && Array.isArray(offers) &&
                    offers.map((app, idx) => (
                        <DraftOffer key={idx} code={app.id} />
                    ))
                }
            </div>


        </div>
    );
}

export default NannyDraftOffers;