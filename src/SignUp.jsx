import Footer from "./generic components/Footer";
import  { Link ,useNavigate} from "react-router-dom";
import Header from "./generic components/Header";
import { useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useEffect } from "react";
import { registerUser } from "./FetchFunctions";
import { useMutation } from "@tanstack/react-query";

function SignUp(){
    const nav=useNavigate();
    
    const [signUpMessage,setSignUpMessage] = useState("")

    const [SignUpData, setSignUpData] = useState({
        email:"",
        password:"",
        number:"",
        AMKA:"12345678910",
        bio:"added from function",
        name:"Ntanta",
        surname:"Kati",
        gender:false,
        role:false,
        newUser:true,
        img:"https://us-tuna-sounds-images.voicemod.net/9508b716-9458-4d69-9508-54c06cc48caa-1728958336005.jpeg",
        availabilityMatrix:[
            {day:'ΔΕΥ',hour:"12:00"},
            {day:'ΤΡΙ',hour:"12:00"},
            {day:'ΤΕΤ',hour:"14:00"},
            {day:'ΠΕΜ',hour:"09:00"},
            {day:'ΠΑΡ',hour:"18:00"},
            {day:'ΣΑΒ',hour:"20:00"},
            {day:'ΚΥΡ',hour:"07:00"},
            {day:'ΤΡΙ',hour:"21:00"},
            {day:'ΔΕΥ',hour:"08:00"},
        ]

    });

    const duration = 3000;

    const [successMessage,setSuccessMessage] = useState(false)

    useEffect(()=>{
        if(successMessage){//make it appear for 3 seconds
            const timer = setTimeout(() => {
                setSuccessMessage(false); // Hide the alert after the duration
            }, duration);
            // Cleanup the timer on component unmount
            return () => clearTimeout(timer);
        }
    },[successMessage,duration] )

    const {mutateAsync:createUser,isPending,error} = useMutation({
        mutationFn:() => registerUser(SignUpData),
        onSuccess:()=>{
            console.log("Added User successfully")
            setSuccessMessage(true);
            setSignUpMessage("")
            setRepeatPassword("")
            //reset them
            setSignUpData({
                email:"",
                password:"",
                number:"",
                AMKA:"12345678910",
                bio:"added from function",
                name:"Kaggelos",
                surname:"Paulidis",
                gender:true,
                role:true,
                newUser:true,
                img:"https://us-tuna-sounds-images.voicemod.net/9508b716-9458-4d69-9508-54c06cc48caa-1728958336005.jpeg"
        
            })
        
        },
        onError:(error)=>{
            console.log(error.message)
            if(error.message==="Firebase: Error (auth/email-already-in-use).") setSignUpMessage("Το email χρησιμοποιείται ήδη.");
            else setSignUpMessage(error.message);
        }
    });

    const [repeatPassword,setRepeatPassword] = useState("")

    const [passwordVisibility1,setPasswordVisibility1] = useState(false);
    const toggleVisibility1 =()=> setPasswordVisibility1(pV => !pV);

    const [passwordVisibility2,setPasswordVisibility2] = useState(false);
    const toggleVisibility2 =()=> setPasswordVisibility2(pV => !pV);

    const [matchingPasswords,setMatchingPasswords]= useState(true);

    useEffect(()=>{
        if (repeatPassword.length === 0) {
            setMatchingPasswords(true);
        } else {
            setMatchingPasswords(SignUpData.password === repeatPassword && SignUpData.password.length > 0);
        }
    },[SignUpData.password,repeatPassword])



    return(
        <div className="w-full h-full flex flex-col  justify-between bg-pink-100 ">
           {successMessage && <div role="alert" className="alert alert-success fixed top-32 left-1/2 transform -translate-x-1/2 w-1/2 flex items-center justify-center  p-4 rounded shadow">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Η εγγραφή σας ολοκληρώθηκε!</span>
            </div>}


            <Header/>
            <div className="w-full flex-grow flex flex-col  items-center py-20 ">
                <div className="w-2/3 flex-grow rounded-md flex flex-col p-20 items-center bg-fuchsia-200 shadow-lg shadow-gray-400">
                    <p className="text-5xl font-bold">Εγγραφή</p>
                    {signUpMessage.length>0 && <p className="text-red-500 text-3xl font-medium -mb-10 mx-auto mt-10">{signUpMessage}</p>}

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
                                    value={repeatPassword}
                                    onChange={(e)=>setRepeatPassword(e.target.value)}
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

                    
                        <button     className={`h-10 w-32  flex items-center justify-center text-xl font-medium text-white rounded-md px-3 py-1 mt-10 ${!(repeatPassword.length > 0 && SignUpData.email.length>0 && SignUpData.number.length>0 && SignUpData.password.length > 0 && matchingPasswords) ? 'bg-gray-400 ' : 'bg-pink-600'}`}
                                    disabled={!(repeatPassword.length > 0 && SignUpData.email.length>0 && SignUpData.number.length>0 && SignUpData.password.length > 0 && matchingPasswords)}
                                    onClick={()=>createUser()}
                                    title={`${!(repeatPassword.length > 0 && SignUpData.email.length>0 && SignUpData.number.length>0 && SignUpData.password.length > 0 && matchingPasswords) ? "Παρακαλούμε συμπληρώστε όλα τα πεδία." : ""} `}
                        >
                            {isPending ? 'Pending...' :'Εγγραφή'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}


export default SignUp;