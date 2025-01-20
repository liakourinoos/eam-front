import { PiBabyDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom';                
import { GrHelpBook } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
function Header(){
    const location = useLocation();
    useEffect(() => {
        console.log("Header sees im int page:" + location.pathname)
},[location ])

    return(
        <div className="h-16 w-full flex justify-between border-b-2 border-black bg-white" >
            {/* box for logo and name */}
            <div className="flex ">
                    <Link to={`/`} className="flex pr-5  items-center text-pallete-800 h-full hover:text-pallete-600">
                        <PiBabyDuotone className=" ml-5 text-6xl " />
                        <p className='text-4xl ml-3 font-bold '>Nanika</p>
                        {/* language toggle */}
                        <div>

                        </div>
                    </Link>




                    {/*  links for immediate access to parent/nanny  */}
                    <div className=" flex items-center text-2xl font-medium ml-16  gap-2 justify-center">
                        <Link className="hover:text-pallete-600" to="/login">Βρείτε Εργασία</Link>
                        <div className="h-4/6 border-2  border-black "></div>
                        <Link className="hover:text-pallete-600" to="/">Βρείτε Επαγγελματία</Link>
                    </div>

                    <Link to='/about' className="flex h-full text-pallete-800 hover:text-pallete-600 ml-12 gap-1 font-semibold items-center px-2 text-3xl">
                        <GrHelpBook className="font-bold" />
                        <span className=''>Βοήθεια</span>
                    </Link>
                </div>

            


            {/* for login/sign up */}
            <div className='h-full w-80  flex justify-center gap-3 mr-3 '>
                <Link to='/signup' className='h-full flex items-center hover:text-pallete-600'>
                    <span className='text-3xl'>Εγγραφή</span>
                </Link>

                {/* divider, a simple line */}
                <div className='h-5/6 my-auto border-2 border-black'></div>

                <Link to='/login' state={location.pathname}  className='flex items-center'>
                    <div className='bg-pallete-800 hover:bg-pallete-600 rounded-md px-3 py-1 flex items-center'>
                        <span  className='text-3xl text-white'>Σύνδεση</span>
                    </div>
                </Link>
            </div>


        </div>
    );
}

export default Header;