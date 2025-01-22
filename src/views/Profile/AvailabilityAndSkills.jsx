import { useEffect, useState } from "react";
import { useAuth } from "../../customHooks";
import {days,hours} from '../../../global_assets/global_values'
import {updateSchedule,updateSkills} from "../../FetchFunctions"
import { useMutation } from "@tanstack/react-query";



export default function AvailabilityAndSkills({setSuccessMessage}){
    const predefinedSkills = [
        "Καλή σχέση με τα κατοικίδια",
        "Δουλειές του σπιτιού",
        "Διδασκαλία",
        "Φροντίδα παιδιών",
        "Εμπειρία με μικρότερα παιδιά",
        "Βοήθεια με διάβασμα και εργασία",
        "Μαγειρική",
        "Διαχείριση χρόνου",
        "Αντοχή και ενέργεια"
    ];

    const {userData,loading} =useAuth();
    const [schedule,setSchedule] = useState([])
    const [skills,setSkills] = useState([])

    const handleCheckboxChange = (skill) => {
        setSkills((prevSelectedSkills) => {
            if (prevSelectedSkills.includes(skill)) {
                return prevSelectedSkills.filter((item) => item !== skill);
            } else {
                return [...prevSelectedSkills, skill];
            }
        });
    };

    const [showModal,setShowModal] = useState(false)

    const {mutateAsync:changeSchedule,isPending}=useMutation({
        mutationFn:()=>updateSchedule(userData?.id,schedule),
        onSuccess:()=>{
            setSuccessMessage("Η διαθεσιμότητά σας ενημερώθηκε επιτυχώς")
        }
    })

    const {mutateAsync:changeSkills,isPending:isSkillsPending}=useMutation({
        mutationFn:()=>updateSkills(userData?.id,skills),
        onSuccess:()=>{
            setSuccessMessage("Οι εξοικιώσεις σας ενημερώθηκαν επιτυχώς")
        }
    })
    

    useEffect(()=>{
        if(userData){
            setSchedule(userData?.availabilityMatrix);
            setSkills(userData?.skills || []);
            console.log(schedule)
            console.log(skills)
        }
    },[userData])

    const handleTimeClick = (day, time) => {
        // Check if this time slot already exists in the schedule
        const newSchedule = schedule.some(slot => slot.day === day && slot.time === time)
            ? schedule.filter(slot => !(slot.day === day && slot.time === time)) // Remove if exists
            : [...schedule, { day, time }]; // Add if not exists
        setSchedule(newSchedule);
    };
    

    const handleColumnClick = (day) => {
        // Get the time slots for this day
        const daySlots = hours.map(time => ({ day, time }));
    
        // Check if all time slots for this day are selected
        const isSelected = daySlots.every(slot => schedule.some(s => s.day === day && s.time === slot.time));
    
        // If all time slots for this day are selected, remove them; else, add all time slots
        const newSchedule = isSelected
            ? schedule.filter(slot => slot.day !== day) // Remove all slots for this day
            : [...schedule, ...daySlots]; // Add all slots for this day
    
        setSchedule(newSchedule);
    };
    
    
    const handleRowClick = (time) => {
        // Get the time slots for this row (for all days)
        const timeSlots = days.map(day => ({ day, time }));
    
        // Check if all day-time combinations for this time are selected
        const isSelected = timeSlots.every(slot => schedule.some(s => s.day === slot.day && s.time === slot.time));
    
        // If all day-time combinations for this time are selected, remove them; else, add all of them
        const newSchedule = isSelected
            ? schedule.filter(slot => slot.time !== time) // Remove all slots for this time
            : [...schedule, ...timeSlots]; // Add all slots for this time
    
        setSchedule(newSchedule);
    };
    


    if(loading) 
        return(
            <div className="w-full h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )

    if(!loading && userData){
        return(
            <div className="w-full  bg-white gap-5 py-10 flex flex-col items-center ">
                <p className="text-3xl mb-8 font-bold ">Διαθεσιμότητα & Εξοικιώσεις</p>

                <div className="w-2/3 flex flex-col ">
                    <p className="underline text-2xl font-medium">Αλλαγή Διαθεσιμότητας</p>
                    <div className="ml-5 w-full b mt-8 flex flex-col gap-5 font-medium text-lg">
                        {/* <table className="table-auto w-full border-collapse border-2 bg-white border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2"></th>
                                    {days.map(day => (
                                        <th key={day} className="border border-gray-300  cursor-pointer" onClick={() => handleColumnClick(day)}>
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map(time => (
                                    <tr key={time}>
                                        <td className="border border-gray-300 text-center cursor-pointer" onClick={() => handleRowClick(time)}>
                                            {time}
                                        </td>
                                        {days.map(day => (
                                            <td key={`${day}-${time}`} className="border  pt-2  border-gray-300  text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={schedule.some(slot => slot.day === day && slot.time === time)}
                                                    onChange={() => handleTimeClick(day, time)}
                                                    className={`checkbox checkbox-secondary `}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}

                        <table className="table-auto w-full border-collapse border-2 bg-white border-gray-300 text-xs">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 "></th>{/* Reduce padding */}
                                    {days.map(day => (
                                        <th key={day} className="border border-gray-300 p-1 cursor-pointer" onClick={() => handleColumnClick(day)}>
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map(time => (
                                    <tr key={time}>
                                        <td className="border border-gray-300 p-1 text-center cursor-pointer" onClick={() => handleRowClick(time)}>
                                            {time}
                                        </td>
                                        {days.map(day => (
                                            <td key={`${day}-${time}`} className="border border-gray-300 px-1 text-center"> {/* Reduce padding */}
                                                <input
                                                    type="checkbox"
                                                    checked={schedule.some(slot => slot.day === day && slot.time === time)}
                                                    onChange={() => handleTimeClick(day, time)}
                                                    className="checkbox checkbox-sm checkbox-secondary -my-1"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>     

                        <div className="w-full font-medium  mt-10 flex justify-end items-center gap-4 h-16">
                            <button className={` border-2 border-gray-500 rounded-md p-2 bg-white hover:border-red-600 hover:text-red-600 `}
                                    onClick={()=>setShowModal(true)}
                                    disabled={schedule.length===0}
                            >
                                Καθαρισμός Ωρών
                            </button>
                            <button className={` ${isPending? " text-white bg-pallete-800 border-pallete-800 border-2" : ' text-white border-pallete-800 border-2 hover:bg-pallete-700 hover:border-pallete-700 bg-pallete-800'} border-2  border-gray-500 rounded-md p-2    `}
                                    onClick={()=>changeSchedule()}
                                    disabled={isPending}
                            >
                                    {isPending? "Αποθήκευση..." : "Ενημέρωση" }
                            </button>
                        </div>

                    </div>

                </div>

                <div className="w-2/3 flex mt-5 flex-col ">
                    <p className="underline text-2xl font-medium">Εξοικιώσεις</p>
                    <div className="ml-5 w-full  mt-8 flex flex-col gap-5 font-medium text-lg">
                        <p>Διαλέξτε από την παρακάτω λίστα προσόντα που διαθέτετε για να εμφανιστούν στο προφίλ σας.</p>
                        <div className="w-full -mt-2 bg-gray-50 rounded-md shadow-md shadow-gray-500 h-48 overflow-auto">
                            {predefinedSkills.map((skill,idx)=>
                                <div key={idx} className="my-2 pl-2 flex items-center">
                                <input
                                    type="checkbox"
                                    id={`skill-${idx}`}
                                    checked={skills.includes(skill)}
                                    onChange={() => handleCheckboxChange(skill)}
                                    
                                    className={`checkbox checkbox-secondary p-1 mr-2 `}
                                />
                                <label htmlFor={`skill-${idx}`} className="text-gray-700">{skill}</label>
                            </div>
                            )}
                        </div>
                        <div className="w-full font-medium  mt-10 flex justify-end items-center gap-4 h-16">
                            <button className={` border-2 border-gray-500 rounded-md p-2  bg-white hover:text-red-600 hover:border-red-600 `}
                                    onClick={()=>setSkills([])}
                            >
                                Καθαρισμός
                            </button>
                            <button className={` ${isSkillsPending? " text-white bg-pallete-800 border-pallete-800 border-2" : ' text-white bg-pallete-800 border-pallete-800 border-2 hover:bg-pallete-700 hover:border-pallete-700 '} border-2  border-gray-500 rounded-md p-2    `}
                                    onClick={()=>changeSkills()}
                                    disabled={isSkillsPending}
                            >
                                    {isSkillsPending? "Αποθήκευση..." : "Ενημέρωση" }
                            </button>
                        </div>
                    </div>

                </div>
                {showModal && (
                    <>
                        {/* Background Overlay */}
                        <div className="fixed inset-0 bg-black bg-opacity-40 z-40" />

                        {/* Modal */}
                        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-1/3 rounded-md z-50 bg-white shadow-xl p-6">
                            <h3 className="font-bold text-lg">Προσοχή!</h3>
                            <p className="py-4">Πρόκειται να σβήσετε όλες τις ώρες που έχετε επιλέξει. Συνέχεια;</p>
                            <div className="modal-action">
                                <form method="dialog" className='flex gap-3'>
                                    {/* Close button */}
                                    <button className="bg-red-500 py-2 px-3 rounded-md font-semibold text-white" onClick={() => setShowModal(false)}>Ακύρωση</button>
                                    <button className="text-black border-2 border-black py-2 px-3 rounded-md font-semibold text" onClick={() => {setSchedule([]);setShowModal(false) } }>
                                        Επιβεβαίωση
                                    </button>
                                    

                                </form>
                            </div>
                        </div>
                    </>
                )}

            </div>

        )
    }
}

