import { MdAddPhotoAlternate } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useAuth } from '../../customHooks.jsx'
import { useEffect, useState } from "react";
import { updateBio, updatePic, updateAge, updateExperience } from "../../FetchFunctions.jsx";
import { set } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";

ParentProfileEdit.propTypes = {
    setSuccessMessage: PropTypes.func.isRequired,
};

function ParentProfileEdit({ setSuccessMessage }) {
    const loc = useLocation();
    console.log(loc)
    const userType = loc.pathname
    console.log(userType)


    //get user info
    const { userData, loading, refetch } = useAuth();

    const [bio, setBio] = useState("");
    const [picChange, setPicChange] = useState(false);
    const [age, setAge] = useState(0);
    const [experience, setExperience] = useState(0)

    const [imgUrl, setImgUrl] = useState("")

    useEffect(() => {
        if (userData) {
            // console.log(userData);
            setBio(userData?.bio);
            setImgUrl(userData?.img);
            setAge(userData?.age);
            if (userType === "/nannysettings") {
                setExperience(userData?.experience);
            }
        }
    }, [userData]);

    const { mutateAsync: changeBio, isPending: isBioPending } = useMutation({
        mutationFn: () => updateBio(userData?.id, bio),
        onSuccess: () => {
            setSuccessMessage("Το βιογραφικό σας ενημερώθηκε επιτυχώς.");
            refetch(); // Use the captured refetch function

        }
    });

    const { mutateAsync: changePic, isPending: isImgPending } = useMutation({
        mutationFn: () => updatePic(userData?.id, imgUrl),
        onSuccess: () => {
            setSuccessMessage("Η φωτογραφία σας ενημερώθηκε επιτυχώς.");
            refetch(); // Use the captured refetch function
            setPicChange(false);
            setImgUrl("");

        }
    });

    const { mutateAsync: changeAge, isPending: isAgePending } = useMutation({
        mutationFn: () => updateAge(userData?.id, age),
        onSuccess: () => {
            setSuccessMessage("Η ηλικία σας ενημερώθηκε επιτυχώς.");
            refetch(); // Use the captured refetch function
            // setImgUrl("");

        }
    });

    const { mutateAsync: changeExperience, isPending: isExperiencePending } = useMutation({
        mutationFn: () => updateExperience(userData?.id, experience),
        onSuccess: () => {
            setSuccessMessage("Τα χρόνια εμπειρίας σας ενημερώθηκε επιτυχώς.");
            refetch(); // Use the captured refetch function
            // setImgUrl("");

        }
    });

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleChange = () => {
        if (userData?.bio !== bio) {
            changeBio();
        }
        if (userData?.img !== imgUrl) {
            changePic();
        }
        if (userData?.age !== age) {
            changeAge();
        }
        if (userType === "/nannysettings" && userData?.experience !== experience) {
            changeExperience();
        }
    }

    const isUpdateDisabled = () => {
        if (!userData?.uid || isBioPending || isAgePending || isImgPending || isExperiencePending) {
            return true;
        }
        if (userData?.bio === bio && userData?.img === imgUrl && userData?.age === age) {
            if (userType === "/nannysettings" && userData?.experience !== experience) {
                return false;
            }
            return true;
        }
        return false;
    };

    if (loading)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <span className='text-3xl font-bold'>Φόρτωση...</span>
            </div>
        )

    if (!loading)
        return (
            <div className="w-full  flex gap-5 py-10 flex-col items-center">

                <p className="text-3xl font-bold ">Το Προφίλ Μου</p>
                <div className='flex flex-col items-center gap-2 relative '>
                    <img id="pfp" src={userData?.img} className='size-36 border-2 object-cover rounded-full' ></img>

                    <div
                        onClick={() => { setPicChange(!picChange); }}
                        className={`absolute inset-0 flex items-center text-2xl justify-center cursor-pointer text-white 
                                        bg-black bg-opacity-50 opacity-70 hover:opacity-100 rounded-full`}
                    >
                        <MdEdit />
                    </div>

                </div>
                {picChange &&
                    <div className="w-1/3 font-medium h-20 mx-auto flex flex-col gap-1 mb-3 items-center  justify-center">
                        <p>URL εικόνας προφίλ:</p>
                        <input className="bg-white h-10 w-1/2 rounded-md border-2 pl-2   border-gray-400 px-1"
                            placeholder="https://jdm-restoration.com/cdn/shop/collections/jzx100_1350x902.jpg?v=1679301822"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                        />
                        {/* <button className={`${userData?.img!== imgUrl && imgUrl.length===0 ? "bg-gray-200" : "bg-pallete-300" }  w-32 font-medium h-10 px-2 text-center rounded-md`}
                                onClick={()=>changePic()}
                                disabled={!userData?.uid || isPending || userData?.img == imgUrl || imgUrl.length===0}
                        >

                            {isPending ? <span className="loading loading-md"></span> : "Αποθήκευση"}
                        </button> */}


                    </div>


                }
                {/* fields that cannot be modified for name,surname etc */}
                <div className="w-1/2 px-auto h-1/2  flex flex-col  items-center">
                    <div >
                        <p className="font-medium">Όνομα</p>
                        <input disabled className="bg-gray-300 w-full h-10 font-medium rounded-md border-2 border-gray-500 px-1 "
                            value={userData?.name}
                            title="Τα συμπληρωμένα στοιχεία αντλήθηκαν από την ιστοσελίδα του gov.gr"
                        ></input>
                    </div>
                </div>

                <div className="w-1/2 px-auto h-1/2 flex flex-col  items-center">
                    <div >
                        <p className="font-medium">Επίθετο</p>
                        <input disabled className="bg-gray-300 w-full h-10 font-medium rounded-md border-2 border-gray-500 px-1"
                            value={userData?.surname}
                            title="Τα συμπληρωμένα στοιχεία αντλήθηκαν από την ιστοσελίδα του gov.gr"

                        ></input>
                    </div>
                </div>

                <div className="w-1/2 px-auto h-1/2  flex flex-col  items-center">
                    <div >
                        <p className="font-medium">ΑΜΚΑ</p>
                        <input disabled className="bg-gray-300 w-full h-10 font-medium rounded-md border-2 border-gray-500 px-1"
                            value={userData?.AMKA}
                            title="Τα συμπληρωμένα στοιχεία αντλήθηκαν από την ιστοσελίδα του gov.gr"

                        ></input>
                    </div>
                </div>

                <div className="w-1/2 px-auto h-1/2  flex flex-col  items-center">
                    <div >
                        <p className="font-medium">Φύλο</p>
                        <input disabled className="bg-gray-300 w-full h-10 font-</label>medium rounded-md border-2 border-gray-500 px-1"
                            value={userData?.gender == true ? "Αρσενικό" : "Θηλυκό"}
                            title="Τα συμπληρωμένα στοιχεία αντλήθηκαν από την ιστοσελίδα του gov.gr"

                        ></input>
                    </div>
                </div>

                <div className="w-1/3  h-1/2 px-auto flex flex-col  items-center">
                    <div className="w-2/4  ml-8" >
                        <p className="font-medium">Ηλικία</p>
                        <input className="bg-gray-50 w-3/6  border-gray-700 h-10 font-medium rounded-md border-2  px-2"
                            value={age}
                            title="Τα συμπληρωμένα στοιχεία αντλήθηκαν από την ιστοσελίδα του gov.gr"
                            type="number"
                            onChange={(e) => { setAge(e.target.value) }}
                            min={18}
                            max={99}
                        ></input>
                    </div>
                </div>
                {userType === "/nannysettings" &&
                    <div className="w-1/3  h-1/2 px-auto flex flex-col  items-center">
                        <div className="w-2/4  ml-8" >
                            <p className="font-medium">Χρόνια Εμπειρίας</p>
                            <input className="bg-gray-50 w-3/6  border-gray-700 h-10 font-medium rounded-md border-2  px-2"
                                value={experience}
                                title="Τα συμπληρωμένα στοιχεία αντλήθηκαν από την ιστοσελίδα του gov.gr"
                                type="number"
                                onChange={(e) => { setExperience(e.target.value) }}
                                min={0}
                                max={99}
                            ></input>
                        </div>
                    </div>
                }

                <label className="form-control  w-1/3" >
                    <div className="label ml-1">
                        <span className="label-text font-medium">Σύντομο Βιογραφικό</span>
                    </div>
                    <textarea
                        className="textarea bg-gray-50  textarea-bordered h-24 w-full px-1 resize-none border-2 border-gray-700 rounded-md"
                        value={bio}
                        placeholder={`${userData?.bio == 0 ? " Δεν βρέθηκε βιογραφικό" : ""}`}
                        onChange={handleBioChange}
                    />
                </label>

                <button className={`border-2 ${isUpdateDisabled() ? "bg-gray-400 border-gray-400" : "hover:bg-pallete-700 hover:border-pallete-700 text-white border-pallete-800 bg-pallete-800"}  w-32 font-medium h-10 px-2 text-center rounded-md`}
                    onClick={() =>
                        handleChange()
                    }
                    disabled={isUpdateDisabled()}
                >

                    {isBioPending || isAgePending || isImgPending || isExperiencePending ? <span className="loading loading-md"></span> : "Ενημέρωση"}
                </button>

            </div>
        );
}

export default ParentProfileEdit;
