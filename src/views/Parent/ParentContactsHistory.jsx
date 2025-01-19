import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { useState } from "react";
import { FaRegQuestionCircle } from 'react-icons/fa';
import FinalApplication from "./FinalApplication";
import { useAuth } from '../../customHooks';
import { fetchAllFinalApplications } from "../../FetchFunctions";
import { useQuery } from "@tanstack/react-query";

export default function ParentContactsHistory() { // Corrected function declaration
    const { userData } = useAuth();

    const { data: applications, isLoading } = useQuery({
        queryFn: () => fetchAllDraftApplications(userData?.id),
        queryKey: ['draftApplications', userData?.id],
        enabled: !!userData
    });

    const [sortBy, setSortBy] = useState("date-desc");

return(
        <div className="w-auto flex-grow py-2   ">
            
            <div className=" w-11/12 mx-auto flex  ">
                <div className='w-1/3'></div>
                <p className="text-center font-bold w-1/3 text-4xl my-auto">Ιστορικό Επικοινωνιών</p>
                <div className='w-1/3  items-end justify-center flex flex-col'> 
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
        </div>
    );
}
    