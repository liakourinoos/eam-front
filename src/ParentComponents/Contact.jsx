import {useContext,useEffect,useState}  from 'react'
import {useAuth } from '../customHooks.jsx'
import { RenderHeaderNavbar } from '../../global_assets/global_functions.jsx';
import Footer from '../generic components/Footer.jsx'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { MdPhone,MdEmail } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { LiaSkype } from "react-icons/lia";
import { useMutation } from '@tanstack/react-query';
import {addContactRequest} from '../FetchFunctions.jsx'

function Contact(){

    const {id} = useParams();


    const { userData,loading } = useAuth();

    const [selectedOption, setSelectedOption] = useState('0');
    const toggleSelectedOption =(option)=>{
        setSelectedOption(option);
    }

    const {mutateAsync:sendRequest,isPending} = useMutation({
        mutationFn:()=>addContactRequest(data),
        onError:(error)=>console.log(error),
        onSuccess:()=>setSuccessMessage(true)

    })

    const [data,setData] = useState({
        senderId:userData?.id,
        receiverId:id,
        contactType: selectedOption==='1' ? 'phone' : selectedOption==='2' ? 'email' : 'skype',
        status: 'pending',
        contactInfo: selectedOption==='1' ? userData?.number : selectedOption==='2' ? userData?.email : userData?.skype
    })


    useEffect(()=>{
        if(!loading){
            setData({...data, senderId:userData?.id})
        }    
    },[userData,loading])

    const [successMessage,setSuccessMessage] = useState(false)
    const duration = 2000;
    useEffect(()=>{
        if(successMessage){//make it appear for 3 seconds
            const timer = setTimeout(() => {
                setSuccessMessage(false); // Hide the alert after the duration
            }, duration);
            // Cleanup the timer on component unmount
            return () => clearTimeout(timer);
        }
    },[successMessage,duration] )


    const nav=useNavigate();


    if(loading){
        return(
            <div className='w-full h-screen bg-white flex items-center justify-center'>
                <span className='loading loading-lg'></span>

            </div>
        )
    }


    if(!loading )
    return(
        <div className='w-full h-screen flex flex-col'>
            {successMessage && <div role="alert" className="alert alert-success fixed top-32 left-1/2 transform -translate-x-1/2 w-1/2 flex items-center justify-center  p-4 rounded shadow">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Το αίτημά σας στάλθηκε!</span>
            </div>}
            {RenderHeaderNavbar(userData)}
            <div className='flex-grow pb-5 flex flex-col bg-white'>

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
                                onClick={()=>nav(`/nannyProfile/${id}`)}
                    >
                        <IoChevronBack className='text-4xl'/>
                    </button>

                <p className='text-4xl mt-5 text-center font-medium'>Επιλέξτε Τρόπο Επικοινωνίας</p>

                {/* options div */}
                <div className="w-full flex flex-grow font-medium items-center justify-center gap-14">
                    <div className="group w-1/12 flex flex-col items-center gap-2">
                        <div    className={`${selectedOption==='1' && 'border-2 border-pallete-600'} h-36 cursor-pointer w-full rounded-md flex flex-col items-center justify-center gap-3 bg-pallete-300 group-hover:border-2 group-hover:border-gray-700`}
                                onClick={()=>{toggleSelectedOption('1'); setData({...data, contactType:'phone', contactInfo:userData?.number})}}
                        >
                            <MdPhone className='text-6xl'/>
                            <p className='text-center'>Τηλεφωνικά</p>
                        </div>
                        <div className={`${selectedOption==='1' && 'border-2 border-pallete-600'} w-full flex items-center justify-center group-hover:border-2 group-hover:border-gray-700 bg-pallete-300 rounded-md`}>
                            <p className='w-full text-center overflow-x-auto'>{userData?.number}</p>
                        </div>
                    </div>

                    <div className="group w-1/12 flex flex-col items-center gap-2">
                        <div    className={`${selectedOption==='2' && 'border-2 border-pallete-600'} h-36 cursor-pointer w-full rounded-md flex flex-col items-center justify-center gap-3 bg-pallete-300 group-hover:border-2 group-hover:border-gray-700`}
                                onClick={()=>{toggleSelectedOption('2'); setData({...data, contactType:'email', contactInfo:userData?.email})}}
                        >
                            <MdEmail className='text-6xl'/>
                            <p className='text-center'>Ηλεκτρονικά</p>
                        </div>
                        <div className={`${selectedOption==='2' && 'border-2 border-pallete-600'} w-full flex items-center justify-center group-hover:border-2 group-hover:border-gray-700 bg-pallete-300 rounded-md`}>
                            <p className='w-full text-center overflow-x-auto'>{userData?.email}</p>
                        </div>
                    </div>

                    <div className={` group w-1/12 flex flex-col items-center gap-2`}>
                        <div    className={`${selectedOption==='3' && 'border-2 border-pallete-600'} ${userData?.skype.length >0 ? 'bg-pallete-300' : 'bg-gray-400'} h-36 cursor-pointer w-full rounded-md flex flex-col items-center justify-center gap-3  group-hover:border-2 group-hover:border-gray-700`}
                                onClick={userData?.skype.length >0 ? ()=> {toggleSelectedOption('3'); setData({...data, contactType:'skype', contactInfo:userData?.skype}) }: undefined  }>
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
                            disabled={selectedOption==='0'}
                            onClick={()=>sendRequest()}
                            >
                        {isPending ? <span className='loading loading-sm'></span> : "Επιβεβαίωση" }
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Contact;
