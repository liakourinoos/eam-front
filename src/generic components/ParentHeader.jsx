import logo from '../assets/imgs/logo.png';
import { Link } from 'react-router-dom';
import { MdOutlineExpandMore } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useState } from 'react';
function ParentHeader(){

    const [hover,setHover] = useState(false)
    const toggleHover=(value)=>setHover(value)
    const [settings,SetSettings] = useState(false)
    const toggleSettings=()=>(SetSettings((s)=>!s))


    return(
        <div className="h-16 w-full flex justify-between border-b-2 border-black bg-red-50" >
            {/* box for logo and name */}
            <div className="flex w-1/3 items-center h-full">
                <img src={logo} alt="logo" className="w-1/2 h-full"/>
                <Link to='/' className='text-4xl ml-2 font-bold text-purple-600'>Nanika</Link>
                {/* language toggle */}
                <div>
                    
                </div>
            </div>
            {/* user info */}
            <div className='h-full w-1/3 items-center   flex justify-end gap-3 pr-3 '>
                <Link    to='/profile' className={`h-full w-full p-2 flex items-center justify-end gap-3 `}
                        onMouseEnter={() => toggleHover(true)}
                        onMouseLeave={() => toggleHover(false)}
                >
                    <img    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBA3S71zn7_fD0AXbnLDEOb3vvA9Vo03imLw&s"} 
                            className={`size-14  rounded-full ${hover &&'border-2 border-red-500'}`}/>
                    <p className={`text-2xl w-3/5 font-medium text-center truncate  ${hover && 'text-red-500'}`}> Fykas Athanasios </p>
                </Link>
               {/* settings */}
                <button onClick={toggleSettings} className="relative h-full text-center hover:text-red-500">
                    {settings && 
                        <div className='absolute top-full -right-2 flex flex-col gap-2 w-52 bg-gray-500  border-2 border-gray-700 text-white      z-10'>
                            <Link to='/settings' className='flex items-center justify-evenly h-12 p-2 border-b-2 w-full'> <FaGear className='text-2xl'/><span className='text-sm'>Ρυθμίσεις Λογαριασμού</span></Link>
                            <Link to='/' className='flex items-center justify-evenly h-10 p-2 w-full'> <MdLogout  className='text-2xl'/> Αποσύνδεση</Link>

                        </div>}

                    <MdOutlineExpandMore className='font-bold text-4xl '/>
            
                </button>

            </div>

        </div>
    );
}

export default ParentHeader;