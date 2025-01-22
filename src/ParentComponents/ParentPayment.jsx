import { RenderHeaderNavbar } from '../../global_assets/global_functions.jsx'
import { useEffect, useState } from 'react';
import { useAuth } from '../customHooks.jsx';
import Footer from '../generic components/Footer.jsx';
import PaymentInfo from '../views/Parent/PaymentInfo.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchParentPayments } from '../FetchFunctions.jsx';

function ParentPayment() {

    const { userData } = useAuth();
    const { data: payments, isLoading } = useQuery({
        queryKey: ['parentPayments'],
        queryFn: () => fetchParentPayments(userData?.id),
        enabled: !!userData?.id
    })

    const [successMessage, setSuccessMessage] = useState("");
    const duration = 3000;
    useEffect(() => {
        if (successMessage.length > 0) {//make it appear for some seconds
            const timer = setTimeout(() => {
                setSuccessMessage(""); // Hide the alert after the duration
            }, duration);
            // Cleanup the timer on component unmount
            return () => clearTimeout(timer);
        }
    }, [successMessage, duration])

    return (
        <div className="w-full bg-white min-h-screen flex flex-col">
            {successMessage.length > 0 &&
                <div role="alert" className="alert alert-success fixed top-20 left-1/2 transform z-10 -translate-x-1/2 w-1/2 flex items-center justify-center  p-4 rounded shadow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current text-white text-2xl "
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className='text-white font-bold text-xl'>{successMessage}</span>
                </div>
            }
            {RenderHeaderNavbar(userData, 4)}
            {/* main page */}
            <div className='w-full flex flex-grow flex-col bg-white  pt-10'>

                {/* main bar up top */}
                <div className='w-11/12 rounded-md text-xl font-medium mx-auto h-16 bg-gray-200 border-2 text-center border-gray-400 flex items-center justify-evenly  '>
                    <p className='w-1/4 '>Ονοματεπώνυμο Επαγγελματία</p>
                    <p className='w-1/4 '>Νωρίτερη Ημερομηνία Πληρωμής</p>
                    <p className='w-1/4 '>Κωδικός Voucher</p>
                    <p className='w-1/4 '>Ενέργεια</p>
                </div>

                {/* div for all payments, with scroll */}
                <div className='w-11/12 mx-auto flex-grow flex flex-col mb-5  gap-2 items-center justify-start  mt-2'>
                    {isLoading && <div className="w-full flex-grow  flex items-center justify-center"> <span className="loading loading-lg"></span> </div>}
                    {!isLoading && payments && payments?.length === 0 &&
                        <div className="w-full flex-grow  flex items-center justify-center">
                            <p className="text-3xl font-semibold text-gray-500">Καμία Πληρωμή Ακόμα.</p>
                        </div>
                    }
                    {!isLoading && payments && payments?.length > 0 &&
                        payments?.map((payment, index) => (
                            <PaymentInfo    key={index} firstName={payment.nannyName} lastName={payment?.nannySurname} paymentDate={payment?.payDate} setSuccessMessage={setSuccessMessage}
                                            role={true} voucher={payment?.voucherCode} senderId={payment?.nannyId} status={payment?.status} paymentId={payment?.id} />
                        ))
                    }


                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ParentPayment;   