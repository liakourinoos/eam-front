import Footer from '../generic components/Footer.jsx';
import { RenderHeaderNavbar } from '../../global_assets/global_functions.jsx';
import { useAuth } from '../customHooks.jsx';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaMale,FaFemale } from 'react-icons/fa';
import { fetchUser } from '../FetchFunctions.jsx';
import { useQuery } from '@tanstack/react-query';
function ParentProfile() {
    const {id}= useParams();

    const { userData:myData , loading } = useAuth();

    const skipFetch = myData?.id === id ;

    const { data: usrData, isLoading: isUserLoading } = useQuery({
        queryKey: ['parentProfile', id],
        queryFn: () => fetchUser(id),
        enabled: id && !skipFetch,
        retry: 1,
        cacheTime: 0, // Do not keep in cache        
        // staleTime: 0, // Always treat the data as stale
        // refetchOnMount: true, // Refetch on component mount
        // refetchOnWindowFocus: true, // Refetch on window focus
        // refetchInterval: false, // Prevent refetch at regular intervals
    });

    const userData = skipFetch ? myData : usrData ;


    if (loading || isUserLoading ) {
        return (
            <div className="w-full bg-white h-screen flex items-center justify-center">
                <span className='text-3xl font-bold'>Φόρτωση...</span>
            </div>
        )
    }
    
    //den brika xristi me to ID auto i kai na brika, den exei to role tou gonea, error.
    if (!skipFetch && (!usrData || (usrData?.id !== myData?.id && usrData?.role !== true))) {       
        return(
            <div className='w-full h-screen bg-white'> 
                {RenderHeaderNavbar(myData,0)}
                <div className='h-screen bg-white flex flex-col gap-5 items-center justify-center text-3xl font-medium'>
                    <p >Δεν βρέθηκε ο χρήστης.</p>
                    <Link to='/' className='text-blue-500 ml-2'>Επιστροφή στην αρχική σελίδα.</Link>
                </div>
                <Footer/>
            </div>
        )
    }   
    //an einai to profile mou i psaxnw kapoion allon gonea, should render the userData 
    if (id === myData?.id || userData?.role === true) {        
        return (
            <div className="w-full min-h-screen flex flex-col bg-white">
                {/* Header */}
                {RenderHeaderNavbar(myData,0)}
                {/* Breadcrumbs */}
                {/* <div className="breadcrumbs pl-5 text-md">
                    <ul>
                        <li><Link to="/">Αρχική Σελίδα</Link></li>
                        <li className='font-medium'>Προφίλ Κηδεμόνα</li>
                    </ul>
                </div> */}
                {/* Profile Section */}
                <div className="flex-grow w-full flex flex-col">
                    {/* Profile Title */}
                    <p className="text-center font-bold mt-10 text-4xl mx-auto ">
                        Προφίλ Κηδεμόνα
                    </p>

                    {/* Profile Info */}
                    <div className="w-3/4 mx-auto mt-2 pt-5 flex flex-col gap-2 ">
                        {/* pfp and name and gender */}
                        <div className='w-full flex  gap-8 p-4'>
                            <div className='flex-shrink-0'>
                                <img className='h-44 w-44 rounded-full object-cover'
                                    src={userData?.img}
                                />
                            </div>
                            <div className=' w-full h-20 flex items-center'>
                                <p className='text-2xl font-medium'>{userData?.name} {userData?.surname} , {userData?.age}</p>
                                {userData?.gender ? <FaMale className='text-2xl ml-2' title='Αρσενικό'/> : <FaFemale className='text-2xl ml-2' title='Θηλυκό'/>}
                            </div>
                        </div>
                    
                    </div>
                    {/* bio */}
                    <div className='w-3/4 flex flex-col pl-10  0  mt-5  mx-auto'>
                        <span className='w-2/3  mb-2 text-start pl-2 font-medium text-xl  '>Σύντομη Περιγραφή</span>
                        <textarea className='w-2/3  h-40 rounded-md shadow-md border-2 resize-none border-gray-400 bg-white shadow-gray-400 p-2' value={userData?.bio || "Δεν βρέθηκε βιογραφικό."} readOnly/>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        );
    }
    
}

export default ParentProfile;