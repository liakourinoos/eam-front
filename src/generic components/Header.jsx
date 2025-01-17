import { PiBabyDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom';                
import { GrHelpBook } from "react-icons/gr";
import { useState } from "react";

function Header(){


    return(
        <div className="h-16 w-full flex justify-between border-b-2 border-black bg-pallete-50" >
            {/* box for logo and name */}
            <div className="flex ">
                <Link to='/' className="flex pr-5  items-center text-pallete-600 h-full hover:text-pallete-800">
                    <PiBabyDuotone className=" ml-5 text-6xl "/>
                    <p  className='text-4xl ml-3 font-bold '>Nanika</p>
                    {/* language toggle */}
                    <div>
                        
                    </div>
                </Link>

                
                <Link to='/about' className="flex h-full text-pallete-600 hover:text-pallete-800 ml-16 gap-1 font-semibold items-center px-2 text-3xl">
                    <GrHelpBook className="font-bold"/>
                    <span className=''>Βοήθεια</span>
                </Link>
            </div>

            {/*  links for immediate access to parent/nanny  */}
            <div className=" flex items-center text-2xl font-medium  gap-2 justify-center">
                <Link className="hover:text-pallete-800" to="/login">Βρείτε Εργασία</Link>
                <div className="h-4/6 border-2  border-black "></div>
                <Link className="hover:text-pallete-800" to="/">Βρείτε Επαγγελματία</Link>
            </div>


            {/* for login/sign up */}
            <div className='h-full w-80  flex justify-center gap-3 mr-3 '>
                <Link to='/signup' className='h-full flex items-center hover:text-pallete-800'>
                    <span className='text-3xl'>Εγγραφή</span>
                </Link>

                {/* divider, a simple line */}
                <div className='h-5/6 my-auto border-2 border-black'></div>

                <Link to='/login'  className='flex items-center'>
                    <div className='bg-pink-700 hover:bg-pallete-800 rounded-md px-3 py-1 flex items-center'>
                        <span  className='text-3xl text-white'>Σύνδεση</span>
                    </div>
                </Link>
            </div>


        </div>
    );
}

export default Header;