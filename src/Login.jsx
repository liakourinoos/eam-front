import Header from "./generic components/Header";
import Footer
 from "./generic components/Footer";
 import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import {UserContext} from './customHooks.jsx'
import {useContext} from 'react'

function Login(){
    const nav=useNavigate();

    const { userData, setUserData } = useContext(UserContext);

    const [email,setEmail]= useState("")
    const [password,setPassword] = useState("")

    const handleLogin =({email,password})=>{
        if(email==="ilias" && password==="1"){
            setUserData({
                name:"2sougiades",
                surname:"27tsouries",
                AMKA:"12345678901",
                gender:"Male",
                role:"parent",
                bio:"THis is my bio!"
            })
            nav(-1)
        }
        else if(email==="nasos" && password==="2"){
            setUserData({
                name:"nasos",
                surname:"fykas",
                AMKA:"0987654321",
                gender:"Female",
                role:"nanny",
                bio:"naso's bio."
            })
            nav(-1)
        }


    }
  
    const [passwordVisibility,setPasswordVisibility] = useState(false);
    const toggleVisibility =()=> setPasswordVisibility(pV => !pV);

    return(
        <div className="w-full h-screen flex flex-col overflow-hidden justify-between bg-pink-100 ">
            <Header/>
            <div className="w-full h-full overflow-y-auto flex flex-col items-center py-20 ">
                <div className="w-2/3  rounded-md flex flex-col p-20 items-center bg-fuchsia-200 shadow-lg shadow-gray-400">
                <p className="text-5xl font-bold">Σύνδεση</p>

                <div className="w-1/4  mt-20 ">
                    <p className="text-xl ml-1 font-medium ">Email</p>
                    <input  type="text" 
                            className="w-full h-10 border-2 border-gray-300 rounded-md pl-2 mt-1 bg-stone-100"
                            placeholder="johndoe@gmail.com"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                </div>
                
                <div className="w-1/4  mt-5 ">
                    <p className="text-xl ml-1 font-medium ">Κωδικός Πρόσβασης</p>
                    
                    <div className="w-full flex  items-center justify-center">
                        <input  type={passwordVisibility ? "text" : "password"}
                                className="w-full h-10 border-l-2 border-y-2 rounded-l-md pl-2 mt-1 border-gray-300 bg-stone-100"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                        <button onClick={toggleVisibility} className="w-7  rounded-r-md border-2 border-gray-300 h-10 mt-1 bg-stone-100 flex items-center justify-center">
                            {!passwordVisibility ? <FaEye/> : <FaEyeSlash/>}
                        </button>

                    </div>
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

                
                <button onClick={()=>handleLogin({email,password})} className="bg-pink-600 h-10 w-22  ml-60 flex items-center font-medium text-white rounded-md px-3 py-1 mt-5">Σύνδεση</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Login;