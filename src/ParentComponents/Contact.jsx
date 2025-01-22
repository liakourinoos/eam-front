import { useEffect, useState } from 'react'
import { useAuth } from '../customHooks.jsx'
import { RenderHeaderNavbar } from '../../global_assets/global_functions.jsx';
import Footer from '../generic components/Footer.jsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdPhone, MdEmail } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { LiaSkype } from "react-icons/lia";
import { useMutation } from '@tanstack/react-query';
import { addContactRequest } from '../FetchFunctions.jsx'

function Contact() {

    const { id } = useParams();


    const { userData, loading } = useAuth();

    const [selectedOption, setSelectedOption] = useState('0');
    const [hoverOption, setHoverOption] = useState(0);


    const { mutateAsync: sendRequest, isPending } = useMutation({
        mutationFn: () => addContactRequest(data),
        onError: (error) => console.log(error),
        onSuccess: () => setSuccessMessage(true)

    })

    const [data, setData] = useState({
        senderId: userData?.id,
        receiverId: id,
        contactType: selectedOption === '1' ? 'phone' : selectedOption === '2' ? 'email' : 'skype',
        status: 'pending',
        contactInfo: selectedOption === '1' ? userData?.number : selectedOption === '2' ? userData?.email : userData?.skype
    })


    useEffect(() => {
        if (!loading) {
            setData({ ...data, senderId: userData?.id })
        }
    }, [userData, loading])

    useEffect(() => {
        setData({
            ...data,
            contactType: selectedOption === '1' ? 'phone' : selectedOption === '2' ? 'email' : 'skype',
            contactInfo: selectedOption === '1' ? userData?.number : selectedOption === '2' ? userData?.email : userData?.skype
        });
    }, [selectedOption, userData]);

    const [successMessage, setSuccessMessage] = useState(false)
    const duration = 2000;
    useEffect(() => {
        if (successMessage) {//make it appear for 3 seconds
            const timer = setTimeout(() => {
                setSuccessMessage(false); // Hide the alert after the duration
            }, duration);
            // Cleanup the timer on component unmount
            return () => clearTimeout(timer);
        }
    }, [successMessage, duration])


    const nav = useNavigate();


    if (loading) {
        return (
            <div className='w-full h-screen bg-white flex items-center justify-center'>
                <span className='loading loading-lg'></span>

            </div>
        )
    }

    async function handleContact() {
        await sendRequest();
        setSelectedOption("0");
    }



    if (!loading)
        return (
            <div className='w-full h-screen flex flex-col'>
                {successMessage && <div role="alert" className="alert alert-success fixed top-28 left-1/2 transform -translate-x-1/2 w-1/2 flex items-center justify-center  p-4 rounded shadow">
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
                    <span className='text-white font-bold text-2xl'>Το αίτημα επικοινωνίας στάλθηκε!</span>
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
                    <button className='size-12 mt-5 flex items-center hover:bg-pallete-800 hover:text-white  bg-white border-2 border-pallete-800 text-pallete-800 rounded-md  ml-10  shadow-md shadow-gray-700'
                        onClick={() => nav(`/nannyProfile/${id}`)}
                    >
                        <IoChevronBack className='text-4xl mx-auto' />
                    </button>

                    <p className='text-4xl mt-5 text-center font-medium'>Επιλέξτε Τρόπο Επικοινωνίας</p>

                    {/* options div & button */}
                    <div className="w-full  flex flex-col flex-grow font-medium items-center justify-center">
                        
                        <div className='flex w-full  justify-center items-center gap-14'>
                            {/* phone option */}
                            <div
                                className={`flex flex-col w-60 h-60 px-3 rounded-md cursor-pointer border-2 ${selectedOption !== "1" && hoverOption !== 1 ? "text-black border-black" : ""} ${selectedOption === "1" ? "border-white bg-pallete-800 text-white" : ""} ${hoverOption === 1 ? "border-white bg-pallete-700 text-white" : ""} justify-center items-center gap-2`}
                                onMouseEnter={() => hoverOption !== 1 && setHoverOption(1)}
                                onMouseLeave={() => hoverOption !== 0 && setHoverOption(0)}
                                onClick={() => selectedOption !== '1' && setSelectedOption('1')}
                            >
                                <MdPhone className='text-7xl' />
                                <span className={`text-2xl ${selectedOption === '1' ? "underline" : ""}`}>Τηλεφωνικά</span>
                                <p className={`w-full text-center text-xl overflow-x-auto`}>{userData?.number}</p>
                            </div>

                            {/* email option */}
                            <div
                                className={`flex flex-col w-60 h-60 px-3 rounded-md cursor-pointer border-2 ${selectedOption !== "2" && hoverOption !== 2 ? "text-black border-black" : ""} ${selectedOption === "2" ? "border-white bg-pallete-800 text-white" : ""} ${hoverOption === 2 ? "border-white bg-pallete-700 text-white" : ""} justify-center items-center gap-2`}
                                onMouseEnter={() => hoverOption !== 2 && setHoverOption(2)}
                                onMouseLeave={() => hoverOption !== 0 && setHoverOption(0)}
                                onClick={() => selectedOption !== '2' && setSelectedOption('2')}
                            >
                                <MdEmail className='text-7xl' />
                                <span className={`text-2xl ${selectedOption === '2' ? "underline" : ""}`}>Email</span>
                                <p className={`w-full text-center text-xl overflow-x-auto`}>{userData?.email}</p>
                            </div>

                            {/* skype option */}
                            <div
                                className={`flex flex-col w-60 h-60 px-3 rounded-md cursor-pointer border-2 ${selectedOption !== "3" && hoverOption !== 3 ? "text-black border-black" : ""} ${selectedOption === "3" ? "border-white bg-pallete-800 text-white" : ""} ${hoverOption === 3 ? "border-white bg-pallete-700 text-white" : ""} justify-center items-center gap-2 ${!userData?.skype ? "cursor-not-allowed opacity-50" : ""}`}
                                onMouseEnter={() => userData?.skype && hoverOption !== 3 && setHoverOption(3)}
                                onMouseLeave={() => userData?.skype && hoverOption !== 0 && setHoverOption(0)}
                                onClick={() => userData?.skype && selectedOption !== '3' && setSelectedOption('3')}
                            >
                                <LiaSkype className='text-7xl' />
                                <span className={`text-2xl ${selectedOption === '3' ? "underline" : ""}`}>Skype</span>
                                <p className={`w-full text-center text-xl overflow-x-auto`}>{userData?.skype}</p>
                            </div>
                        </div>

                        <div className='w-full mt-20  mt flex justify-center items-center'>
                            <div className='w-1/2'></div>
                            <button className={`text-xl w-36 font-medium rounded-md p-3   ${selectedOption === '0' ? 'bg-gray-400' : 'hover:bg-pallete-700 bg-pallete-800 text-white'}`}
                                disabled={selectedOption === '0'}
                                onClick={() => { handleContact(); }}
                            >
                                {isPending ? <span className='loading loading-sm'></span> : "Επιβεβαίωση"}
                            </button>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        );
}

export default Contact;
