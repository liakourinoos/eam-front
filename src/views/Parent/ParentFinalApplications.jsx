import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { useState } from "react";
import {  FaRegQuestionCircle } from 'react-icons/fa';
import FinalApplication from "./FinalApplication";
import {useAuth} from '../../customHooks'
import { fetchAllFinalApplications } from "../../FetchFunctions";
import { useQuery } from "@tanstack/react-query";

function ParentFinalApplications() {

    const {userData} = useAuth();

    const [sortBy,setSortBy] = useState("date-desc")

    const {data:applications,isLoading} = useQuery({
        queryFn:()=>fetchAllFinalApplications(userData?.id),
        queryKey:['finalApplications',userData?.id],
        // enabled:!!userData

    })

    

    return (
        <div className="w-full py-2 ">
            
            {/*  new application and sort by  */}
            <div className="h-16 w-11/12 mx-auto flex  items-center justify-between ">
                <Link to='/applicationform' className="h-full w-2/12 text-xl border-2 border-pallete-800 text-pallete-800 hover:bg-pallete-800 hover:text-white font-medium flex items-center gap-4 justify-center rounded-md">
                    <VscNewFile className="text-3xl" />
                    <span>Νέο Συμφωνητικό </span>
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
                <p className="w-1/5  ">Κωδικός</p>
                <p className="w-1/5 ">Ονοματεπώνυμο Επαγγελματία</p>
                <p className="w-1/5 ">Κατάσταση</p>
                <div    className="w-1/5 flex items-center justify-center gap-1 "
                        title="Οι ημερομηνίες εμφανίζονται σε μορφή ΗΗ/ΜΜ/ΕΕΕΕ"
                >
                    <p >Ημερομηνία Οριστικοποίησης</p>
                    <FaRegQuestionCircle    className="text-xl"/>
                </div>
                <p className="w-1/5 ">Ενέργεια</p>

            </div>

            {/* data */}
            <div className='w-11/12 mx-auto h-full flex flex-col mb-5  gap-2 items-center justify-start overflow-y-auto mt-2'>
                {isLoading && <span className="loading loading-lg h-96"></span>

                }

                {!isLoading && Array.isArray(applications) && applications?.length===0 &&
                    <div className="w-full  h-96  flex items-center justify-center">
                        <h1 className="text-3xl font-semibold text-gray-500">Δεν βρέθηκαν οριστικοποιημένα συμφωνητικά.</h1>
                    </div>
                }

                {!isLoading && Array.isArray(applications) && 
                    applications.map((app,idx)=>(
                        <FinalApplication key={idx} code={app.id} firstName={app.nannyName} lastName={app.nannySurname} status={app.status} finalDate={app.finalizedAt}/>
                    ))
                }



            </div>



        </div>
    );
}

export default ParentFinalApplications;