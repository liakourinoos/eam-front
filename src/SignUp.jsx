import Footer from "./generic components/Footer";
import  { Link ,useNavigate} from "react-router-dom";
import Header from "./generic components/Header";
import { useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useEffect } from "react";
import { registerUser } from "./FetchFunctions";
import { useMutation } from "@tanstack/react-query";
import { greekFemaleNames,greekFemaleSurnames,greekMaleNames,greekMaleSurnames } from "../global_assets/global_values";
import PropTypes from 'prop-types';

SignUp.propTypes={
    role:PropTypes.bool.isRequired
}


function SignUp({role}){
    const nav=useNavigate();
    
    const [signUpMessage,setSignUpMessage] = useState("")

    const [SignUpData, setSignUpData] = useState({
        email:"",
        password:"",
        number:"",
        bio:"",
        name:"",
        surname:"",
        gender:"",
        role:role,
        newUser:true,
        img:"https://us-tuna-sounds-images.voicemod.net/9508b716-9458-4d69-9508-54c06cc48caa-1728958336005.jpeg",
        availabilityMatrix:[],
        skills:[],
        rating:0,
        ratingCount:0,
        experience:0


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
                bio:"",
                name:"",
                surname:"",
                gender:"",
                role:role,
                newUser:true,
                img:"https://us-tuna-sounds-images.voicemod.net/9508b716-9458-4d69-9508-54c06cc48caa-1728958336005.jpeg",
                availabilityMatrix:[],
                skills:[],
                rating:0,
                ratingCount:0,
                experience:0

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

    useEffect(() => {
        const FemaleNameIdx = Math.floor(Math.random() * greekFemaleNames.length);
        const FemaleSurnameIdx = Math.floor(Math.random() * greekFemaleSurnames.length);
        const MaleNameIdx = Math.floor(Math.random() * greekMaleNames.length);
        const MaleSurnameIdx = Math.floor(Math.random() * greekMaleSurnames.length);
    
        if (SignUpData.gender === true) { // Male gender
            setSignUpData((prevData) => ({
                ...prevData,
                name: greekMaleNames[MaleNameIdx],
                surname: greekMaleSurnames[MaleSurnameIdx],
            }));
            console.log("Male name and surname set:", greekMaleNames[MaleNameIdx], greekMaleSurnames[MaleSurnameIdx]);
        } else if (SignUpData.gender === false) { // Female gender
            setSignUpData((prevData) => ({
                ...prevData,
                name: greekFemaleNames[FemaleNameIdx],
                surname: greekFemaleSurnames[FemaleSurnameIdx],
            }));
            console.log("Female name and surname set:", greekFemaleNames[FemaleNameIdx], greekFemaleSurnames[FemaleSurnameIdx]);
        }
    }, [SignUpData.gender]); // Dependency remains SignUpData.gender
    


    const [numberError,setNumberError]= useState("")
    // input check for number
    useEffect(()=>{
        const isValidNumber = /^\d{10}$/.test(SignUpData.number);
        if (!isValidNumber && SignUpData.number.length > 0) {
            setNumberError("Ο αριθμός τηλεφώνου πρέπει να αποτελείται από 10 ψηφία.");
        } else {
            setNumberError("");
        }
    },[SignUpData.number])


    const [emailError, setEmailError] = useState("");

    useEffect(() => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SignUpData.email);
        if (!isValidEmail && SignUpData.email.length > 0) {
            setEmailError("Το email δεν έχει έγκυρη μορφή.");
        } else {
            setEmailError("");
        }
    }, [SignUpData.email]);

    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_]{6,}$/.test(SignUpData.password);
        const containsOnlyDigitsAndUnderscore = /^[\d_]+$/.test(SignUpData.password);
        
        if (containsOnlyDigitsAndUnderscore && SignUpData.password.length > 0) {
            setPasswordError("Ο κωδικός πρέπει να περιέχει τουλάχιστον έναν λατινικό χαρακτήρα.");
        } else if (!isValidPassword && SignUpData.password.length > 0) {
            setPasswordError("Ο κωδικός πρέπει να αποτελείται από τουλάχιστον 6 χαρακτήρες και να περιέχει μόνο λατινικούς χαρακτήρες, ψηφία και το σύμβολο '_'.");
        } else {
            setPasswordError("");
        }
    }, [SignUpData.password]);


    const isFormValid = () => {
        return (
            repeatPassword.length > 0 &&
            SignUpData.email.length > 0 &&
            emailError === "" &&
            SignUpData.number.length > 0 &&
            numberError === "" &&
            SignUpData.password.length > 0 &&
            matchingPasswords &&
            SignUpData.gender !== "" &&
            SignUpData.password.length > 6 &&
            passwordError===""
        );
    };

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
                        {emailError.length>0 && <p className="text-red-700 my-2 font-medium text-sm ">{emailError}</p>}
                        <input  type="text" 
                                className={`w-full h-10 border-2 bg-white rounded-md pl-2 mt-1 ${emailError.length ===0? 'border-gray-300': 'border-red-700'  }`}
                                placeholder="johndoe@gmail.com"
                                value={SignUpData.email}
                                onChange={(e)=>setSignUpData({...SignUpData,email:e.target.value})}
                                />
                    </div>
                    
                    <div className="w-1/4  mt-5 ">
                        <p className="text-xl ml-1 font-medium ">Κωδικός Πρόσβασης</p>
                        {passwordError.length>0 && <p className="text-red-700 my-2 font-medium text-sm ">{passwordError}</p>}
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
                        {numberError.length>0 && <p className="text-red-700 my-2 font-medium text-sm ">{numberError}</p>}
                        <input  type="tel" 
                                className={`w-full h-10 border-2 bg-white rounded-md pl-2 mt-1 ${numberError.length>0 ? 'border-red-700' : 'border-gray-300'}`}
                                value={SignUpData.number}
                                onChange={(e)=>setSignUpData({...SignUpData,number:e.target.value})}
                                />
                        
                    
                    </div>

                    <div className="w-1/4  mt-5 flex flex-col gap-2 text-lg  ">
                        <p className="text-xl ml-1 font-medium ">Φύλο</p>
                        {/* <select className="w-full h-10 border-2 bg-white rounded-md pl-2 mt-1"
                                value={SignUpData.gender}
                                onChange={(e)=>setSignUpData({...SignUpData, gender: e.target.value === "true" ? true : e.target.value === "false" ? false : "" })}
                        >
                            <option value={""} disabled> Επιλέξτε</option>
                            <option value={true}>Αρσενικό</option>
                            <option value={false}>Θηλυκό</option>




                        </select> */}
                        <div className="flex gap-2 items-center">
                            <input type="radio" checked={SignUpData.gender===true} className="radio radio-secondary" onChange={()=>setSignUpData({...SignUpData,gender:true})}/>    
                            <p>Αρσενικό</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="radio" checked={SignUpData.gender===false} className="radio radio-secondary" onChange={()=>{ console.log("Changed gender!"); setSignUpData({...SignUpData,gender:false})}}/>                        
                            <p>Θηλυκό</p>
                        </div>
                    
                    
                    </div>



                    

                    <span className="mt-10 mr-20 ">
                        Έχετε ήδη εγγραφτεί;
                        <Link to='/login'>
                            <span className="underline font-medium ml-2" >Σύνδεση{" >"}</span>
                        </Link>
                    </span>

                    <div className="w-full flex justify-end px-32 mt-3">

                    
                        <button     className={`h-10 w-36  flex items-center justify-center text-xl font-medium text-white rounded-md px-3 py-1 mt-10 ${!isFormValid() ? 'bg-gray-400 ' : 'bg-pink-600'}`}
                                    disabled={isFormValid()===false}
                                    onClick={()=>{ createUser();}}
                                    title={!isFormValid() ? "Παρακαλούμε συμπληρώστε όλα τα πεδία." : ""}
                        >
                            {isPending ? <span className="loading loading-spinner loading-md "/> :'Εγγραφή'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}


export default SignUp;