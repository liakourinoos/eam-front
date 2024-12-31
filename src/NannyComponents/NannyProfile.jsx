import Footer from '../generic components/Footer.jsx'
import {hours,days} from '../../global_assets/global_values.jsx'
import { Link } from 'react-router-dom';
import { FaCheck, FaFile } from 'react-icons/fa6';
import { FaFemale, FaMale, FaRegQuestionCircle } from 'react-icons/fa';
import {useState,useEffect} from 'react'
import {useAuth } from '../customHooks.jsx'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
// import { MdStarBorder } from 'react-icons/md';
import {RenderHeaderNavbar} from '../../global_assets/global_functions.jsx'
import { useParams } from 'react-router-dom';
import { fetchUser } from '../FetchFunctions.jsx';
import { useQuery } from '@tanstack/react-query';
import { downloadFile } from '../../global_assets/global_functions.jsx';
import { fetchNannyReviews } from '../FetchFunctions.jsx';
import Review from '../views/Reviews/Review.jsx';


function NannyProfile(){
   

    const { userData:myData,loading } = useAuth();

    const { id } = useParams();
    
    

    // Check if the id from the URL is the same as myData.id to avoid unnecessary fetching
    const skipFetch = myData?.id === id;

    const { data: usrData, isLoading: isUserLoading } = useQuery({
        queryKey: [`nannyProfile`,id ],
        queryFn: () => fetchUser(id),
        enabled: id && !skipFetch,
        retry: 1,
        cacheTime: 0, // Do not keep in cache
        // staleTime: 0, // Always treat the data as stale
        // refetchOnMount: true, // Refetch on component mount
        // refetchOnWindowFocus: true, // Refetch on window focus
        // refetchInterval: false, // Prevent refetch at regular intervals
    });


    const userData = skipFetch ? myData : usrData;

    const {data:reviews,isLoading:isReviewsLoading}=useQuery({
        queryFn:()=>fetchNannyReviews(userData?.id),
        queryKey:["reviews", userData?.id],
        retry: 1,
    });
    

    
    const [fullStars,setFullStars]=useState(0);
    const [halfStars,setHalfStars]=useState(0); ;
    const [emptyStars,setEmptyStars]=useState(0);

    useEffect(()=>{
        if(userData?.rating){
            const rating = userData?.rating;
            setFullStars(Math.floor(rating)); // Integer part (e.g., for 4.5, this will be 4)
            setHalfStars(rating % 1 >= 0.5 ? 1 : 0); // Half star if there's a decimal part
            setEmptyStars(5 - Math.floor(rating) - (rating % 1 >= 0.5 ? 1 : 0)); // Remaining stars are empty
        }
    },[userData])

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


    if (loading || isUserLoading ) {
        return (
            <div className="w-full bg-white h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    //de brethike o xristis me to ID auto kai to role nanny KAI DEN EIMAI EGW.
    if (!skipFetch && (!usrData || (usrData?.id !== myData?.id && usrData?.role !== false))) {       
        // console.log("got into not found.")
        // console.log(skipFetch?"my profile" :"other profile")
        // console.log(usrData)
        // console.log(myData)
        // console.log(userData)
        return(
            <div className='w-full h-screen bg-white'> 
                {RenderHeaderNavbar(myData,0)}
                <div className='h-screen bg-white flex flex-col gap-5 items-center justify-center text-3xl font-medium'>
                    <p >Δε βρέθηκε ο χρήστης.</p>
                    <Link to='/' className='text-blue-500 ml-2'>Επιστροφή στην αρχική σελίδα.</Link>
                </div>
                <Footer/>
            </div>
        )
    }


    //check if i visited my own profile or a nanny profile.
    if (id === myData?.id || userData?.role === false) 
        return(
        <div className="w-full bg-white">
            {RenderHeaderNavbar(myData,0)}

            {/* main page */}
            <div className=' w-full  bg-white flex'>

               {/* Left div, nanny info */}
                <div className="w-4/6 pb-2 ">

                    {/* Breadcrumbs */}
                    {/* <div className="breadcrumbs pl-5 text-md">
                        <ul>
                            <li><Link to="/search">Αναζήτηση</Link></li>
                            <li className='font-medium'>Προφίλ Επαγγελματία</li>
                        </ul>
                    </div> */}

                    {/* Div for nanny name, pfp and contact button */}
                    <div className="my-4 px-2 w-full h-40  flex items-center justify-between"> 
                        {/* Left section: pfp, name, and info */}
                        <div className="flex h-full">
                            <img 
                                src={userData?.img} 
                                className="size-40 rounded-full" 
                                alt="Nanny Profile"
                            />
                            {/* Info */}
                            <div className="ml-4 h-2/3 mt-5 text-2xl flex flex-col justify-start">
                                <div className="w-full flex items-center font-medium">
                                    <span>{userData?.name} {userData?.surname}, </span>
                                    <p className="ml-1 mr-2">{userData?.age}</p>
                                    { !userData?.gender && <FaFemale className='text-xl' title={"Θηλυκό"} />}
                                    {  userData?.gender && <FaMale className='text-xl' title={"Αρσενικό"} /> }
                                </div>
                                <p>{userData?.experience} χρόνια εμπειρίας</p>
                                <div className="flex items-center" title={`Βαθμολογία: ${userData?.rating}/5`}>
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
                                    <p className='ml-2'>({userData?.ratingCount})</p>
                                </div>
                            </div>
                        </div>

                        {/* Right section: contact button, ONLY visible when Im not in my own profile */}
                        { id!==myData?.id && <Link to={`${myData ? `/contact/${userData?.id}` : '/login'}`} className="w-1/5  bg-pallete-400 text-gray-50  text-3xl flex items-center justify-center rounded-md font-medium h-1/2 ml-auto mr-4">
                            Επικοινωνία
                        </Link>}
                    </div>

                    {/* bio section */}
                    <div className='w-2/4 ml-4  mt-10 '>
                        <p className='text-xl pl-2 font-medium'>Σύντομη Περιγραφή</p>
                        <div className='rounded-md pl-6 pr-2  py-1 bg-gray-100 w-full'>
                            {(!userData?.bio || userData?.bio?.length===0) && <p className='text-gray-600'>Δε βρέθηκε περιγραφή.</p>}
                            {userData?.bio && <p>{userData?.bio}</p>}

                        </div>
                    </div>

                    {/* studies section */}
                    <div className='w-2/4 ml-4  mt-8 '>
                        <p className='text-xl pl-2 font-medium flex cursor-default items-center gap-2 '  title='Επαληθευμένο από εμάς.'>Σπουδές <FaRegQuestionCircle/></p>
                        <div className='rounded-md px-2 py-1 bg-gray-100 w-full'>
                            <ul className='list-disc pl-4'>
                                { (!userData?.education || userData?.education?.length ===0 ) && <p className='text-gray-600'>Δε βρέθηκαν σπουδές.</p>}
                                {userData?.education?.map((edu,idx)=>(
                                    <li key={idx}>{edu.title}</li>    
                                ))}

                            </ul>

                        </div>
                    </div>

                    {/*  certificates section */} 
                    <div className='w-2/4 ml-4  mt-8 '>
                        <p className='text-xl pl-2 font-medium flex cursor-default items-center gap-2 '  title='Επαληθευμένο από εμάς.'>Πιστοποιήσεις<FaRegQuestionCircle/></p>
                        <div className='rounded-md px-2 py-1 bg-gray-100 w-full'>
                            <ul className='list-disc pl-4'>
                                {(!userData?.certificates || userData?.certificates?.length ===0 )  && <p className='text-gray-600'>Δε βρέθηκαν πιστοποιήσεις.</p>}
                                {userData?.certificates?.map((cert,idx)=>(
                                    <li key={idx} >
                                        {cert.title}
                                    </li>  
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* systatikes epistoles */}
                    <div className='w-2/4 ml-4  mt-8 '>
                        <p className='text-xl pl-2 font-medium flex cursor-default items-center gap-2 '  title='Επαληθευμένο από εμάς.'>Συστατικές Επιστολές</p>
                        <div className='rounded-md px-2 py-1 bg-gray-100 w-full'>
                            {(!userData?.letters || userData?.letters.length === 0 ) && <p className='text-gray-600'>Δε βρέθηκαν συστατικές επιστολές.</p>}
                            {userData?.letters?.map((lett,idx)=>(
                                    <li key={idx} className="flex my-1 items-center">
                                        <span className="mr-2 text-3xl">•</span>
                                        <button title={`${lett.name} (DUMMY ΑΡΧΕΊΟ)`}
                                            className=" overflow-x-auto  bg-white py-2  px-3 rounded-md shadow-sm shadow-gray-600"
                                            onClick={() => downloadFile(lett.name)}
                                        >
                                            {lett.name}
                                        </button>
                                </li>  
                            ))}
                        </div>
                    </div>
                
                <div className='border-b-2 border-gray-700 my-10 w-3/4 mx-auto h-1'></div>

                <p className='text-2xl mx-auto w-fit font-medium'>Πρόσφατες Αξιολογήσεις Γονέων </p>

                <div className='w-full   mt-5 flex flex-col items-center '>
                    {isReviewsLoading && <div className="w-full flex-grow  flex items-center justify-center"> <span className="loading loading-lg"></span> </div>}
                    {!isReviewsLoading && reviews.length === 0 && <p>Δε βρέθηκαν αξιολογήσεις.</p>}
                    {!isReviewsLoading && reviews.length > 0 && 
                        reviews.map((review,index)=>(
                            <Review    key={index} seenFrom="nanny" review={review} 
                                            nannyName={userData?.name} nannySurname={userData?.surname} 
                                            nannyId={userData?.id} />

                    ))}
                


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
                <div className='w-2/6 mr-10 mt-10  px-2'>
                    <p className='font-medium text-xl'>Εβδομαδιαίες Διαθέσιμες ώρες</p>
                    <table className="table-auto w-full my-1 rounded-md text-xs bg-slate-200 border-collapse shadow-sm shadow-gray-700">
                        <thead>
                            <tr className="bg-gray-300 rounded-md">
                                <th className="px-2 py-1 text-center"></th>
                                {/* Render the headers for the days */}
                                {days.map((day, idx) => (
                                    <th key={idx} className="px-2 cursor-default rounded-md text-center">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Iterate over hours to create rows */}
                            {hours.map((time, hourIdx) => (
                                <tr key={hourIdx} className="text-center border-y-2 border-slate-400 hover:bg-gray-100">
                                    {/* First column for the time slot */}
                                    <td className="text-center cursor-default font-normal">{time}</td>
                                    {/* Iterate over days for each hour */}
                                    {days.map((day, dayIdx) => (
                                        <td key={dayIdx} className="border-2 border-slate-400 border-x">
                                            {/* Check if the current day and hour exists in the availabilityMatrix */}
                                            {userData?.availabilityMatrix.some(
                                                (entry) => entry.day === day && entry.time === time
                                            ) ? (
                                                <FaCheck className="text-green-800 font-medium mx-auto" />
                                            ) : (
                                                ""
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* skills */}
                    <div className='w-2/3 p-2  mt-5 '>
                        <p className=' font-medium'>{userData?.gender? "Εξοικιωμένος" : "Εξοικιωμένη"} με:</p>
                        <div className='bg-gray-100 shadow-md py-1 shadow-gray-700 pl-2 w-full h-44 overflow-y-auto rounded-md'>
                            <ul className='list-disc pl-4'>
                                {(!userData?.skills || userData?.skills?.length===0) && <p className='font-medium mt-2  text-gray-600'>Δε βρέθηκαν εξοικιώσεις του χρήστη</p>}
                                {userData?.skills.map((skill,idx)=>(
                                    <li key={idx}>{skill}</li>
                                ))}


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