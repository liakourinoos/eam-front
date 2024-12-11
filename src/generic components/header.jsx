import logo from '../assets/imgs/logo.png';
import { Link } from 'react-router-dom';
function Header(){
    return(
        <div className="h-16 w-full flex justify-between border-b-2 border-black bg-red-50" >
            {/* box for logo and name */}
            <div className="flex w-1/3 items-center h-full">
                <img src={logo} alt="logo" className="w-1/2 h-full"/>
                <p className='text-4xl ml-2 font-bold text-purple-600'>Nanika</p>
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