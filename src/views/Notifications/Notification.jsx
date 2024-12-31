import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchJobNotification,fetchContactRequestNotification } from '../../FetchFunctions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import {hours, days} from '../../../global_assets/global_values';

//prepei na pairnei tis leptomereies kathe notification
function Notification({ id, type }){

    useEffect(()=>{
        console.log(id,type)    
    
},[])
    const { data: job, isLoading: isJobLoading } = useQuery({
        queryFn: () => fetchJobNotification(id),
        enabled: type==="jobOffer",
        queryKey: ['jobOfferNotif',id],
        
        
    });

    const { data:request, isLoading: isRequestLoading } = useQuery({
        queryFn: () => fetchContactRequestNotification(id),
        enabled: type==="contactRequest",
        queryKey: ['contactRequestNotif',id],

    });

    const [showModal,setShowModal] = useState(false);


    if(isJobLoading || isRequestLoading)
        // skeleton for loading
        return (
            <div className="rounded-md bg-gray-200 mx-auto mb-5 w-2/3 flex items-center h-32">
            {/* Left side, profile and info */}
            <div className="w-3/4 h-full rounded-l-md flex items-center space-x-3 px-4">
                {/* Skeleton for image */}
                <div className="h-28 w-32 bg-gray-500 rounded-full animate-pulse" />
                
                {/* Skeleton for name and date */}
                <div className="h-full w-full flex flex-col justify-center space-y-2">
                    <div className="h-4 bg-gray-500 rounded-md animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-500 rounded-md animate-pulse w-5/6" />
                </div>
            </div>
            
            {/* Right side (action buttons area) */}
            <div className="w-1/4 h-full rounded-r-md font-medium pr-5 flex items-center justify-center">
                <div className="h-8 w-full bg-gray-500 rounded-md animate-pulse" />
            </div>
        </div>
        );
    


    if (((!isJobLoading && type==="jobOffer") || (!isRequestLoading && type==="contactRequest")) ) {
        return(
            <div className='rounded-md bg-gray-200 mx-auto mb-5 w-2/3 flex items-center h-32'>
                
                {/* left side, profile and info */}
                <div className='w-3/4 h-full rounded-l-md flex items-center'>
                    {/* img div */}
                    <div className='h-full w-1/6 flex items-center px-5  py-1'>
                        <img    src={type==="jobOffer" ? job?.img : request?.img}
                                className='h-full mx-auto object-cover  rounded-full'                            
                        />
                    </div>
                    {/* name and date */}
                    <div className='h-full w-5/6 flex flex-col justify-center'>  
                        <p className='h-1/3  font-semibold pt-2 '>{type==="jobOffer" ? job?.finalizedAt : request.createdAt}</p>

                        {/* periptwsi 1 */}
                        {type==="jobOffer" && 
                            <p className='h-2/3 flex items-start pt-2  text-xl font-medium'>
                                {job?.gender ? "Ο" : "Η"} <Link to={`/parentprofile/${job?.senderId}`} className='underline mx-1'>{job?.senderName} {job?.senderSurname}</Link> σας έστειλε <button onClick={()=>setShowModal(sm=>!sm)} className="underline ml-1">αίτηση απασχόλησης</button>.
                            </p>
                        }
                        {/* periptwsi 2 */}
                        {type==="contactRequest" &&
                            <p className='h-2/3 flex items-start pt-2  text-xl font-medium'>
                                {request?.gender ? "Ο" : "Η"} <Link to={`/parentprofile/${request?.senderId}`} className='underline mx-1'>{request?.senderName} {request?.senderSurname}</Link> σας έστειλε αίτημα επικοινωνίας.
                            </p>
                        
                        }


                    </div>
                </div>
            
                {/* right side, action buttons */}
                <div className='w-1/4 h-full rounded-r-md font-medium flex items-center justify-center gap-4 pr-4 '>
                    
                        <button className='h-1/2 w-full text-xl  bg-red-400 rounded-md'>Απόρριψη</button>
                        <button className='h-1/2 w-full text-xl bg-green-400 rounded-md'>Αποδοχή</button>
                </div>


                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
                        <div className="bg-white w-3/4 h-3/4 flex flex-col  rounded-lg shadow-lg px-3 pt-2 pb-1 overflow-y-auto relative">
                            
                            {/* top part for modal title and close button */}
                            <div className='w-full h-1/6 flex items-center '>
                                <p className='w-1/6 h-full'></p>
                                <p className='w-4/6 h-full font-medium text-3xl flex items-center justify-center bg-white'> Επιθεώρηση Συμφωνητικού Απασχόλησης</p>
                                <div className='w-1/6 h-full flex items-center justify-end '>
                                    <button className='h-12 w-12 text-red-500 border-2 border-gray-400 rounded-md flex items-center text-5xl font-medium justify-center bg-white'
                                            onClick={()=>setShowModal(sm=>!sm)}
                                    >
                                        <MdClose/>
                                    </button>
                                </div>
                            </div>

                            {/* main modal body */}
                            <div className='w-full flex-grow rounded-md  bg-gray-100 px-2 '>
                                <p className='pt-2 text-xl'>Ο χρήστης <span className='font-medium'>{job?.senderName} {job?.senderSurname}</span> θέλει να σας απασχολήσει για χρονικό διάστημα <span className='mx-1 font-medium'>{job?.months} {job?.months >1  ? 'μηνών' : 'μήνα'}</span> ξεκινώντας από τις 
                                    <span className='mx-2 font-bold'>{job?.startingDate}</span>για τις παρακάτω αναγραφόμενες ώρες:

                                </p>

                                {/* table here!*/}
                                <table className="table-auto w-full my-1 rounded-md text-xs bg-slate-200 border-collapse shadow-sm shadow-gray-700">
                                    <thead>
                                        <tr className="bg-gray-300 rounded-md">
                                            <th className="px-2 py-1 text-center"></th>
                                            {/* Render the headers for the days */}
                                            {days.map((day, idx) => (
                                                <th key={idx} className="px-2 cursor-default rounded-md text-center">
                                                    {day}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Iterate over hours to create rows */}
                                        {hours.map((time, hourIdx) => (
                                            <tr key={hourIdx} className="text-center border-y-2 border-slate-400 hover:bg-gray-100">
                                                {/* First column for the time slot */}
                                                <td className="text-center cursor-default font-normal">{time}</td>
                                                    {/* Iterate over days for each hour */}
                                                    {days.map((day, dayIdx) => (
                                                        <td key={dayIdx} className="border-2 border-slate-400 border-x">
                                                            {/* Check if the current day and hour exists in the availabilityMatrix */}
                                                            {job?.schedule.some((entry) => entry.day === day && entry.time === time) ? (<FaCheck className="text-green-800 font-medium mx-auto" />) : ("")}
                                                        </td>
                                                    ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>



                                <p className='pl-2 pt-2 text-xl'>στην οικία με διεύθυνση <span className='font-bold'>{job?.address}</span>.</p>

                            </div> 

                            
                        </div>


                    </div>
                )}
                
            </div>
        );
    }
}

export default Notification;

Notification.propTypes = {
    id:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired
};