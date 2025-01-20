import { useAuth } from '../../customHooks';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaRegQuestionCircle } from 'react-icons/fa';
import { fetchParentContacts } from '../../FetchFunctions';
import Contact from './Contact';

export default function NannyContactsHistory() { // Corrected function declaration

    const { userData } = useAuth();
    const { data: contacts, isLoading } = useQuery({
        queryFn: () => fetchParentContacts(userData?.id),
        queryKey: ['nannyContacts', userData?.id],
        enabled: !!userData
    });

    const [sortBy, setSortBy] = useState("date-desc");

    return (
        <div className="w-auto flex-grow py-2 flex flex-col h-full">

            <div className="w-11/12 mx-auto flex">
                <div className='w-1/3'></div>
                <p className="text-center font-bold w-1/3 text-4xl my-auto">Ιστορικό Επικοινωνιών</p>
                <div className='w-1/3 items-end justify-center flex flex-col'>
                    <p className='text-lg font-medium'>Ταξινόμηση με βάση</p>
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
            <div className="w-11/12 mt-5 mx-auto h-16 text-center rounded-md bg-gray-300 border-2 border-gray-500 flex items-center font-medium text-xl">
                <p className="w-1/3 text-center">Ονοματεπώνυμο Γονέα</p>
                <div className="w-1/3 flex items-center justify-center gap-1"
                    title="Οι ημερομηνίες εμφανίζονται σε μορφή ΗΗ/ΜΜ/ΕΕΕΕ"
                >
                    <p>Ημερομηνία Λήψης Αιτήματος</p>
                    <FaRegQuestionCircle className="text-xl" />
                </div>
                <p className="w-1/3 text-center">Στοιχεία Επικοινωνίας</p>
            </div>

            <div className='w-11/12 mx-auto flex flex-col mb-5 gap-2 items-center justify-start overflow-y-auto mt-2 flex-grow'>
                {isLoading && <div className="flex-grow flex items-center justify-center">
                    <span className="loading loading-lg"></span>
                </div>}
                {!isLoading && contacts?.length === 0 &&
                    <div className="flex-grow flex flex-col items-center justify-center">
                        <p className="text-center text-gray-500 text-2xl font-semibold">Δεν βρέθηκαν παλαιότερες επικοινωνίες.</p>
                    </div>
                }
                {!isLoading && contacts?.length > 0 && Array.isArray(contacts) &&
                    contacts.map((contact, idx) => (
                        <Contact key={idx} id={contact?.senderId} parentName={contact?.parentName}
                            parentSurname={contact?.parentSurname}
                            date={contact?.createdAt}
                            contactInfo={contact?.contactInfo}
                            contactType={contact?.contactType}
                        />
                    ))
                }
            </div>
        </div>
    );
}