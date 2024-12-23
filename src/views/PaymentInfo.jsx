import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';


function PaymentInfo({firstName,lastName,paymentDate,voucher}) {

    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    };

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(getCurrentDate());
        console.log(currentDate)
    }, [currentDate]);

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    const hasPaymentDatePassed = () => {
        return new Date(formatDate(paymentDate)) < new Date(currentDate);
    };
    return (
        <div className='w-full h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium  py-2'>
            <div className='flex gap-3 w-1/4 justify-center '>
                <p>{firstName}</p>
                <p>{lastName}</p>
            </div>
            <div className={`flex flex-col w-1/4  items-center ${hasPaymentDatePassed() ? 'text-red-600' : ''}`}>
                <p>{paymentDate}</p>
                {hasPaymentDatePassed() && <p>(Εκπρόθεσμη οφειλή)</p>}
            </div>
            <p className='w-1/4  '>{voucher}</p>
            <div className='w-1/4  flex justify-center '>
                <button className='bg-green-400 text-xl text-white  rounded-md w-36 h-full px-2 py-1'>
                Αποστολή Voucher
                </button>
            </div>
            

        </div>
    );
}

export default PaymentInfo;

PaymentInfo.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    paymentDate: PropTypes.string.isRequired,
    voucher: PropTypes.string.isRequired
};