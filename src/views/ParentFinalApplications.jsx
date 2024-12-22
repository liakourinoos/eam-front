import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { useState } from "react";


function ParentFinalApplications() {

    const [sortBy,setSortBy] = useState("date-desc")

    return (
        <div className="w-full h-full">
            
            {/* new application and sort by */}
            <div className="h-16 w-11/12 mx-auto flex my-2 items-center justify-between ">
                <Link  className="h-full w-2/12 text-xl   bg-pallete-400 font-medium flex items-center gap-4 justify-center rounded-md">
                    <VscNewFile className="text-3xl"/>
                    <span>Νέα Αίτηση </span> 
                </Link>

                <div>
                    <p className='text-lg font-medium '>Ταξινόμηση με βάση</p>
                    <select onChange={(e) => setSortBy(e.target.value) } 
                            value={sortBy} 
                            className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs"
                    >
                    <option disabled value={""}>Επιλέξτε</option>
                    
                    <option value={"date-desc"}>{"Ημερομηνία ^"}</option>
                    <option value={"date-asc"}>{"Ημερομηνία \\/"}</option>
                    <option value={"status"}>{"Κατάσταση"}</option>
                    </select>
                </div>

            </div>

            {/* bar  */}
            <div className="w-11/12 mt-5 mx-auto h-20 rounded-md bg-gray-300 border-2 border-gray-500 flex items-center justify-between px-10 font-medium text-xl ">
                <p>Κωδικός</p>
                <p>Ονοματεπώνυμο Επαγγελματία</p>
                <p>Κατάσταση</p>
                <p>Ημερομηνία Οριστικοποίησης</p>
                <p>Ενέργεια</p>

            </div>

        </div>
    );
}

export default ParentFinalApplications;