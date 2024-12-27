import { useState,useEffect } from "react";
import PropTypes from 'prop-types';
import { FaEye,FaEyeSlash } from "react-icons/fa6";
import {useAuth } from "../../customHooks"
function AccountEdit(){

    const {userData, loading,refetch} = useAuth();

    const [newEmail,setNewEmail] = useState("");
    const [repeatNewEmail,setRepeatNewEmail] = useState("")
    const [emailMessage,setEmailMessage] = useState(undefined)
    const [number,setNumber] = useState("");
    const [skype,setSkype] = useState("");
    const [password,setPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [repeatNewPassword,setRepeatNewPassword] = useState("");

    const [passwordVisibility1,setPasswordVisibility1] = useState(false);
    const toggleVisibility1 =()=> setPasswordVisibility1(pV => !pV);
    const [passwordVisibility2,setPasswordVisibility2] = useState(false);
    const toggleVisibility2 =()=> setPasswordVisibility2(pV => !pV);
    const [passwordVisibility3,setPasswordVisibility3] = useState(false);
    const toggleVisibility3 =()=> setPasswordVisibility3(pV => !pV);



    useEffect(() => {   
        if(userData && !loading){
            setNumber(userData?.number || "");
            // console.log(userData)
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
        else setEmailMessage(undefined);
    };

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
                <div className="w-2/3 flex flex-col  ">
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
                            <p className="w-1/6">Επανάληψη νέου email:</p> 
                            <input  className="w-1/3 ml-5 h-10 border-2 bg-white border-gray-500 rounded-md px-1"
                                    value={repeatNewEmail}
                                    onChange={(e)=>setRepeatNewEmail(e.target.value) }
                            />
                        </div>
                        
                        {emailMessage && <p className="mt-5 -mb-16 text-red-500 ">{emailMessage}</p>}
                    </div>
                </div>

                {/* password change div */}
                <div className="w-2/3 mt-20 flex flex-col  ">
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
                            <p className="w-1/6 ">Επανάληψη νέου κωδικού:</p> 
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
                        

                    </div>
                </div>

                {/* number change div */}
                <div className="w-2/3 mt-20 flex flex-col font-medium   ">
                    <p className="underline text-2xl font-medium">Αλλαγή Τηλεφώνου</p>

                    <input  className="w-1/6 pl-2 ml-5 text-xl h-10 bg-white border-2 border-gray-500 rounded-md mt-5"
                            value={number}
                            onChange={(e)=>setNumber(e.target.value)}
                    />
                </div>

                {/* skype change div */}
                <div className="w-2/3 mt-14 flex flex-col font-medium   ">
                    <p className="underline text-2xl font-medium">Αλλαγή Διεύθυνσης Skype</p>

                    <input  className="w-1/6 pl-2 ml-5 text-xl h-10 bg-white border-2 border-gray-500 rounded-md mt-5"
                            value={skype}
                            onChange={(e)=>setSkype(e.target.value)}
                    />
                </div>


                {/* save/discard buttons */}
                <div className="w-full flex justify-end items-center mr-52 gap-5 ">

                <button className="h-10 rounded-md bg-white border-2 border-gray-500 p-3 text-center flex items-center font-medium text-lg">
                        Ακύρωση
                    </button>

                    <button className="h-10 rounded-md bg-pallete-400  p-3 text-center flex items-center font-medium text-lg">
                        Αποθήκευση
                    </button>

                </div>

            </div>
        );

}

export default AccountEdit;
