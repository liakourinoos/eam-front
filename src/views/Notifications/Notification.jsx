import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchJobNotification, fetchContactRequestNotification, rejectContact, acceptContact, rejectApplication, acceptApplication, fetchPaymentNotification, acceptPayment,archiveApplication,fetchEndJobNotification, addReview } from '../../FetchFunctions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import { FaCheck, FaHistory } from "react-icons/fa";
import { hours, days } from '../../../global_assets/global_values';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { MdOutlineClose } from "react-icons/md";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
//prepei na pairnei tis leptomereies kathe notification
function Notification({ id, type, role }) {
    const nav=useNavigate();
    const [status, setStatus] = useState(null); // Local state for status

    const { data: job, isLoading: isJobLoading } = useQuery({
        queryFn: () => fetchJobNotification(id),
        enabled: type === "jobOffer",
        queryKey: ['jobOfferNotif', id],
    });

    const { data: request, isLoading: isRequestLoading } = useQuery({
        queryFn: () => fetchContactRequestNotification(id),
        enabled: type === "contactRequest",
        queryKey: ['contactRequestNotif', id],
    });

    const { data: payment, isLoading: isPaymentLoading } = useQuery({
        queryFn: () => fetchPaymentNotification(id),
        enabled: type === "payment",
        queryKey: ['paymentNotif', id],
    });

    const { data: endJob, isLoading: isEndJobLoading } = useQuery({
        queryFn: () => fetchEndJobNotification(id),
        enabled: type === "endOfJob",
        queryKey: ['endOfJob', id],
    });

    const [showModal, setShowModal] = useState(false);
    const [confirmOpenReviewModal,setConfirmOpenReviewModal] = useState(false)
    const [showReviewModal,setShowReviewModal] = useState(false)
    const [ratedStars, setRatedStars] = useState(0);
    const [review,setReview]= useState("");

    const {mutateAsync:sendReview,isPending}=useMutation({
        mutationFn:()=>addReview(endJob?.receiverId,endJob?.senderId,ratedStars,review),
        onSuccess:()=>{
            setReview("");
            setRatedStars(0),
            setShowReviewModal(false);
        }
    })



    useEffect(() => {
        if (request)
            setStatus(request?.status)
        if (job)
            setStatus(job?.status)
        if (payment)
            setStatus(payment?.status)
        if(endJob)
            setStatus(endJob?.status)
    }, [request, job, payment,endJob])

    


    if (isJobLoading || isRequestLoading || isPaymentLoading || isEndJobLoading)
        // skeleton for loading
        return (
            <>
                {[1, 2, 3, 4, 5].slice(0, 4).map((el) => (
                    <div key={el} className="rounded-md bg-gray-200 mx-auto my-5 w-2/3 flex items-center h-32">
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
                ))}
            </>
        );



    //notification for nannies
    if (((!isJobLoading && type === "jobOffer") || (!isRequestLoading && type === "contactRequest") || (!isPaymentLoading && type === "payment") || (!isEndJobLoading && type==="endOfJob") ) && !role) {
        return (
            <div className='rounded-md bg-white shadow-md border-black border-2 shadow-gray-400 mx-auto my-5 w-2/3 flex items-center h-32'>

                {/* left side, profile and info */}
                <div className='w-3/4 h-full rounded-l-md flex items-center'>
                    {/* img div */}
                    <div className='h-full w-1/6 flex items-center px-5 py-1'>
                        <img
                            src={type === "jobOffer" ? job?.img : type === "contactRequest" ? request?.img : type === "payment" ? payment?.img : endJob?.img}
                            className='size-24 mx-auto object-cover rounded-full'
                        />
                    </div>
                    {/* name and date */}
                    <div className='h-full w-5/6 flex flex-col justify-center'>
                        <p className='h-1/3  font-semibold pt-2 '>{type === "jobOffer" ? job?.finalizedAt : type === "contactRequest" ? request?.createdAt : type === "payment" ? payment?.createdAt : endJob?.createdAt}</p>

                        {/* periptwsi 1, jobOffer */}
                        {type === "jobOffer" &&
                            <p className='h-2/3 flex items-start pt-2  text-xl font-medium'>
                                {job?.gender ? "Ο" : "Η"} <Link to={`/parentprofile/${job?.senderId}`} className='underline hover:text-pallete-800 mx-1'>{job?.senderName} {job?.senderSurname}</Link> σας έστειλε <button onClick={() => setShowModal(sm => !sm)} className="underline hover:text-pallete-800 ml-1">συμφωνητικό απασχόλησης</button>.
                            </p>
                        }
                        {/* periptwsi 2, epikoinwnia */}
                        {type === "contactRequest" &&
                            <p className='h-2/3 flex items-start pt-2  text-xl font-medium'>
                                {request?.gender ? "Ο" : "Η"} <Link to={`/parentprofile/${request?.senderId}`} className='underline hover:text-pallete-800 mx-1'>{request?.senderName} {request?.senderSurname}</Link> σας έστειλε αίτημα επικοινωνίας.
                            </p>

                        }
                        {/* periptwsi 3, plirwmi */}
                        {type === "payment" &&
                            <p className='h-2/3 flex items-start pt-2  text-xl font-medium'>
                                {payment?.gender ? "Ο" : "Η"} <Link to={`/parentprofile/${payment?.senderId}`} className='underline hover:text-pallete-800 mx-1'>{payment?.senderName} {payment?.senderSurname}</Link> σας έστειλε Voucher πληρωμής.
                            </p>
                        }

                        {/* periptwsi 4, anakoinwsi liksis */}
                        {type === "endOfJob" &&
                            <p className='h-2/3 flex items-start pt-2  text-xl font-medium'>
                                Η συνεργασία σας με {endJob?.gender ? "τον" : "την"} <Link to={`/parentprofile/${endJob?.senderId}`} className='underline hover:text-pallete-800 mx-1'>{endJob?.senderName} {endJob?.senderSurname}</Link> έληξε.
                            </p>
                        }

                    </div>
                </div>

                {/* right side, action buttons */}
                <div className='w-1/4 h-full rounded-r-md font-medium flex items-center justify-center gap-4 pr-4 '>
                    {/* periptwsi 1 */}
                    {type === "contactRequest" &&
                        <>
                            {status !== "accepted" &&
                                <button className={`
                                            h-1/2 w-1/2 text-xl rounded-md text-white
                                            ${status === "pending" && "bg-red-600 hover:bg-red-500"}   
                                            ${status === "rejected" && "bg-white"}
                                            ${status === "accepted" && "bg-red-200"}
                                        `}
                                    onClick={() => { setStatus("rejected"); rejectContact(id); }}
                                    disabled={status !== "pending"}
                                >
                                    {status === "pending" && 'Απόρριψη'}
                                    {status === "rejected" && <span className='mx-auto flex items-center justify-center gap-1 text-red-600'>
                                            <MdOutlineClose className='text-3xl '/>
                                            Απερρίφθη

                                        </span>
                                    }
                                </button>
                            }
                            {status !== "rejected" &&
                                <button className={`
                                                h-1/2 w-1/2 text-xl bg-green-600 rounded-md text-white 
                                                ${status === "pending" && "bg-green-600 hover:bg-green-500"}   
                                                ${status === "rejected" && "bg-green-200"}
                                                ${status === "accepted" && "bg-white"}
                                            `}
                                    onClick={() => { setStatus("accepted"); acceptContact(id); }}
                                    disabled={status !== "pending"}

                                >
                                    {status === "pending" && 'Αποδοχή'}
                                    {status === "accepted" && 
                                        <span className='mx-auto flex items-center justify-center gap-1 text-green-600'>
                                            <FaCheck/>
                                            Εγκρίθηκε

                                        </span>}
                                </button>
                            }
                        </>
                    }
                    {/* periptwsi 2 */}
                    {type === "jobOffer" &&
                        <>
                            {status !== "accepted" &&
                                <button className={`
                                        h-1/2 w-1/2 text-xl rounded-md text-white
                                        ${status === "pending" && "bg-red-600 hover:bg-red-500"}   
                                        ${status === "rejected" && "bg-white"}
                                        ${status === "accepted" && "bg-red-200"}
                                    `}
                                    onClick={() => { setStatus("rejected"); rejectApplication(id); }}
                                    disabled={status !== "pending"}
                                >
                                    {status === "pending" && 'Απόρριψη'}
                                    {status === "rejected" && <span className='mx-auto flex items-center justify-center gap-1 text-red-600'>
                                            <MdOutlineClose className='text-3xl '/>
                                            Απερρίφθη

                                        </span>}
                                </button>
                            }
                            {status !== "rejected" &&
                                <button className={`
                                            h-1/2 w-1/2 text-xl bg-green-600 rounded-md text-white  
                                            ${status === "pending" && "bg-green-600 hover:bg-green-500"}   
                                            ${status === "rejected" && "bg-green-200"}
                                            ${status === "accepted" && "bg-white"}
                                        `}
                                    onClick={() => { setStatus("accepted"); acceptApplication(id); }}
                                    disabled={status !== "pending"}

                                >
                                    {status === "pending" && 'Αποδοχή'}
                                    {status === "accepted" && <span className='mx-auto flex items-center justify-center gap-1 text-green-600'>
                                            <FaCheck/>
                                            Εγκρίθηκε

                                        </span>}
                                </button>
                            }
                        </>
                    }
                    {/* periptwsi payment */}
                    {type === "payment" &&
                        <>
                            {
                                <button className={`
                                                h-1/2 w-1/2 text-xl bg-green-600 rounded-md text-white 
                                                ${status === "pending" && "bg-green-600 hover:bg-green-500"}   
                                                ${status === "rejected" && "bg-green-200"}
                                                ${status === "accepted" && "bg-white"}
                                            `}
                                    onClick={() => { setStatus("accepted"); acceptPayment(id); }}
                                    disabled={status !== "pending"}

                                >
                                    {status === "pending" && 'Λήψη Voucher'}
                                    {status === "accepted" && <span className='mx-auto flex items-center justify-center gap-1 text-green-600'>
                                            <FaCheck/>
                                            Λήφθηκε

                                        </span>}
                                </button>
                            }
                        </>

                    }


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
                                    <button className='h-12 w-12 text-red-600  rounded-md flex items-center text-5xl font-medium justify-center bg-white'
                                        onClick={() => setShowModal(false)}
                                    >
                                        <MdClose className='hover:text-red-500' />
                                    </button>
                                </div>
                            </div>

                            {/* main modal body */}
                            <div className='w-full flex-grow rounded-md  bg-gray-100 px-2 '>
                                <p className='pt-2 text-xl'>Ο χρήστης <span className='font-medium'>{job?.senderName} {job?.senderSurname}</span> θέλει να σας απασχολήσει για χρονικό διάστημα <span className='mx-1 font-medium'>{job?.months} {job?.months > 1 ? 'μηνών' : 'μήνα'}</span> ξεκινώντας από τις
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


    // notification for parents
    if (((!isJobLoading && type === "jobOffer") || (!isRequestLoading && type === "contactRequest") || (!isPaymentLoading && type === "payment") || (!isEndJobLoading &&  type === "endOfJob")) && role) {
        return (
            <div className='rounded-md bg-white shadow-md border-black border-2 shadow-gray-400 mx-auto my-5 w-2/3 flex items-center h-32'>

                {/* left side, profile and info */}
                <div className='w-3/4 h-full rounded-l-md flex items-center'>
                    {/* /* img div */}
                    <div className='h-full w-1/6 flex items-center px-5  py-1'>
                        <img src={type === "jobOffer" ? job?.img : type === "contactRequest" ? request?.img : type === "payment" ? payment?.img : endJob?.img}
                            className='size-24 mx-auto object-cover rounded-full'
                        />
                    </div>
                    {/* name and date */}
                    <div className='h-full w-5/6 flex flex-col justify-center'>
                        <p className='h-1/3  font-semibold pt-2 '>{type === "jobOffer" ? job?.finalizedAt : type === "contactRequest" ? request?.createdAt : type === "payment" ? payment?.createdAt : endJob?.createdAt}</p>

                        {/* periptwsi 1, jobOffer */}
                        {type === "jobOffer" &&
                            <p className='h-2/3 flex items-start pt-2  text-xl font-medium'>
                                {job?.gender ? "Ο" : "Η"} <Link to={`/nannyprofile/${job?.senderId}`} className='underline hover:text-pallete-800 mx-1'>{job?.senderName} {job?.senderSurname}</Link> {status === "accepted" ? 'ΑΠΟΔΈΧΤΗΚΕ' : 'ΑΠΈΡΡΙΨΕ'} το <Link to={`/viewapplication/${job?.applicationId}`} className="underline hover:text-pallete-700 mx-1">συμφωνητικό απασχόλησης </Link> σας.
                            </p>
                        }
                        {/* periptwsi 2, contact */}
                        {type === "contactRequest" &&
                            <p className='h-2/3 flex items-start pt-2  text-xl font-medium'>
                                {request?.gender ? "Ο" : "Η"} <Link to={`/nannyprofile/${request?.senderId}`} className='underline hover:text-pallete-800 mx-1'>{request?.senderName} {request?.senderSurname}</Link> {status === "accepted" ? 'ΑΠΟΔΈΧΤΗΚΕ' : 'ΑΠΈΡΡΙΨΕ'} το αίτημα επικοινωνίας σας.
                            </p>

                        }
                        {/* periptwsi 3, payment */}
                        {type === "payment" &&
                            <p className='h-2/3 flex items-start pt-2  text-xl font-medium'>
                                {payment?.gender ? "Ο" : "Η"} <Link to={`/nannyprofile/${payment?.senderId}`} className='underline hover:text-pallete-800 mx-1'>{payment?.senderName} {payment?.senderSurname}</Link> {status === "accepted" ? 'ΑΠΟΔΈΧΤΗΚΕ' : ''} Voucher πληρωμής.
                            </p>

                        }
                        {/* periptwsi 4, endJob Of Job */}
                        {type === "endOfJob" &&
                            <p className='h-2/3 flex items-start pt-2  text-xl font-medium'>
                                Η συνεργασία σας με {endJob?.gender ? "τον" : "την"} <Link to={`/nannyprofile/${endJob?.senderId}`} className='underline hover:text-pallete-800 mx-1'>{endJob?.senderName} {endJob?.senderSurname}</Link> έληξε.
                            </p>
                        }


                    </div>
                </div>

                {/* right side, action buttons */}
                <div className='w-1/4 h-full rounded-r-md font-medium flex items-center justify-center gap-4 pr-4 '>
                    {/* periptwsi rehire */}
                    {type === "endOfJob" &&
                        <>
                            {status !== "renewed" &&
                                <button className={`
                                        h-1/2 w-1/2 text-lg rounded-md font-semibold text-pallete-800 border-2 ${status==="pending" ? "border-pallete-800" : "border-white" }
                                        ${status === "pending" && "bg-white hover:bg-pallete-700 hover:text-white"}   
                                        
                                    `}                                                                                                              
                                    onClick={() => { setStatus("ended"); archiveApplication(endJob?.applicationId,"ended",endJob?.id);setConfirmOpenReviewModal(true);  }}
                                    disabled={status !== "pending"}
                                >
                                    {status === "pending" && 'Επιβεβαίωση Λήξης'}
                                    {status === "ended" && <span className='mx-auto flex items-center justify-center gap-1 text-pallete-800'>
                                            <FaCheck className='text-xl '/>
                                            Λήξαν

                                        </span>}
                                </button>
                            }
                            {status !== "ended" &&
                                <button className={`
                                            h-1/2 w-1/2 text-lg rounded-md font-semibold text-pallete-800 border-2 ${status==="pending" ? "border-pallete-800" : "border-white" }
                                            ${status === "pending" && "bg-white hover:bg-pallete-700 hover:text-white"}   
                                            
                                        `}
                                        //must open a modal or redirect to applications page with some arguments for new application
                                    onClick={() => { setStatus("renewed"); archiveApplication(endJob?.applicationId,"renewed",endJob?.id); setConfirmOpenReviewModal(true);  }}
                                    disabled={status !== "pending"}

                                >
                                    {status === "pending" && 'Ανανέωση Συμφωνητικού'}
                                    {status === "renewed" && <span className='mx-auto flex items-center justify-center gap-1 text-pallete-800'>
                                            <FaHistory className='text-xl '/>
                                            Ανανεώθηκε

                                        </span>}
                                </button>
                            }
                        </>

                    }

                </div>

                {/* review confirmation modal */}
                { confirmOpenReviewModal && 
                    <div className="fixed inset-0 z-50 flex  justify-center bg-black bg-opacity-40 ">
                        <div className="w-2/6 flex-col flex items-center py-8 justify-between h-1/6 rounded-md z-50 mt-20 bg-white shadow-xl px-1">
                            <p className='text-2xl w-full text-center  font-medium'>Θέλετε να αφήσετε μια κριτική για τον επαγγελματία;</p>
                            <div className='flex gap-5 justify-center  w-full  h-full mt-3'>
                                <button className={`border-2 border-red-600 font-semibold hover:bg-red-600 hover:text-white w-32 text-red-600 px-2 py-3 rounded-md `}
                                        onClick={()=>setConfirmOpenReviewModal(false)}
                                >
                                    
                                    Όχι
                                </button>
                                <button className={`border-2 border-green-600 font-semibold hover:bg-green-600 hover:text-white w-32 text-green-600 px-2 py-3 rounded-md `}
                                        onClick={()=>{setConfirmOpenReviewModal(false); setShowReviewModal(true)}}

                                >
                                    Ναι
                                </button>
                            </div>    
                        </div>
                    </div>



                }


                {/* showMessage First */}
                {showReviewModal &&
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ">
                        <div className="w-4/6 flex-col flex items-center h-4/6 overflow-y-auto rounded-md z-50 my-auto bg-white shadow-xl p-6">
                            <div className="flex items-center justify-end w-full">
                                <button onClick={() => setShowReviewModal(false)}>
                                    <MdOutlineClose className="font-bold text-7xl text-red-700 hover:text-red-500" />
                                </button>
                            </div>
                            <p className="text-center h-auto text-4xl">
                                Αξιολογήστε {endJob?.gender ? `τον` : `την `} <span className='font-medium'>{endJob?.senderName}</span>
                            </p>
                            <div className="flex items-center justify-center  mt-4">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value} onClick={() => { setRatedStars(ratedStars === value ? 0 : value) }}>
                                        {ratedStars >= value ? (<FaStar className="text-amber-500 text-6xl" />) : (<FaRegStar className="text-black text-6xl" />)}
                                    </button>
                                ))}
                            </div>
                            <div className='h-64 w-2/4 mt-10 flex flex-col items-end  justify-between'>
                                <textarea className="w-full  h-48 max-h-48 resize-none rounded-md shadow-md border-2 border-gray-400 bg-white shadow-gray-600 p-2"
                                    value={review}
                                    placeholder='Δώστε μια σύντομη περιγραφή (προαιρετικό)'
                                    onChange={(e) => setReview(e.target.value)}
                                />
                                <button
                                    className={`flex items-center mt-5 w-1/4 justify-center h-14    py-1 px-3 rounded-md font-semibold 
                                                ${ratedStars === 0 ? "bg-gray-400 border-2 border-gray-400 text-white cursor-default" : "border-2 border-pallete-800 text-pallete-800 hover:bg-pallete-700 hover:text-white"}
                                    `}
                                    title={ratedStars === 0 ? "Παρακαλούμε διαλέξτε πλήθος αστεριών." : ""}
                                    onClick={() => sendReview()}
                                    disabled={ratedStars === 0}
                                >
                                    {isPending ? <span className='loading loading-md'></span> : "Υποβολή Αξιολόγησης"}
                                </button>
                            </div>
                        </div>
                    </div>
                }



            </div>
        )
    }

}

export default Notification;

Notification.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    role: PropTypes.bool.isRequired,
};