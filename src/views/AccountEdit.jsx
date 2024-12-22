import { useState } from "react";
import PropTypes from 'prop-types';
import { FaEye,FaEyeSlash } from "react-icons/fa6";
function AccountEdit({email, number, skype}){

    const [passwordVisibility,setPasswordVisibility] = useState(false);
    const toggleVisibility =()=> setPasswordVisibility(pV => !pV);

    return(
        <div className="w-full  bg-white gap-5 py-10 flex flex-col items-center ">
            <p className="text-3xl mb-8 font-bold ">Στοιχεία Λογαριασμού</p>
            {/* email change div */}
            <div className="w-2/3 flex flex-col  ">
                <p className="underline text-2xl font-medium">Αλλαγή email</p>
                <div className="ml-5 w-full mt-8 flex flex-col gap-5 font-medium text-lg">

                        <div className="w-full flex">
                            <p className="w-1/6">Τρέχον Εmail:</p> 
                            <p className="w-1/3 ml-5 ">{email} </p>
                        </div>                    
                        <div className="w-full flex">
                            <p className="w-1/6">Νέο Εmail:</p> 
                            <input  className="w-1/3 ml-5 h-10 border-2 bg-white border-gray-500 rounded-md px-1"/>
                        </div>

                    <div className="w-full flex">
                        <p className="w-1/6">Επανάληψη νέου email:</p> 
                        <input  className="w-1/3 ml-5 h-10 border-2 bg-white border-gray-500 rounded-md px-1"
                        />
                    </div>
                    

                </div>
            </div>

            {/* password change div */}
            <div className="w-2/3 mt-20 flex flex-col  ">
                <p className="underline text-2xl font-medium">Αλλαγή κωδικού πρόσβασης</p>
                <div className="ml-5 w-full mt-8 flex flex-col gap-5 font-medium text-lg">

                    <div className="w-full flex items-center">
                        <p className="w-1/6 ">Τρέχων κωδικός:</p> 
                        <div className="w-1/3 h-10 flex ml-5 items-center justify-center">
                            <input  type={passwordVisibility ? "text" : "password"}
                                    className="w-full h-full border-l-2 border-y-2 rounded-l-md pl-2  border-gray-500 bg-white"
                                    // value={password}
                                    // onChange={(e)=>setPassword(e.target.value)}
                                    />
                            <button onClick={toggleVisibility} className="w-7  rounded-r-md border-2 border-gray-500 h-full  bg-white flex items-center justify-center">
                                {!passwordVisibility ? <FaEye/> : <FaEyeSlash/>}
                            </button>

                        </div>
                    </div>

                    <div className="w-full flex">
                        <p className="w-1/6">Nέος κωδικός:</p> 
                        <div className="w-1/3 h-10 flex ml-5 items-center justify-center">
                            <input  type={passwordVisibility ? "text" : "password"}
                                    className="w-full h-full border-l-2 border-y-2 rounded-l-md pl-2  border-gray-500 bg-white"
                                    // value={password}
                                    // onChange={(e)=>setPassword(e.target.value)}
                                    />
                            <button onClick={toggleVisibility} className="w-7  rounded-r-md border-2 border-gray-500 h-full  bg-white flex items-center justify-center">
                                {!passwordVisibility ? <FaEye/> : <FaEyeSlash/>}
                            </button>

                        </div>
                    </div>

                    <div className="w-full flex items-center">
                        <p className="w-1/6 ">Επανάληψη νέου κωδικού:</p> 
                        <div className="w-1/3 h-10 flex ml-5 items-center justify-center">
                                <input  type={passwordVisibility ? "text" : "password"}
                                        className="w-full h-full border-l-2 border-y-2 rounded-l-md pl-2  border-gray-500 bg-white"
                                        // value={password}
                                        // onChange={(e)=>setPassword(e.target.value)}
                                        />
                                <button onClick={toggleVisibility} className="w-7  rounded-r-md border-2 border-gray-500 h-full  bg-white flex items-center justify-center">
                                    {!passwordVisibility ? <FaEye/> : <FaEyeSlash/>}
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
                />
            </div>

            {/* skype change div */}
            <div className="w-2/3 mt-14 flex flex-col font-medium   ">
                <p className="underline text-2xl font-medium">Αλλαγή Διεύθυνσης Skype</p>

                <input  className="w-1/6 pl-2 ml-5 text-xl h-10 bg-white border-2 border-gray-500 rounded-md mt-5"
                        value={skype}
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

AccountEdit.propTypes = {
    email: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    skype: PropTypes.string.isRequired,
};