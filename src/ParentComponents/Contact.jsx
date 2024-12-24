import {useContext,useState}  from 'react'
import {useAuth } from '../customHooks.jsx'
import { RenderHeaderNavbar } from '../../global_assets/global_functions.jsx';
import Footer from '../generic components/Footer.jsx'
import {Link, useNavigate} from 'react-router-dom'
import { MdPhone,MdEmail } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { LiaSkype } from "react-icons/lia";

function Contact(){
    const { userData } = useAuth();

    const [selectedOption, setSelectedOption] = useState('0');
    const toggleSelectedOption =(option)=>{
        setSelectedOption(option);
    }

    const nav=useNavigate();

    return(
        <div className='w-full h-screen flex flex-col'>
            {RenderHeaderNavbar(userData)}
            <div className='flex-grow pb-5 flex flex-col bg-pallete-50'>

                {/* Breadcrumbs */}
                <div className="breadcrumbs pl-5 text-md">
                    <ul>
                        <li><Link to="/search">Αναζήτηση</Link></li>
                        <li><Link to="/nannyProfile">Προφίλ Επαγγελματία</Link></li>
                        <li className='font-medium'>Επικοινωνία με Επαγγελματία</li>
                    </ul>
                </div>

                {/* div for back button */}
                    <button     className='size-12 mt-5 flex items-center justify-center bg-gray-400 rounded-md  ml-10  shadow-sm shadow-gray-600'
                                onClick={()=>nav(-1)}
                    >
                        <IoChevronBack className='text-4xl'/>
                    </button>

                <p className='text-4xl mt-5 text-center font-medium'>Επιλέξτε Τρόπο Επικοινωνίας</p>

                {/* options div */}
                <div className="w-full flex flex-grow font-medium items-center justify-center gap-14">
                    <div className="group w-1/12 flex flex-col items-center gap-2">
                        <div className={`${selectedOption==='1' && 'border-2 border-pallete-600'} h-36 cursor-pointer w-full rounded-md flex flex-col items-center justify-center gap-3 bg-pallete-300 group-hover:border-2 group-hover:border-gray-700`}
                             onClick={()=>toggleSelectedOption('1')}>
                            <MdPhone className='text-6xl'/>
                            <p className='text-center'>Τηλεφωνικά</p>
                        </div>
                        <div className={`${selectedOption==='1' && 'border-2 border-pallete-600'} w-full flex items-center justify-center group-hover:border-2 group-hover:border-gray-700 bg-pallete-300 rounded-md`}>
                            <p className='w-full text-center overflow-x-auto'>{userData?.number}</p>
                        </div>
                    </div>

                    <div className="group w-1/12 flex flex-col items-center gap-2">
                        <div className={`${selectedOption==='2' && 'border-2 border-pallete-600'} h-36 cursor-pointer w-full rounded-md flex flex-col items-center justify-center gap-3 bg-pallete-300 group-hover:border-2 group-hover:border-gray-700`}
                             onClick={()=>toggleSelectedOption('2')}>
                            <MdEmail className='text-6xl'/>
                            <p className='text-center'>Ηλεκτρονικά</p>
                        </div>
                        <div className={`${selectedOption==='2' && 'border-2 border-pallete-600'} w-full flex items-center justify-center group-hover:border-2 group-hover:border-gray-700 bg-pallete-300 rounded-md`}>
                            <p className='w-full text-center overflow-x-auto'>{userData?.email}</p>
                        </div>
                    </div>

                    <div className={` group w-1/12 flex flex-col items-center gap-2`}>
                        <div className={`${selectedOption==='3' && 'border-2 border-pallete-600'} ${userData?.skype.length >0 ? 'bg-pallete-300' : 'bg-gray-400'} h-36 cursor-pointer w-full rounded-md flex flex-col items-center justify-center gap-3  group-hover:border-2 group-hover:border-gray-700`}
                             onClick={userData?.skype.length >0 ? ()=> toggleSelectedOption('3') : undefined  }>
                            <LiaSkype className='text-6xl'/>
                            <p className='text-center'>Skype</p>
                        </div>
                        <div    className={`${selectedOption==='3' && 'border-2 border-pallete-600'} ${userData?.skype.length >0 ? 'bg-pallete-300' : 'bg-gray-400'} w-full flex items-center justify-center group-hover:border-2 group-hover:border-gray-700 rounded-md`}
                                disabled={userData?.skype.len ===0}
                        >
                            <p className='w-full text-center overflow-x-auto'>{userData?.skype.length>0 ? userData?.skype : "-"}</p>
                        </div>
                    </div>
                </div>

                {/* confirm button */}
                <div className='w-full h-1/12 flex justify-end px-32'>
                    <button className={`text-xl font-medium rounded-md p-3 ${selectedOption==='0' ? 'bg-gray-400' : 'bg-pallete-300'}`}
                            disabled={selectedOption==='0'}>
                        Επιβεβαίωση
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Contact;
