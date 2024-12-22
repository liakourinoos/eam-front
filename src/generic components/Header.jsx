import logo from '../assets/imgs/logo.png';
import { PiBabyDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom';
function Header(){
    return(
        <div className="h-16 w-full flex justify-between border-b-2 border-black bg-pallete-50" >
            {/* box for logo and name */}
            <div className="flex w-1/3 items-center h-full">
                <PiBabyDuotone className="w-1/6 ml-5 h-full text-pallete-600"/>
                <Link to='/' className='text-4xl ml-3 font-bold text-pallete-600'>Nanika</Link>
                {/* language toggle */}
                <div>
                    
                </div>
            </div>
            {/* for login/sign up */}
            <div className='h-full w-80 flex justify-center gap-3 mr-3 '>
                <Link to='/signup' className='h-full flex items-center'>
                    <span className='text-3xl'>Sign Up</span>
                </Link>

                {/* divider, a simple line */}
                <div className='h-5/6 my-auto border-2 border-black'></div>

                <Link to='/login'  className='flex items-center'>
                    <div className='bg-pink-700 rounded-md px-3 py-1 flex items-center'>
                        <span  className='text-3xl text-white'>Login</span>
                    </div>
                </Link>
            </div>


        </div>
    );
}

export default Header;