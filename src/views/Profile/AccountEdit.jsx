import { useState,useEffect } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa6";
import {useAuth } from "../../customHooks"
import { updateSkype,updateNumber,updateUserEmail,updateUserPassword} from "../../FetchFunctions";
import { useMutation } from "@tanstack/react-query";

function AccountEdit(){

    const {userData, loading,refetch} = useAuth();

    const [newEmail,setNewEmail] = useState("");
    const [repeatNewEmail,setRepeatNewEmail] = useState("")
    const [emailMessage,setEmailMessage] = useState("aasda")
    const [number,setNumber] = useState("");
    const [skype,setSkype] = useState("");
    const [password,setPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [repeatNewPassword,setRepeatNewPassword] = useState("");
    const [passwordMessage,setPasswordMessage] = useState("")

    const [passwordVisibility1,setPasswordVisibility1] = useState(false);
    const toggleVisibility1 =()=> setPasswordVisibility1(pV => !pV);
    const [passwordVisibility2,setPasswordVisibility2] = useState(false);
    const toggleVisibility2 =()=> setPasswordVisibility2(pV => !pV);
    const [passwordVisibility3,setPasswordVisibility3] = useState(false);
    const toggleVisibility3 =()=> setPasswordVisibility3(pV => !pV);



    useEffect(() => {   
        if(userData && !loading){
            setNumber(userData?.number || "");
            console.log(userData)
            setSkype(userData?.skype || "");
        }
    }, [userData]);


    useEffect(() => {
        validateEmails();
    }, [newEmail, repeatNewEmail]);
    

    const validateEmails = () => {
        if (newEmail !=repeatNewEmail && newEmail.length != 0 && repeatNewEmail.length != 0) {
            setEmailMessage("Οι διευθύνσεις email πρέπει να ταυτίζονται.");
        }
        else if (newEmail == userData?.email) {
            setEmailMessage("Δεν επιτρέπεται η χρήση του ίδιου email ως νέο.");
        }
        else {
            setEmailMessage("");
        }
    };


    const validatePasswords =()=>{
        if(newPassword!== repeatNewPassword && newPassword.length!==0 && repeatNewPassword.length!==0){
            setPasswordMessage("Οι κωδικοί πρέπει να ταυτίζονται.");
        }
        else if(newPassword == userData?.password && newPassword===repeatNewPassword){
            setPasswordMessage("Δεν επιτρέπεται η χρήση του ίδιου κωδικού ως νέο.")
        }
        else if(password.length===0 && newPassword.length>0 && repeatNewPassword.length>0){
            setPasswordMessage("Παρακαλώ συμπληρώστε τον τρέχων κωδικό σας.")
        }
        else {
            setPasswordMessage("")
        }
    }

    useEffect(()=>{
        validatePasswords();
    },[password,newPassword,repeatNewPassword])


    const [numberMessage,setNumberMessage]=useState("")
    useEffect(()=>{
        const regex = /^\d+$/; //contains only digits
        if(number.length!==10){
            setNumberMessage("Ο αριθμός τηλεφώνου πρέπει να περιέχει 10 ψηφία.")

        }
        else if(!regex.test(number)){
            setNumberMessage("Ο αριθμός τηλεφώνου πρέπει να περιέχει μόνο ψηφία.")
        }
        else if(number===userData?.number){
            setNumberMessage("Δεν χρειάζεται ενημέρωση με τον ίδιο αριθμό τηλεφώνου.")
        }
        else{
            setNumberMessage("")
        }
    },[number])

    const[skypeMessage,setSkypeMessage]= useState("")

    useEffect(()=>{
        const regex = /^[A-Za-z0-9_]+$/; //only contain a-z, 0-9 and "_"
        if(skype===userData?.skype || skype.length>0){
            setSkypeMessage("")
        }
        else if(!regex.test(skype) && skype.length>0){
            setSkypeMessage("H διεύθυνση Skype πρέπει να περιέχει μόνο χαρακτήρες a-z,A-Z,0-9 και \"_\".")
        }
        else if((regex.test(skype) && skype.length>0) ||skype.length===0){
            setSkypeMessage("")
        }
        

    
    },[skype])

    const {mutateAsync:changeEmail,isPending:isEmailPending} = useMutation({
        mutationFn:() => updateUserEmail(userData?.password, newEmail),
        onSuccess:()=>{
            console.log("Email updated successfully")
            refetch(); // Use the captured refetch function
        },
        onError:(error)=>{
            setEmailMessage(error.message)
        }
    });

    const {mutateAsync:changePassword,isPending:isPasswordPending} = useMutation({
        mutationFn:() => updateUserPassword(userData?.password, newPassword),
        onSuccess:()=>{
            console.log("password updated successfully")
            refetch(); // Use the captured refetch function
        },
        onError:(error)=>{
            setPasswordMessage(error.message)
        }
    });


    const {mutateAsync:changeNumber,isPending:isNumberPending} = useMutation({
        mutationFn:() => updateNumber(userData?.id, number),
        onSuccess:()=>{
            console.log("Bio updated successfully")
            refetch(); // Use the captured refetch function
        
        }
    });

    const {mutateAsync:changeSkype,isPending:isSkypePending} = useMutation({
        mutationFn:() => updateSkype(userData?.id, skype),
        onSuccess:()=>{
            console.log("Bio updated successfully")
            refetch(); // Use the captured refetch function
        
        }
    });




    if(loading) 
        return(
            <div className="w-full h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )

    if(!loading && userData)
        return(
            <div className="w-full  bg-white gap-5 py-10 flex flex-col items-center ">
                <p className="text-3xl mb-8 font-bold ">Στοιχεία Λογαριασμού</p>
                {/* email change div */}
                <div className="w-2/3 flex flex-col ">
                    <p className="underline text-2xl font-medium">Αλλαγή email</p>
                    <div className="ml-5 w-full mt-8 flex flex-col gap-5 font-medium text-lg">

                            <div className="w-full flex">
                                <p className="w-1/6">Τρέχον Εmail:</p> 
                                <p className="w-1/3 ml-5 ">{userData?.email} </p>
                            </div>                    
                            <div className="w-full flex">
                                <p className="w-1/6">Νέο Εmail:</p> 
                                <input  className="w-1/3 ml-5 h-10 border-2 bg-white border-gray-500 rounded-md px-1"
                                        value={newEmail}
                                        onChange={(e)=>setNewEmail(e.target.value) }
                                />
                            </div>

                        <div className="w-full flex">
                            <p className="w-1/6">Επανάληψη Nέου email:</p> 
                            <input  className="w-1/3 ml-5 h-10 border-2 bg-white border-gray-500 rounded-md px-1"
                                    value={repeatNewEmail}
                                    onChange={(e)=>setRepeatNewEmail(e.target.value) }
                            />
                        </div>
                        
                        {emailMessage.length>0 && <p className="mt-5 -mb-10 text-red-500 ">{emailMessage}</p>}
                    </div>

                    <div className="w-2/3 font-medium  mt-10 flex justify-end items-center gap-4 px-3  h-16">
                        <button className={` border-2 border-gray-500 rounded-md p-2  "bg-gray-400" 'bg-white' `}
                                onClick={()=>{setNewEmail(""); setRepeatNewEmail("")}}
                        >
                            Καθαρισμός
                        </button>

                        <button className={` border-2 border-gray-500 rounded-md p-2 ${emailMessage.length>0 || ( newEmail.length===0 || repeatNewEmail.length===0 )? "bg-gray-400" : 'bg-pallete-400' }`}
                                disabled={emailMessage.length>0 || (newEmail.length===0 || repeatNewEmail.length===0)}
                                onClick={ ()=>  changeEmail()}
                        >Ενημέρωση</button>
                    </div>

                </div>
                    
                {/* password change div */}
                <div className="w-2/3 mt-10 flex flex-col  ">
                    <p className="underline text-2xl font-medium">Αλλαγή κωδικού πρόσβασης</p>
                    <div className="ml-5 w-full mt-8 flex flex-col gap-5 font-medium text-lg">

                        <div className="w-full flex items-center">
                            <p className="w-1/6 ">Τρέχων κωδικός:</p> 
                            <div className="w-1/3 h-10 flex ml-5 items-center justify-center">
                                <input  type={passwordVisibility1 ? "text" : "password"}
                                        className="w-full h-full border-l-2 border-y-2 rounded-l-md pl-2  border-gray-500 bg-white"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        />
                                <button onClick={toggleVisibility1} className="w-7  rounded-r-md border-2 border-gray-500 h-full  bg-white flex items-center justify-center">
                                    {!passwordVisibility1 ? <FaEye/> : <FaEyeSlash/>}
                                </button>

                            </div>
                        </div>

                        <div className="w-full flex">
                            <p className="w-1/6">Nέος κωδικός:</p> 
                            <div className="w-1/3 h-10 flex ml-5 items-center justify-center">
                                <input  type={passwordVisibility2 ? "text" : "password"}
                                        className="w-full h-full border-l-2 border-y-2 rounded-l-md pl-2  border-gray-500 bg-white"
                                        value={newPassword}
                                        onChange={(e)=>setNewPassword(e.target.value)}
                                        />
                                <button onClick={toggleVisibility2} className="w-7  rounded-r-md border-2 border-gray-500 h-full  bg-white flex items-center justify-center">
                                    {!passwordVisibility2 ? <FaEye/> : <FaEyeSlash/>}
                                </button>

                            </div>
                        </div>

                        <div className="w-full flex items-center">
                            <p className="w-1/6 ">Επανάληψη Nέου κωδικού:</p> 
                            <div className="w-1/3 h-10 flex ml-5 items-center justify-center">
                                    <input  type={passwordVisibility3 ? "text" : "password"}
                                            className="w-full h-full border-l-2 border-y-2 rounded-l-md pl-2  border-gray-500 bg-white"
                                            value={repeatNewPassword}
                                            onChange={(e)=>setRepeatNewPassword(e.target.value)}
                                            />
                                    <button onClick={toggleVisibility3} className="w-7  rounded-r-md border-2 border-gray-500 h-full  bg-white flex items-center justify-center">
                                        {!passwordVisibility3 ? <FaEye/> : <FaEyeSlash/>}
                                    </button>

                            </div>
                        </div>
                        
                        {passwordMessage.length >0 && <p className="font-medium mt-10 -mb-10 text-red-500 ">{passwordMessage}</p>}
                    </div>

                    <div className="w-2/3 font-medium mt-10 flex gap-3 justify-end items-center px-3  h-16">
                        <button className={` border-2 border-gray-500 rounded-md p-2  "bg-gray-400" 'bg-white' `}
                                onClick={()=>{setPassword(""); setNewPassword("");  setRepeatNewPassword("")}}
                        >
                            Καθαρισμός
                        </button>

                        <button className={` border-2 border-gray-500 rounded-md p-2 ${passwordMessage.length>0 || password.length===0 || newPassword.length===0 || repeatNewPassword.length===0 ? "bg-gray-400" : 'bg-pallete-400' }`}
                                disabled={passwordMessage.length>0 || password.length===0 || (newPassword.length===0 || repeatNewPassword.length===0)}
                                onClick={ ()=>  changePassword()}
                        >
                            Ενημέρωση
                        </button>
                    </div>
                </div>

                {/* number change div */}
                <div className="w-2/3 mt-20 flex flex-col font-medium   ">
                    <p className="underline text-2xl font-medium">Αλλαγή Τηλεφώνου</p>

                    <input  className="w-1/6 pl-2 ml-5 text-xl h-10 bg-white border-2 border-gray-500 rounded-md mt-5"
                            value={number}
                            onChange={(e)=>setNumber(e.target.value)}
                    />
                    {numberMessage.length>0 && <p className="font-medium mt-10 -mb-10 text-red-500 ">{numberMessage}</p>}
                    <div className="w-2/3  mt-10 flex gap-3 justify-end items-center px-3  h-16">
                        <button className={` ${numberMessage.length>0 ? 'bg-gray-400' : 'bg-white'} border-2 border-gray-500 rounded-md p-2 `}
                                disabled={numberMessage.length>0 }
                                onClick={ ()=>  changeNumber()}
                        >
                            Ενημέρωση
                        </button>
                    </div>

                </div>

                {/* skype change div */}
                <div className="w-2/3 mt-14 flex flex-col font-medium   ">
                    <p className="underline text-2xl font-medium">Αλλαγή Διεύθυνσης Skype</p>

                    <input  className="w-1/6 pl-2 ml-5 text-xl h-10 bg-white border-2 border-gray-500 rounded-md mt-5"
                            value={skype}
                            onChange={(e)=>setSkype(e.target.value)}
                    />
                    
                    {skypeMessage.length>0 && <p className="font-medium mt-10 -mb-10 text-red-500 ">{skypeMessage}</p>}

                    <div className="w-2/3  mt-10 flex gap-3 justify-end items-center px-3  h-16">
                        <button className={` ${skypeMessage.length>0 || skype.length===0 || skype===userData?.skype ? 'bg-gray-400' : 'bg-white'} flex items-center justify-center h-12 w-28 border-2 border-gray-500 rounded-md p-2 `}
                                disabled={skypeMessage.length>0 || skype.length===0 || skype===userData?.skype}
                                onClick={ ()=>  changeSkype()}
                        >
                            {isSkypePending ? <span className="loading loading-sm  text-black"></span>  : "Ενημέρωση"}
                        </button>
                    </div>
                </div>


    

            </div>
        );

}

export default AccountEdit;
