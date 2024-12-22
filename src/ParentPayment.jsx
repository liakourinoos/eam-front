import {RenderHeaderNavbar} from '../global_assets/global_functions.jsx'
import { useContext } from 'react';
import { UserContext } from './customHooks.jsx';
import Footer from './generic components/Footer.jsx';
import PaymentInfo from './views/PaymentInfo.jsx';
function ParentPayment() {

    const { userData, setUserData } = useContext(UserContext);



    return (
        <div className="w-full bg-pallete-50 h-screen flex flex-col">
            {RenderHeaderNavbar(userData, 4)}
            {/* main page */}
            <div className='w-full flex flex-grow flex-col bg-pallete-50  pt-10'>
                
                {/* main bar up top */}
                <div className='w-11/12 rounded-md text-xl font-medium mx-auto h-16 bg-gray-200 border-2 border-gray-400 flex items-center justify-between pr-16 pl-5 '>
                    <p>Ονοματεπώνυμο Επαγγελματία</p>
                    <p>Προθεσμία Πληρωμής</p>
                    <p>Κωδικός Voucher</p>
                    <p>Ενέργεια</p>
                </div>

                {/* div for all payments, with scroll */}
                <div className='w-11/12 mx-auto h-full flex flex-col mb-5  gap-2 items-center justify-start overflow-y-scroll mt-2'>
                    <PaymentInfo firstName='Γιάννης' lastName='Παπαδόπουλος' paymentDate='12/12/2021' voucher='123456'/>
                    <PaymentInfo firstName='Γιάννης' lastName='Παπαδόπουλος' paymentDate='25/12/2021' voucher='123456'/>
                    <PaymentInfo firstName='Γιάννης' lastName='Παπαδόπουλος' paymentDate='12/12/2025' voucher='123456'/>
                    <PaymentInfo firstName='Γιάννης' lastName='Παπαδόπουλος' paymentDate='12/12/2021' voucher='123456'/>
                    <PaymentInfo firstName='Γιάννης' lastName='Παπαδόπουλος' paymentDate='12/12/2021' voucher='123456'/>
                    
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ParentPayment;