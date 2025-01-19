import { RenderHeaderNavbar } from '../../global_assets/global_functions.jsx'
import { useContext } from 'react';
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


    return (
        <div className="w-full bg-white min-h-screen flex flex-col">
            {RenderHeaderNavbar(userData, 4)}
            {/* main page */}
            <div className='w-full flex flex-grow flex-col bg-white  pt-10'>

                {/* main bar up top */}
                <div className='w-11/12 rounded-md text-xl font-medium mx-auto h-16 bg-gray-200 border-2 text-center border-gray-400 flex items-center justify-evenly  '>
                    <p className='w-1/4 '>Ονοματεπώνυμο Επαγγελματία</p>
                    <p className='w-1/4 '>Προθεσμία Πληρωμής</p>
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
                            <PaymentInfo key={index} firstName={payment.nannyName} lastName={payment?.nannySurname} paymentDate={payment?.payDate} role={true} voucher={payment?.voucherCode} senderId={payment?.nannyId} status={payment?.status} />
                        ))
                    }


                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ParentPayment;   