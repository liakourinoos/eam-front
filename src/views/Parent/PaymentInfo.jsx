import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useMutation } from '@tanstack/react-query';
import { updatePayment } from '../../FetchFunctions';

function PaymentInfo({paymentId,firstName,lastName,paymentDate,status,voucher,senderId,role}) {
    const nav = useNavigate();    

    const getCurrentDate = () => {
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        return date.toISOString().split('T')[0];
    };

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        const date = new Date(Date.UTC(year, month - 1, day));
        date.setUTCHours(0, 0, 0, 0);
        return date;
    };
    // const currentDate = getCurrentDate();
    const currentDate = "2025-06-30";

    const hasPaymentDatePassed = () => {
        return formatDate(paymentDate) <= new Date(currentDate);
    };

    useEffect(() => {
        console.log("PaymentDate:", formatDate(paymentDate));
        console.log("CurrentDate:", formatDate(currentDate));
    }, []);

    const [payStatus, setPayStatus] = useState(status);

    const { mutateAsync: sendVoucher, isPending } = useMutation({
        mutationFn: () => updatePayment(paymentId),
        onSuccess: () => {
            setPayStatus("pending");
        },
    });

    useEffect(() => {
        if (status === "unavailable" && hasPaymentDatePassed()) {
            setPayStatus("available");
        }
    }, [status, paymentDate]);

    return (
        <div className='w-full h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium py-2'>
            <div className='flex gap-3 w-1/4 cursor-pointer hover:text-pallete-700 justify-center' onClick={() => nav(role ? `/nannyprofile/${senderId}` : `/parentprofile/${senderId}`)}>
                <p>{firstName} {lastName}</p>
            </div>
            <div className={`flex flex-col w-1/4 items-center ${hasPaymentDatePassed() ? 'text-red-600' : ''}`}>
                <p>{paymentDate}</p>
                {hasPaymentDatePassed() && <p>(Εκπρόθεσμη οφειλή)</p>}
            </div>
            <div className='w-1/4 flex items-center justify-center'>
                <p className={`cursor-pointer ${payStatus === "unavailable" && "text-gray-400"}`}
                    title={payStatus === "unavailable" ? "Το Voucher γίνεται διαθέσιμο για πληρωμή του επαγγελματία μετά την λήξη της συνεργασίας σας." : ""}>
                    {voucher}
                </p>
            </div>
            <div className={`w-1/4 flex justify-center items-center`}>
                <div className='w-1/4'></div>
                <button className={`${payStatus === "unavailable" || payStatus === "pending" ? "bg-gray-400" : 'bg-green-500 hover:bg-green-400'} text-xl text-white font-semibold flex justify-center items-center rounded-md w-1/2 h-14 p-2`}
                        disabled={payStatus === "unavailable" || payStatus === "pending"}
                        onClick={() => sendVoucher(paymentId)}>
                    {(!isPending && payStatus === "available") && "Αποστολή Voucher"}
                    {payStatus === "pending" && "Εκκρεμεί Επιβεβαίωση"}
                    {payStatus === "unavailable" && "Αναμονή Λήξης Συνεργασίας"}
                    {(isPending && payStatus === "available") && <span className="loading loading-md"></span>}
                </button>
                <div className='w-1/4'>
                    {(payStatus === "pending" || payStatus === "unavailable") && <IoMdInformationCircleOutline className='text-black hover:text-pallete-700 text-3xl ml-2 cursor-pointer'
                        title={payStatus === "pending" ? "Έχει σταλθεί το Voucher στον επαγγελματία. Αναμένετε την επιβεβαίωση λήψης του." : "Πρέπει να λήξει η συνεργασία σας με τον επαγγελματία πριν μπορέσετε να στείλετε το Voucher."} />}
                </div>
            </div>
        </div>
    );
}

export default PaymentInfo;

PaymentInfo.propTypes = {
    paymentId: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    paymentDate: PropTypes.string.isRequired,
    voucher: PropTypes.number.isRequired,
    role: PropTypes.bool.isRequired,
    senderId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};