import Footer from './generic components/Footer.jsx'
import {hours,days,availabilityMatrix} from '../global_assets/global_values.jsx'
import { Link } from 'react-router-dom';
import { FaCheck, FaFile } from 'react-icons/fa6';
import { FaFemale, FaRegQuestionCircle } from 'react-icons/fa';
import {useContext,useState,useEffect} from 'react'
import {UserContext } from './customHooks.jsx'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
// import { MdStarBorder } from 'react-icons/md';
import {RenderHeaderNavbar} from '../global_assets/global_functions.jsx'
import NannyReview from './views/NannyReview.jsx'

function NannyProfile(){
    const gender="Θηλυκό"
    const rating=3.7;
    const fullStars = Math.floor(rating); // Integer part (e.g., for 4.5, this will be 4)
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Half star if there's a decimal part
    const emptyStars = 5 - fullStars - halfStars; // Remaining stars are empty

    const { userData, setUserData } = useContext(UserContext);

    const [isVisible, setIsVisible] = useState(false);

    // Show the button when the user scrolls down
    const handleScroll = () => {
        if (window.scrollY > 200) { // Adjust this value as needed
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to the top when the button is clicked
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scrolling
        });
    };

    useEffect(() => {
        // Listen to the scroll event
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[]);

    return(
        <div className="w-full">
            {RenderHeaderNavbar(userData)}

            {/* main page */}
            <div className=' w-full bg-gray-200 flex'>

               {/* Left div, nanny info */}
                <div className="w-4/6 pb-2 ">

                    {/* Breadcrumbs */}
                    <div className="breadcrumbs pl-5 text-md">
                        <ul>
                            <li><Link to="/search">Αναζήτηση</Link></li>
                            <li className='font-medium'>Προφίλ Επαγγελματία</li>
                        </ul>
                    </div>

                    {/* Div for nanny name, pfp and contact button */}
                    <div className="my-4 px-2 w-full h-40  flex items-center justify-between"> 
                        {/* Left section: pfp, name, and info */}
                        <div className="flex h-full">
                            <img 
                                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBA3S71zn7_fD0AXbnLDEOb3vvA9Vo03imLw&s"} 
                                className="size-40 rounded-full" 
                                alt="Nanny Profile"
                            />
                            {/* Info */}
                            <div className="ml-4 h-2/3 mt-5 text-2xl flex flex-col justify-start">
                                <div className="w-full flex items-center font-medium">
                                    <span>Μαρία Παπαδοπούλου, </span>
                                    <p className="ml-1 mr-2">33</p>
                                    <FaFemale className='text-xl' title={gender} />
                                </div>
                                <p>3 χρόνια εμπειρίας</p>
                                <div className="flex items-center" title={`Βαθμολογία: ${rating}/5`}>
                                    {/* Render full stars */}
                                    {Array.from({ length: fullStars }, (_, idx) => (
                                        <FaStar key={`full-${idx}`} className="text-black" />
                                    ))}
                                    {/* Render half star if needed */}
                                    {halfStars > 0 && <FaStarHalfAlt className="text-black" />}
                                    {/* Render empty stars */}
                                    {Array.from({ length: emptyStars }, (_, idx) => (
                                        <FaRegStar key={`empty-${idx}`} className="text-black" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right section: contact button */}
                        <Link to={`${userData ? '/contact' : '/login'}`} className="w-1/5  bg-pallete-300 text-gray-50  text-3xl flex items-center justify-center rounded-md font-medium h-1/2 ml-auto mr-4">
                            Επικοινωνία
                        </Link>
                    </div>

                    {/* bio section */}
                    <div className='w-2/4 ml-4  mt-10 '>
                        <p className='text-xl pl-2 font-medium'>Σύντομη Περιγραφή</p>
                        <div className='rounded-md px-2 py-1 bg-gray-300 w-full'>
                            <p>Είμαι στοργική και αξιόπιστη νταντά με πάθος για την παιδική ανάπτυξη. Έχω εμπειρία στη δημιουργία καθημερινών προγραμμάτων που βοηθούν 
                            τα παιδιά να μαθαίνουν και να διασκεδάζουν.</p>

                        </div>
                    </div>

                    {/* studies section */}
                    <div className='w-2/4 ml-4  mt-8 '>
                        <p className='text-xl pl-2 font-medium flex cursor-default items-center gap-2 '  title='Επαληθευμένο από εμάς.'>Σπουδές <FaRegQuestionCircle/></p>
                        <div className='rounded-md px-2 py-1 bg-gray-300 w-full'>
                            <ul className='list-disc pl-4'>
                                <li>AEI βρεφονηπιοκομίας Αθηνών</li>
                                <li>βαριεμαι γαμω ειναι καργα βαρετο και νυσταζω!!</li>

                            </ul>

                        </div>
                    </div>

                    {/* certificates section */}
                    <div className='w-2/4 ml-4  mt-8 '>
                        <p className='text-xl pl-2 font-medium flex cursor-default items-center gap-2 '  title='Επαληθευμένο από εμάς.'>Πιστοποιήσεις<FaRegQuestionCircle/></p>
                        <div className='rounded-md px-2 py-1 bg-gray-300 w-full'>
                            <ul className='list-disc pl-4'>
                                <li>Πρώτων Βοηθειών</li>
                                <li>Καρδιοπνευμονική Αναζωογόνηση (ΚΑΡΠΑ)</li>
                                <li>Πιστοποίηση Παιδικής Διατροφής</li>

                            </ul>
                        </div>
                    </div>

                    {/* systatikes epistoles */}
                    <div className='w-2/4 ml-4  mt-8 '>
                        <p className='text-xl pl-2 font-medium flex cursor-default items-center gap-2 '  title='Επαληθευμένο από εμάς.'>Συστατικές Επιστολές</p>
                        <div className='rounded-md px-2 py-1 bg-gray-300 w-full'>
                            <div className='w-2/5 px-2 my-1 bg-gray-400 flex items-center gap-1 pl-1 rounded-md'>
                                <FaFile/> <span className='font-medium text-lg'>Επιστολή_1.txt</span>
                            </div>
                            <div className='w-2/5 px-2 my-1 bg-gray-400 flex items-center gap-1 pl-1 rounded-md'>
                                <FaFile/> <span className='font-medium text-lg'>Επιστολή_1.txt</span>
                            </div>
                            <div className='w-2/5 px-2 my-1 bg-gray-400 flex items-center gap-1 pl-1 rounded-md'>
                                <FaFile/> <span className='font-medium text-lg'>Επιστολή_1.txt</span>
                            </div>
                            
                        </div>
                    </div>
                
                <div className='border-b-2 border-gray-700 my-10 w-3/4 mx-auto h-1'></div>

                <p className='text-2xl mx-auto w-fit font-medium'>Πρόσφατες Αξιολογήσεις Γονέων </p>

                <div className='w-full  mt-5 mb-3  flex flex-col items-center gap-4'>
                    <NannyReview name='Maria' surname='Pap' rating={5} date='99/99/99999' review='good nanny!'/>
                    <NannyReview name='Maria' surname='Pap' rating={4} date='99/99/99999' review='could be better'/>

                    <NannyReview name='Maria' surname='Pap' rating={2} date='99/99/99999' review={"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}/>
                    <NannyReview name='Maria' surname='Pap' rating={1} date='99/99/99999' review='would not recommend!'/>

                </div>
                        {/* Scroll to top button */}
                {isVisible && (
                    <button
                    onClick={scrollToTop}
                    className="fixed bottom-20 right-8 p-4 bg-blue-500 text-white size-16 flex items-center justify-center text-2xl font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-50"
                    >
                        ↑
                    </button>
                )}

                </div>


                {/* right div, available hours and skills */}
                <div className='w-2/6   px-2'>
                    <p className='font-medium text-xl'>Εβδομαδιαίες Διαθέσιμες ώρες</p>
                    <table className="table-auto w-full my-1 rounded-md text-xs bg-slate-400 border-collapse shadow-sm shadow-gray-700">
                        <thead>
                            <tr className="bg-gray-300  rounded-md ">
                                <th className="px-2 py-1 text-center "></th> 
                                {/* Day headers */}
                                {days.map((day, idx) => (
                                    <th key={idx} className="px-2 cursor-default rounded-md  text-center">{day}</th> 
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map((hour, idx) => (
                                <tr key={idx} className="text-center border-y-2 hover:bg-gray-100">
                                    {/* Hour */}
                                    <td className="text-center cursor-default font-normal ">{hour}</td> 
                                    
                                    {availabilityMatrix[idx].map((available, dayIndex) => (
                                        <td key={dayIndex} className="">
                                            {/* Checkmark if available */}
                                            {available ? <FaCheck className="text-green-700 mx-auto" /> : ""} 
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* skills */}
                    <div className='w-2/3 p-2   '>
                        <p className=' font-medium'>Εξοικιωμένος/η με:</p>
                        <div className='bg-gray-400 shadow-md py-1 shadow-gray-600 pl-2 w-full h-44 overflow-y-auto rounded-md'>
                            <ul className='list-disc pl-4'>
                                <li>Dogs</li>
                                <li>Cats</li>
                                <li>Cooking</li>
                                <li>Dogs</li>
                                <li>Cats</li>
                                <li>Cooking</li><li>Dogs</li>
                                <li>Cats</li>
                                <li>Cooking</li>


                            </ul>
                        </div>

                    </div>


                </div>

            </div>


            <Footer/>
        </div>



    );
}

export default NannyProfile;