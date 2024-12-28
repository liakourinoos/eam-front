import { useEffect, useState } from "react";
import { useAuth } from "../../customHooks";
import {days,hours} from '../../../global_assets/global_values'
import {updateSchedule,updateSkills} from "../../FetchFunctions"
import { useMutation } from "@tanstack/react-query";

export default function AvailabilityAndSkills(){
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

    const {mutateAsync:changeSchedule,isPending}=useMutation({
        mutationFn:()=>updateSchedule(userData?.id,schedule),
    })

    const {mutateAsync:changeSkills,isPending:isSkillsPending}=useMutation({
        mutationFn:()=>updateSkills(userData?.id,skills),
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
                        <table className="table-auto w-full border-collapse border-2 bg-white border-gray-300">
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
                        </table>

                        <div className="w-full font-medium  mt-10 flex justify-end items-center gap-4 h-16">
                            <button className={` border-2 border-gray-500 rounded-md p-2  "bg-gray-400" 'bg-white' `}
                                    onClick={()=>setSchedule([])}
                            >
                                Καθαρισμός
                            </button>
                            <button className={`${isPending? "bg-gray-400"  : 'bg-pallete-400'} border-2  border-gray-500 rounded-md p-2    `}
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
                            <button className={` border-2 border-gray-500 rounded-md p-2  "bg-gray-400" 'bg-white' `}
                                    onClick={()=>setSkills([])}
                            >
                                Καθαρισμός
                            </button>
                            <button className={`${isSkillsPending? "bg-gray-400"  : 'bg-pallete-400'} border-2  border-gray-500 rounded-md p-2    `}
                                    onClick={()=>changeSkills()}
                                    disabled={isSkillsPending}
                            >
                                    {isSkillsPending? "Αποθήκευση..." : "Ενημέρωση" }
                            </button>
                        </div>
                    </div>

                </div>


            </div>

        )
    }
}

