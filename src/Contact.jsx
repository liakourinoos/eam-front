import {useContext}  from 'react'
import {UserContext } from './customHooks.jsx'
import { RenderHeaderNavbar } from '../global_assets/global_functions.jsx';
import Footer from './generic components/Footer.jsx'
import {Link} from 'react-router-dom'
import { MdPhone,MdEmail } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { LiaSkype } from "react-icons/lia";
function Contact(){
    const { userData, setUserData } = useContext(UserContext);

    return(
        <div className='w-full h-screen'>
            {RenderHeaderNavbar(userData)}
            <div className='h-full bg-gray-300'>

                {/* Breadcrumbs */}
                <div className="breadcrumbs pl-5 text-md">
                    <ul>
                        <li><Link to="/search">Αναζήτηση</Link></li>
                        <li><Link to="/nannyProfile">Προφίλ Επαγγελματία</Link></li>
                        <li className='font-medium'>Επικοινωνία με Επαγγελματία</li>

                    </ul>
                </div>

                {/* div for page title and back button */}
                <div className=" mt-2 w-full h-20  flex gap-10 items-center px-2 ">
                    <div className='size-12 bg-gray-400 rounded-md flex items-center ml-10 justify-center shadow-sm shadow-gray-600'>
                        <IoChevronBack className='text-4xl mr-2 '/>
                    </div>
                    <p className='text-3xl mx-auto font-medium '>Επιλέξτε Τρόπο Επικοινωνίας</p>
                </div>

                {/* options div */}
                <div className="w-full h-1/3  font-medium  flex items-center justify-center gap-14">
                   
                    <div className="w-32 h-4/5 flex flex-col gap-3">
                        <div className="size-32 rounded-md flex flex-col items-center font-medium text-lg justify-end bg-gray-400">
                            <MdPhone className='size-14 bg-yellow-'/>
                            <p className='mt-5'>Τηλεφωνικά</p>
                        </div>
                        <p className='rounded-md w-full bg-gray-400 text-center'>6969696969</p>
                    </div>

                    <div className="w-32 h-4/5 flex flex-col gap-3">
                        <div className="size-32 rounded-md flex flex-col items-center  font-medium text-lg justify-end bg-gray-400 ">
                            <MdEmail className='size-14'/>
                            <p className='mt-5'>Ηλεκτρονικά</p>
                        </div>
                        <p className='rounded-md w-full bg-gray-400  px-1 overflow-x-auto'>my_email@email.com</p>
                    </div>
                   
                    <div className="w-32 h-4/5 flex flex-col gap-3">
                        <div className="size-32 rounded-md flex flex-col items-center font-medium text-lg justify-end bg-gray-400">
                            <LiaSkype className="size-16 text-sky-300 "/>
                            <p className='mt-4'>Skype</p>
                        </div>

                        <p className='rounded-md w-full bg-gray-400 px-1 overflow-x-auto'>@myskypeaddress</p>
                    </div>
                   
                  
                </div>
            </div>
            <Footer/>
        </div>


    );
}

export default Contact;
