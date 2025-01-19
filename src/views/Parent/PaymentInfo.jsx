import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";

function PaymentInfo({firstName,lastName,paymentDate,voucher,senderId,status,role}) {
    const nav=useNavigate();
    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    };

    const [currentDate, setCurrentDate] = useState(getCurrentDate());


    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    const hasPaymentDatePassed = () => {
        return new Date(formatDate(paymentDate)) < new Date(currentDate);
    };
    return (
        <div className='w-full h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium  py-2'>
            <div className='flex gap-3 w-1/4 cursor-pointer hover:text-pallete-700  justify-center ' onClick={()=>nav(role ? `/nannyprofile/${senderId}` : `/parentprofile/${senderId}`)}>
                <p>{firstName} {lastName}</p>
                
            </div>
            <div className={`flex flex-col w-1/4  items-center ${hasPaymentDatePassed() ? 'text-red-600' : ''}`}>
                <p>{paymentDate}</p>
                {hasPaymentDatePassed() && <p>(Εκπρόθεσμη οφειλή)</p>}
            </div>
            <div className='w-1/4 flex items-center justify-center'>
                <p  className={` cursor-pointer ${status==="unavailable" && "text-gray-400"}`}
                    title={status==="unavailable" ? "Το Voucher γίνεται διαθέσιμο για πληρωμή του επαγγελματία μετά την λήξη της συνεργασίας σας." : ""}
                >
                    {voucher}
                </p>
            </div>
            
            <div className={`w-1/4  flex justify-center  items-center `}>
                <div className='w-1/4'>

                </div>
                <button className={`${status==="unavailable" || status==="pending" ? "bg-gray-400" : 'bg-green-500 hover:bg-green-400' } text-xl text-white font-semibold  flex justify-center items-center rounded-md w-1/2 h-14 p-2`}
                        disabled={status==="unavailable" || status==="pending"}
                >
                    {status==="available" && "Αποστολή Voucher" }
                    {status==="pending" && "Εκκρεμεί Επιβεβαίωση"}
                    {status==="unavailable" && "Αναμονή Λήξης Συνεργασίας"}
                    
                    
                </button>
                <div className='w-1/4 '>
                    { (status==="pending" || status==="unavailable") && <IoMdInformationCircleOutline   className='text-black hover:text-pallete-700 text-3xl ml-2 cursor-pointer' 
                                                                            title={ status==="pending" ? "Έχει σταλθεί το Voucher στον επαγγελματία. Αναμένετε την επιβεβαίωση λήψης του." : "Πρέπει να λήξει η συνεργασία σας με τον επαγγελματία πριν μπορέσετε να στείλετε το Voucher."}
                                            />
                    }

                </div>
            </div>
            

        </div>
    );
}

export default PaymentInfo;

PaymentInfo.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    paymentDate: PropTypes.string.isRequired,
    voucher: PropTypes.string.isRequired,
    role: PropTypes.bool.isRequired,
    senderId: PropTypes.string.isRequired,
};