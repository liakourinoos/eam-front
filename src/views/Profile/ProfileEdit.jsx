import { MdAddPhotoAlternate } from "react-icons/md";
// import PropTypes from 'prop-types';
import {UserContext} from '../../customHooks.jsx'
import {useContext} from 'react'
function ParentProfileEdit(){

    //get user info
    const { userData, setUserData } = useContext(UserContext);

    const handleBioChange = (e) => {
        setUserData({ ...userData, bio: e.target.value });
    };

    return(
        <div className="w-full h-full  oveflow-y-auto flex gap-5 py-10 flex-col items-center">

            <p className="text-3xl font-bold ">Το Προφίλ Μου</p>
            <div className='flex flex-col items-center gap-2 relative '>
                <img id="pfp" src={"https://i.pinimg.com/236x/31/eb/97/31eb9767cb1e55594bfcae11c9fe1967.jpg"} className='size-36 border-2 object-cover rounded-full' ></img>
                <input className='text-xs w-4/5 border-2 hidden '
                    // onChange={handleMediaChange} 
                    type="file"
                    // ref={fileInputRef} 
                    accept="image/*"
                ></input>   
                <div    
                //    onClick={handleDivClick} 
                        className={`absolute inset-0 flex items-center text-2xl justify-center cursor-pointer text-white 
                                    bg-black bg-opacity-70 opacity-30 hover:opacity-100 rounded-full`}
                >
                    <MdAddPhotoAlternate/>
                </div> 
            </div>

            {/* fields that cannot be modified for name,surname etc */}
            <div className="w-1/2 px-auto h-1/2  flex flex-col  items-center"> 
                <div >
                    <p className="font-medium">Όνομα</p>
                    <input  disabled className="bg-gray-300 w-full h-10 font-medium rounded-md border-2 border-gray-500 px-1 "
                            value={userData?.name}
                            title="Τα συμπληρωμένα στοιχεία αντλήθηκαν από την ιστοσελίδα του gov.gr"
                    ></input>
                </div>
            </div>

            <div className="w-1/2 px-auto h-1/2 flex flex-col  items-center"> 
                <div >
                    <p className="font-medium">Επίθετο</p>
                    <input  disabled className="bg-gray-300 w-full h-10 font-medium rounded-md border-2 border-gray-500 px-1"
                            value={userData?.surname}
                            title="Τα συμπληρωμένα στοιχεία αντλήθηκαν από την ιστοσελίδα του gov.gr"

                    ></input>
                </div>
            </div>

            <div className="w-1/2 px-auto h-1/2  flex flex-col  items-center"> 
                <div >
                    <p className="font-medium">ΑΜΚΑ</p>
                    <input  disabled className="bg-gray-300 w-full h-10 font-medium rounded-md border-2 border-gray-500 px-1"
                            value={userData?.AMKA}
                            title="Τα συμπληρωμένα στοιχεία αντλήθηκαν από την ιστοσελίδα του gov.gr"

                    ></input>
                </div>
            </div>

            <div className="w-1/2 px-auto h-1/2  flex flex-col  items-center"> 
                <div >
                    <p className="font-medium">Φύλο</p>
                    <input  disabled className="bg-gray-300 w-full h-10 font-medium rounded-md border-2 border-gray-500 px-1"
                            value={userData?.gender}
                            title="Τα συμπληρωμένα στοιχεία αντλήθηκαν από την ιστοσελίδα του gov.gr"

                    ></input>
                </div>
            </div>


            <label className="form-control  w-1/3" >
                <div className="label ml-1">
                    <span className="label-text font-medium">Σύντομο Βιογραφικό</span>
                </div>
                <textarea   
                            className="textarea bg-gray-100  textarea-bordered h-24 w-full px-1 resize-none border-2 border-gray-700 rounded-md"
                            value={userData?.bio}
                            onChange={handleBioChange}
                />
            </label>

        </div>
    );
}

export default ParentProfileEdit;

// ParentProfileEdit.propTypes= {
//     userData:PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         surname: PropTypes.string.isRequired,
//         AMKA: PropTypes.string.isRequired,
//         gender: PropTypes.isRequired, // or more values if needed
//         role: PropTypes.string.isRequired,
//     })
//   };