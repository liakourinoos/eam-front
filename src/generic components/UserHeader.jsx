import { Link } from 'react-router-dom';
import { MdOutlineExpandMore } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../customHooks.jsx'
import PropTypes from 'prop-types';
import { PiBabyDuotone } from 'react-icons/pi';
import { GrHelpBook } from "react-icons/gr";
import { useLocation } from 'react-router-dom';


function UserHeader({ main_page = "/", role, id }) {

    const location = useLocation();
    const nav = useNavigate();

    const [hover, setHover] = useState(false)
    const toggleHover = (value) => setHover(value)
    const [settings, SetSettings] = useState(false)
    const toggleSettings = () => (SetSettings((s) => !s))

    const { userData, loading, logout } = useAuth(); // Access the user from the context

    const handleLogOut = async () => {
        await logout(); // Call the logout function from context
        nav("/"); // Redirect to
    }

    if (loading) return (
        <div className='h-16 w-full flex justify-between border-b-2 border-black bg-white'>
            <span className='text-3xl font-bold'>Φόρτωση...</span>
        </div>
    )

    const [showMessage, setShowMessage] = useState(false)


    if (!loading && userData)
        return (
            <div className="h-16 w-full flex justify-between  bg-white" >
                {/* box for logo and name */}
                <div className="flex ">
                    <Link to={`${userData?.role ? '/' : '/nannyOffers'}`} className="flex pr-5  items-center text-pallete-800 h-full hover:text-pallete-700">
                        <PiBabyDuotone className=" ml-5 text-6xl " />
                        <p className='text-4xl ml-3 font-bold '>Nanika</p>

                    </Link>




                    {/*  links for immediate access to parent/nanny  */}
                    {/* <div className=" flex items-center text-2xl font-medium ml-16  gap-2 justify-center">
                        <Link className="hover:text-pallete-800" to="/login">Βρείτε Εργασία</Link>
                        <div className="h-4/6 border-2  border-black "></div>
                        <Link className="hover:text-pallete-800" to="/">Βρείτε Επαγγελματία</Link>
                    </div> */}


                    {/*  links for immediate access to parent/nanny  */}
                    <div className=" flex items-center text-2xl font-medium ml-16  gap-2 justify-center">
                        <button className="hover:text-pallete-800"
                            onClick={() => { !role ? nav('/nannyoffers') : setShowMessage(true) }}
                        >
                            Βρείτε Εργασία
                        </button>
                        <div className="h-4/6 border-2  border-black "></div>
                        <button className="hover:text-pallete-800"
                            onClick={() => { role ? nav('/') : setShowMessage(true) }}
                        >
                            Βρείτε Επαγγελματία
                        </button>
                    </div>

                    <Link to='/about' className="flex h-full text-pallete-800 hover:text-pallete-700 ml-12 gap-1 font-semibold items-center px-2 text-3xl">
                        <GrHelpBook className="font-bold" />
                        <span className=''>Βοήθεια</span>
                    </Link>
                </div>


                {/* user info */}
                <div className='h-full  items-center   flex justify-end gap-3 pr-3 '>
                    <Link to={`${role ? `/parentprofile/${id}` : `/nannyprofile/${id}`}`} className={`  h-full w-full p-2 flex items-center justify-end gap-3 `}
                        onMouseEnter={() => toggleHover(true)}
                        onMouseLeave={() => toggleHover(false)}
                    >
                        <img src={userData?.img}
                            className={`size-14  rounded-full ${hover ? 'border-2 border-pallete-700' : ''} ${location?.pathname === `/parentprofile/${id}` || location?.pathname === `/nannyprofile/${id}` ? 'border-2 border-pallete-800' : ""}`} />
                        <p className={`text-2xl w-56  font-medium text-start truncate  ${hover ? 'text-pallete-700' : ''} ${location?.pathname === `/parentprofile/${id}` || location?.pathname === `/nannyprofile/${id}` ? 'text-pallete-800' : ""}`} title={`${userData?.name} ${userData?.surname}`} > {userData?.name} {userData?.surname} </p>
                    </Link>
                    {/* settings */}
                    <div  className="relative  cursor-pointer w-1/6 flex items-center justify-center h-full text-center hover:text-pallete-700">
                        {settings &&
                            <div className='absolute top-full -right-2 flex flex-col gap-1 w-52 bg-gray-600 border-2 border-gray-700 text-white      z-10'>
                                <Link to={`${role ? `/parentsettings` : `/nannysettings`}`} className='hover:bg-gray-400 flex items-center justify-evenly h-10 p-2 w-full'>
                                    <FaGear className='text-2xl' />
                                    <span className='text-sm'>Ρυθμίσεις Λογαριασμού</span>
                                </Link>
                                <button onClick={handleLogOut} className='hover:bg-gray-400 flex items-center justify-evenly h-10 p-2 w-full'> 
                                    <MdLogout className='text-2xl' />
                                    Αποσύνδεση
                                </button>
                            </div>
                        }
                        <MdOutlineExpandMore onClick={toggleSettings} className='font-bold text-4xl ' />
                    </div>

                </div>

                {showMessage && (
                    <>
                        {/* Background Overlay */}
                        <div className="fixed inset-0 bg-black bg-opacity-40 z-40" />

                        {/* Modal */}
                        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-1/3 rounded-md z-50 bg-white shadow-xl p-6">
                            <h3 className="font-bold text-lg">Προσοχή!</h3>
                            <p className="py-4">Πρόκειται να αποσυνδεθείτε και να γυρίσετε στην αρχική σελίδα. Συνέχεια;</p>
                            <div className="modal-action">
                                <form method="dialog" className='flex gap-3'>
                                    {/* Close button */}
                                    <button className="bg-red-500 py-2 px-3 rounded-md font-semibold text-white" onClick={() => setShowMessage(false)}>Ακύρωση</button>
                                    <button className="text-black border-2 border-black py-2 px-3 rounded-md font-semibold text" onClick={() => { logout(); nav("/") }}>Επιβεβαίωση</button>

                                </form>
                            </div>
                        </div>
                    </>
                )}

            </div>


        );
}

export default UserHeader;

UserHeader.propTypes = {
    main_page: PropTypes.string,
    role: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};