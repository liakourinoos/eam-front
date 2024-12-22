import Footer from "./generic components/Footer";
import  { Link ,useNavigate} from "react-router-dom";
import Header from "./generic components/Header";
import { useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useEffect } from "react";
function SignUp(){
    const nav=useNavigate();
    const [SignUpData, setSignUpData] = useState({
        email:"",
        password:"",
        repeatPassword:"",
        number:""
    });

    const [passwordVisibility1,setPasswordVisibility1] = useState(false);
    const toggleVisibility1 =()=> setPasswordVisibility1(pV => !pV);

    const [passwordVisibility2,setPasswordVisibility2] = useState(false);
    const toggleVisibility2 =()=> setPasswordVisibility2(pV => !pV);

    const [matchingPasswords,setMatchingPasswords]= useState(true);

    useEffect(()=>{
        if (SignUpData.repeatPassword.length === 0) {
            setMatchingPasswords(true);
        } else {
            setMatchingPasswords(SignUpData.password === SignUpData.repeatPassword && SignUpData.password.length > 0);
        }
    },[SignUpData.password,SignUpData.repeatPassword])


    const handleSignUp =({email,password,number})=>{
        // do some things
        nav(-1 )
    }

    return(
        <div className="w-full h-full flex flex-col  justify-between bg-pink-100 ">
            <Header/>
            <div className="w-full flex-grow flex flex-col  items-center py-20 ">
                <div className="w-2/3 flex-grow rounded-md flex flex-col p-20 items-center bg-fuchsia-200 shadow-lg shadow-gray-400">
                    <p className="text-5xl font-bold">Εγγραφή</p>

                    <div className="w-1/4  mt-20 ">
                        <p className="text-xl ml-1 font-medium ">Email</p>
                        <input  type="text" 
                                className="w-full h-10 border-2 bg-white rounded-md pl-2 mt-1"
                                placeholder="johndoe@gmail.com"
                                value={SignUpData.email}
                                onChange={(e)=>setSignUpData({...SignUpData,email:e.target.value})}
                                />
                    </div>
                    
                    <div className="w-1/4  mt-5 ">
                        <p className="text-xl ml-1 font-medium ">Κωδικός Πρόσβασης</p>
                        <div className="w-full flex  items-center justify-center">
                            <input  type={passwordVisibility1 ? "text" : "password"}
                                    className="w-full h-10 border-l-2 border-y-2 rounded-l-md pl-2 mt-1 border-gray-300 bg-white"
                                    value={SignUpData.password}
                                    onChange={(e)=>setSignUpData({...SignUpData,password:e.target.value})}
                                    />
                            <button onClick={toggleVisibility1} className="w-7  rounded-r-md border-2 border-gray-300 h-10 mt-1 bg-white flex items-center justify-center">
                                {!passwordVisibility1 ? <FaEye/> : <FaEyeSlash/>}
                            </button>

                        </div>
                        
                    
                    </div>

                    <div className="w-1/4  mt-5 ">
                        <p className="text-xl ml-1  font-medium ">Επανάληψη Κωδικού Πρόσβασης</p>
                        {!matchingPasswords && <p className="text-red-700 my-2 font-medium text-sm ">Οι κωδικοί δεν ταιριάζουν!</p>}
                        <div className="w-full flex  items-center justify-center">
                            <input  type={passwordVisibility2 ? "text" : "password"}
                                    className={`w-full ${matchingPasswords? 'border-gray-300': 'border-red-700'  } h-10 border-l-2 border-y-2 rounded-l-md pl-2 mt-1  bg-white`}
                                    value={SignUpData.repeatPassword}
                                    onChange={(e)=>setSignUpData({...SignUpData,repeatPassword:e.target.value})}
                                    />
                            <button onClick={toggleVisibility2} className={`w-7 ${matchingPasswords? 'border-gray-300': 'border-red-700 text-red-700'  } rounded-r-md border-2 border-gray-300 h-10 mt-1 bg-white flex items-center justify-center`}>
                                {!passwordVisibility2 ? <FaEye/> : <FaEyeSlash/>}
                            </button>


                        </div>
                        
                    
                    </div>

                    <div className="w-1/4  mt-5 ">
                        <p className="text-xl ml-1 font-medium ">Τηλέφωνο</p>
                        <input  type="tel" 
                                className="w-full h-10 border-2 bg-white rounded-md pl-2 mt-1"
                                value={SignUpData.number}
                                onChange={(e)=>setSignUpData({...SignUpData,number:e.target.value})}
                                />
                        
                    
                    </div>

                    

                    <span className="mt-10 mr-20 ">
                        Έχετε ήδη εγγραφτεί;
                        <Link to='/login'>
                            <span className="underline font-medium ml-2" >Σύνδεση{" >"}</span>
                        </Link>
                    </span>

                    <div className="w-full flex justify-end px-32 mt-3">

                    
                        <button     className={`h-10 w-32  flex items-center justify-center text-xl font-medium text-white rounded-md px-3 py-1 mt-10 ${!(SignUpData.repeatPassword.length > 0 && SignUpData.email.length>0 && SignUpData.number.length>0 && SignUpData.password.length > 0 && matchingPasswords) ? 'bg-gray-400 ' : 'bg-pink-600'}`}
                                    disabled={!(SignUpData.repeatPassword.length > 0 && SignUpData.email.length>0 && SignUpData.number.length>0 && SignUpData.password.length > 0 && matchingPasswords)}
                                    onClick={()=>handleSignUp(SignUpData)}
                                    title={`${!(SignUpData.repeatPassword.length > 0 && SignUpData.email.length>0 && SignUpData.number.length>0 && SignUpData.password.length > 0 && matchingPasswords) ? "Παρακαλούμε συμπληρώστε όλα τα πεδία." : ""} `}
                        >
                            Εγγραφή
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}


export default SignUp;