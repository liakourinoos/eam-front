import React from 'react';
import Header from './generic components/Header.jsx';
import Footer from './generic components/Footer.jsx';
import { Link } from 'react-router-dom';
import { RiParentFill } from 'react-icons/ri'; // Icon for "Parent"
import { FaUser } from 'react-icons/fa'; // Icon for "Professional"

function ParentOrNannySignUp() {
    return (
        <div className="bg-white h-screen flex flex-col">
        <Header />
        {/* main page */}
        <div className='flex-grow bg-white flex items-center  justify-evenly '>

            {/* parent div, left */}
            <div className='h-1/2  w-1/5 flex items-center justify-center '>
                <Link className='flex  justify-center flex-col items-center gap-4  hover:text-gray-600 hover:underline' to='/signupparent'>
                    <RiParentFill className='text-9xl  '/>
                    <p className='text-3xl font-medium ' >Γονέας</p>
                </Link>
            </div>

            {/* vertical divider */}
            <div className='border-x-2 border-gray-300 h-3/5'></div>


            {/* nanny div, left */}
            <div className='h-1/2  w-1/5 flex items-center justify-center '>
                <Link className='flex  justify-center flex-col items-center gap-4  hover:text-gray-600 hover:underline' to='/signupnanny'>
                    <FaUser className='text-9xl  '/>
                    <p className='text-3xl font-medium ' >Επαγγελματίας</p>
                </Link>
            </div>


            


        </div>
        {/* login link */}
        <div className='w-full flex justify-center items-center mb-20 text-xl font-medium'>
                <span>Έχετε ήδη εγγραφτεί;<Link className='underline ml-2 text-pallete-600 font-extrabold' to="/login">{`Σύνδεση >`} </Link></span>
        </div>
        
        <Footer />
        </div>
    );
}

export default ParentOrNannySignUp;