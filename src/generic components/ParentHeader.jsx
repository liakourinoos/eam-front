import { Link } from 'react-router-dom';
import { MdOutlineExpandMore } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useState,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {UserContext} from '../customHooks.jsx'
import PropTypes from 'prop-types';
import { PiBabyDuotone } from 'react-icons/pi';

function ParentHeader({main_page="/"}){
    const nav=useNavigate();

    const [hover,setHover] = useState(false)
    const toggleHover=(value)=>setHover(value)
    const [settings,SetSettings] = useState(false)
    const toggleSettings=()=>(SetSettings((s)=>!s))

    const { userData, setUserData } = useContext(UserContext);


    const handleLogout = () => {
        setUserData(undefined);
        nav('/');
    
    };

    return(
        <div className="h-16 w-full flex justify-between border-b-2 border-black bg-pallete-50" >
            {/* box for logo and name */}
            <Link to='/' className="flex w-1/3 items-center h-full">
                <PiBabyDuotone className="w-1/6  ml-5 h-full text-pallete-600"/>
                <p  className='text-4xl ml-3 font-bold text-pallete-600'>Nanika</p>
                {/* language toggle */}
                <div>
                    
                </div>
            </Link>
            {/* user info */}
            <div className='h-full w-1/3 items-center   flex justify-end gap-3 pr-3 '>
                <Link    to='/profile' className={`h-full w-full p-2 flex items-center justify-end gap-3 `}
                        onMouseEnter={() => toggleHover(true)}
                        onMouseLeave={() => toggleHover(false)}
                >
                    <img    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBA3S71zn7_fD0AXbnLDEOb3vvA9Vo03imLw&s"} 
                            className={`size-14  rounded-full ${hover &&'border-2 border-red-500'}`}/>
                    <p className={`text-2xl w-3/5 font-medium text-start truncate  ${hover && 'text-red-500'}`}> {userData?.name} {userData?.surname} </p>
                </Link>
               {/* settings */}
                <div onClick={toggleSettings} className="relative cursor-pointer w-1/6 flex items-center justify-center h-full text-center hover:text-red-500">
                    {settings && 
                        <div className='absolute top-full -right-2 flex flex-col gap-2 w-52 bg-gray-500  border-2 border-gray-700 text-white      z-10'>
                            <Link to='/parentsettings' className='flex items-center justify-evenly h-12 p-2 border-b-2 w-full'> <FaGear className='text-2xl'/><span className='text-sm'>Ρυθμίσεις Λογαριασμού</span></Link>
                            <button onClick={handleLogout} className='flex items-center justify-evenly h-10 p-2 w-full'> <MdLogout  className='text-2xl'/> Αποσύνδεση</button>

                        </div>}

                    <MdOutlineExpandMore className='font-bold text-4xl '/>
            
                </div>

            </div>

        </div>
    );
}

export default ParentHeader;

ParentHeader.propTypes= {
    main_page:PropTypes.string,
};