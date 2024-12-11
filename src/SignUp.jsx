import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Footer from "./generic components/footer";
import  { Link } from "react-router-dom";
import Header from "./generic components/header";
function SignUp(){

    return(
        <div className="w-full h-screen flex flex-col overflow-hidden justify-between bg-pink-100 ">
            <Header/>
            <div className="w-full h-full overflow-y-auto flex flex-col  items-center py-20 ">
                <div className="w-2/3 h-full rounded-md flex flex-col p-20 items-center bg-fuchsia-200 shadow-lg shadow-gray-400">
                <p className="text-5xl font-bold">Σύνδεση</p>

                <div className="w-1/4  mt-20 ">
                    <p className="text-xl ml-1 font-medium ">Email</p>
                    <input  type="text" 
                            className="w-full h-10 border-2 rounded-md pl-2 mt-1"
                            placeholder="johndoe@gmail.com"
                            />
                </div>
                
                <div className="w-1/4  mt-5 ">
                    <p className="text-xl ml-1 font-medium ">Κωδικός Πρόσβασης</p>
                    
                   
                </div>

                <a href=" " className="mt-3 mr-24" title="ΜΗ λειτουργικός σύνδεσμος.">
                    <span className="underline font-medium">Ξέχασα τον κωδικό μου</span>
                </a>

                <span className="mt-3 mr-20 ">
                    Νέος Χρήστης;
                    <Link to='/signup'>
                        <span className="underline font-medium ml-2" >Εγγραφή{" >"}</span>
                    </Link>
                </span>

                
                <Link to='/' className="bg-pink-600 h-10 w-22  ml-60 flex items-center text-white rounded-md px-3 py-1 mt-5">Σύνδεση</Link>
                </div>
            </div>
            <Footer/>
        </div>


         
    );

}


export default SignUp;