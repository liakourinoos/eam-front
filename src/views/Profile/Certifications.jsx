import { useState,useEffect} from "react";
import { useAuth } from "../../customHooks";
import { MdAddCircleOutline, MdCheckCircle, MdRemoveCircleOutline } from "react-icons/md";
import { educationTitles,certificateTitles } from "../../../global_assets/global_values";
import { v4 as uuidv4 } from 'uuid'; // Import uuid function
import { updateUserInfo } from "../../FetchFunctions";
import { useMutation } from "@tanstack/react-query";
import { downloadFile } from "../../../global_assets/global_functions";
function Certifications() {

    

    const { userData, loading ,refetch} = useAuth();

    const {mutateAsync:changeEducation,isPending}=useMutation({
        mutationFn:()=>updateUserInfo(userData?.id,"education",education),
        onError:(error)=>{
            console.log(error);
        },
        onSuccess:()=>{
            refetch();
        }

    });

    const {mutateAsync:changeCertificates,isCertPending}=useMutation({
        mutationFn:()=>updateUserInfo(userData?.id,"certificates",certificates),
        onError:(error)=>{
            console.log(error);
        },
        onSuccess:()=>{
            refetch();
        }

    });

    const {mutateAsync:changeLetters,isLettPending}=useMutation({
        mutationFn:()=>updateUserInfo(userData?.id,"letters",letters),
        onError:(error)=>{
            console.log(error);
        },
        onSuccess:()=>{
            refetch();
        }

    });




    

    
    //for education

    const [addEdu, setAddEdu] = useState(false);
    const [education, setEducation] = useState(userData?.education || []); // Initialize state
    const [newEdu, setNewEdu] = useState({ title: "", name: "" }); // Manage new entry inputs
    
    
    
    //for certificates

    const [addCert, setAddCert] = useState(false);
    const [certificates, setCertificates] = useState(userData?.certificates || []); // Initialize state
    const [newCert, setNewCert] = useState({ title: "", name: "" }); // Manage new entry inputs


    //for letters
    const [addLett, setAddLett] = useState(false);
    const [letters, setLetters] = useState(userData?.letters || []); // Initialize state
    const [newLett, setNewLett] = useState({ name: "" }); // Manage new entry inputs



    useEffect(() => {
        // Load the userData once
        if(userData){
            setEducation(userData?.education || []);
            setCertificates(userData?.certificates || []);
            setLetters(userData?.letters || []);
        }
    }, [userData]);


    //education modifications

    const appendEdu = () => {
        if (newEdu.title && newEdu.name) {
            setEducation(prev => [
                ...prev,
                { id: uuidv4(), title: newEdu.title, name: newEdu.name } // Generate a unique ID for each entry
            ]);
            setNewEdu({ title: "", name: "" }); // Reset inputs
            setAddEdu(false); // Hide the add form
        } else {
            alert("Παρακαλούμε υποβάλλετε τίτλο σπουδών και αντίγραφο.");
        }
    };

    const removeEdu = (idToRemove) => {
        setEducation(prev => prev.filter(item => item.id !== idToRemove)); // Use ID to remove the entry
    };

    //certificates modifications
    const appendCert = () => {
        if (newCert.name) {
            setCertificates(prev => [
                ...prev,
                { id: uuidv4(),title: newCert.title,  name: newCert.name } // Generate a unique ID for each entry
            ]);
            setNewCert({ title: "", name: "" }); // Reset inputs
            setAddCert(false); // Hide the add form
        } else {
            alert("Παρακαλούμε υποβάλλετε τίτλο πιστοποιητικού και αντίγραφο.");
        }
    };

    const removeCert = (idToRemove) => {
        setCertificates(prev => prev.filter(item => item.id !== idToRemove)); // Use ID to remove the entry
    };

    //letter modifications
    const appendLett = () => {
        if (newLett.name) {
            setLetters(prev => [
                ...prev,
                { id: uuidv4(),  name: newLett.name } // Generate a unique ID for each entry
            ]);
            setNewLett({  name: "" }); // Reset inputs
            setAddLett(false); // Hide the add form
        } else {
            alert("Παρακαλούμε υποβάλλετε συστατική επιστολή.");
        }
    };

    const removeLett = (idToRemove) => {
        setLetters(prev => prev.filter(item => item.id !== idToRemove)); // Use ID to remove the entry
    };


    





    if (loading)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    if (!loading && userData)
        return (
            <div className="w-full bg-white gap-5 py-10 flex flex-col items-center ">
                <p className="text-3xl mb-8 font-bold ">Πιστοποιητικά</p>


                {/* education change div */}
                <div className="w-2/3 flex flex-col ">
                    <p className="underline text-2xl font-medium">Σπουδές</p>
                    <p className="font-medium text-md flex items-center gap-1 ml-2 mt-2"><MdCheckCircle className="text-lg text-green-600" />Εμφανίζονται στο προφίλ σας:</p>
                    {education.map((item,idx) => (
                        <div key={idx} className="font-medium mt-5 w-1/2 ml-10 text-lg  flex items-center" >
                            <button className="font-extrabold text-red-500 text-2xl mr-4 hover:text-red-700"
                                onClick={() => removeEdu(item.id)} // Use ID to remove
                            >
                                <MdRemoveCircleOutline />
                            </button>
                            <span className="w-2/5">{item.title}</span>
                            <button title={`${item.name} (DUMMY ΑΡΧΕΊΟ)`}
                                    className="ml-2 w-2/5 flex items-center overflow-x-auto  bg-gray-100 px-2 rounded-md shadow-sm shadow-gray-400"
                                    onClick={() => downloadFile(item.name)}
                            >
                                {item.name}
                            </button>
                        </div>
                    ))}

                    <div className=" ml-5 mb-5 mt-20 w-fit">

                        <button className="flex gap-1 items-center  px-1 text-xl font-medium"
                            onClick={() => setAddEdu(!addEdu)}
                        >
                            <MdAddCircleOutline className="text-2xl " />
                            Επισύναψη Επιπλέον Τίτλου Σπουδών
                        </button>

                        {addEdu &&
                            <div className="flex flex-col w-full  gap-2 ml-5 mt-3">
                                <p className="text-sm">Παρακαλούμε επιλέξτε τίτλο σπουδών και επισυνάψτε το αντίστοιχο αντίγραφο.</p>
                                <div className="w-full flex justify-between  items-center">
                                    <select className="w-2/4 pl-2 overflow-x-hidden h-10 border bg-white  border-gray-300 rounded-md shadow-sm shadow-gray-400"
                                        value={newEdu.title}
                                        onChange={(e) => setNewEdu({ ...newEdu, title: e.target.value })}
                                    >
                                        <option value={""} disabled>Επιλέξτε</option>
                                        {educationTitles.map((title, index) => (
                                            <option className="w-1/2" key={index} value={title}>{title}</option>
                                        ))}
                                    </select>

                                    <input type="file"
                                        className="w-2/5 border  bg-white border-gray-300 rounded-md "
                                        onChange={(e) => {
                                            const file = e.target.files[0]; // Get the first file if it exists
                                            if (file) {
                                                setNewEdu(prevState => ({ ...prevState, name: file.name })); // Update state with the file name
                                            }
                                        }}
                                    />
                                </div>
                                <div className="w-full flex justify-end mt-5">
                                    <button className="bg-green-500 text-white w-1/4 h-10 rounded-md shadow-md hover:bg-green-600"
                                        onClick={() => {  appendEdu(); }}
                                    >
                                        Προσθήκη
                                    </button>
                                </div>

                            </div>
                        }

                    </div>
                    <div className="w-full flex justify-end px-20 mt-10">
                        <button className={` ${isPending || userData?.education === education ? 'bg-gray-400' : "bg-green-500 hover:bg-green-600"}  text-white w-1/5 h-10 rounded-md shadow-md `}
                                onClick={() => changeEducation()}
                                disabled={isPending || userData?.education === education}
                        >
                            {isPending ? <span className="loading loading-md"></span> :"Ενημέρωση"}
                        </button>
                    </div>
                </div>


                {/* certificates change div */}
                <div className="w-2/3 flex flex-col ">
                    <p className="underline text-2xl font-medium">Βεβαιώσεις</p>
                    <p className="font-medium text-md flex items-center gap-1 ml-2 mt-2"><MdCheckCircle className="text-lg text-green-600" />Εμφανίζονται στο προφίλ σας:</p>
                    {certificates.map((item,idx) => (
                        <div key={idx} className="font-medium mt-5 w-1/2 ml-10 text-lg  flex items-center" >
                            <button className="font-extrabold text-red-500 text-2xl mr-4 hover:text-red-700"
                                onClick={() => removeCert(item.id)} // Use ID to remove
                            >
                                <MdRemoveCircleOutline />
                            </button>
                            <span className="w-2/5">{item.title}</span>
                            <button title={item.name}
                                className="ml-2 w-2/5 flex items-center overflow-x-auto  bg-gray-100 px-2 rounded-md shadow-sm shadow-gray-400"
                                onClick={() => downloadFile(item.name)}
                            >
                                {item.name}
                            </button>
                        </div>
                    ))}

                    <div className=" ml-5 mb-5 mt-20 w-fit">

                        <button className="flex gap-1 items-center  px-1 text-xl font-medium"
                            onClick={() => setAddCert(!addCert)}
                        >
                            <MdAddCircleOutline className="text-2xl " />
                            Επισύναψη Επιπλέον Βεβαίωσης
                        </button>

                        {addCert &&
                            <div className="flex flex-col w-full  gap-2 ml-5 mt-3">
                                <p className="text-sm">Παρακαλούμε επιλέξτε τύπο βεβαίωσης και επισυνάψτε το αντίστοιχο αντίγραφο.</p>
                                <div className="w-full flex justify-between  items-center">
                                    <select className="w-2/4 pl-2 overflow-x-hidden h-10 border bg-white  border-gray-300 rounded-md shadow-sm shadow-gray-400"
                                        value={newCert.title}
                                        onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                                    >
                                        <option value={""} disabled>Επιλέξτε</option>
                                        {certificateTitles.map((title, index) => (
                                            <option className="w-1/2" key={index} value={title}>{title}</option>
                                        ))}
                                    </select>

                                    <input type="file"
                                        className="w-2/5 border  bg-white border-gray-300 rounded-md "
                                        onChange={(e) => {
                                            const file = e.target.files[0]; // Get the first file if it exists
                                            if (file) {
                                                setNewCert(prevState => ({ ...prevState, name: file.name })); // Update state with the file name
                                            }
                                        }}
                                    />
                                </div>
                                <div className="w-full flex justify-end mt-5">
                                    <button className="bg-green-500 text-white w-1/4 h-10 rounded-md shadow-md hover:bg-green-600"
                                        onClick={() => {  appendCert(); }}
                                    >
                                        Προσθήκη
                                    </button>
                                </div>

                            </div>
                        }

                    </div>
                    <div className="w-full flex justify-end px-20 mt-10">
                        <button className={` ${isCertPending || userData?.certificates === certificates ? 'bg-gray-400' : "bg-green-500 hover:bg-green-600"}  text-white w-1/5 h-10 rounded-md shadow-md `}
                                onClick={() => changeCertificates()}
                                disabled={isCertPending || userData?.certificates === certificates}
                        >
                            {isPending ? <span className="loading loading-md"></span> :"Ενημέρωση"}
                        </button>
                    </div>
                </div>

                 {/* letters change div */}
                <div className="w-2/3 flex flex-col ">
                    <p className="underline text-2xl font-medium">Συστατικές Επιστολές</p>
                    <p className="font-medium text-md flex items-center gap-1 ml-2 mt-2"><MdCheckCircle className="text-lg text-green-600" />Εμφανίζονται στο προφίλ σας:</p>
                    {letters.map((item,idx) => (
                        <div key={idx} className="font-medium mt-5 w-1/2 ml-10 text-lg  flex items-center" >
                            <button className="font-extrabold text-red-500 text-2xl mr-4 hover:text-red-700"
                                onClick={() => removeLett(item.id)} // Use ID to remove
                            >
                                <MdRemoveCircleOutline />
                            </button>
                            <button title={`${item.name} (DUMMY ΑΡΧΕΊΟ)`}
                                    className="ml-2 w-2/5 flex items-center overflow-x-auto  bg-gray-100 px-2 rounded-md shadow-sm shadow-gray-400"
                                    onClick={() => downloadFile(item.name)}
                            >
                                {item.name}
                            </button>
                        </div>
                    ))}

                    <div className=" ml-5 mb-5 mt-20 w-fit">

                        <button className="flex gap-1 items-center  px-1 text-xl font-medium"
                            onClick={() => setAddLett(!addLett)}
                        >
                            <MdAddCircleOutline className="text-2xl " />
                            Επισύναψη Επιπλέον Επιστολών
                        </button>

                        {addLett &&
                            <div className="flex flex-col w-full  gap-2 ml-5 mt-3">
                                <p className="text-sm">Παρακαλούμε επιλέξτε τίτλο σπουδών και επισυνάψτε το αντίστοιχο αντίγραφο.</p>
                                <div className="w-full flex justify-between  items-center">

                                    <input type="file"
                                        className="w-2/5 border  bg-white border-gray-300 rounded-md "
                                        onChange={(e) => {
                                            const file = e.target.files[0]; // Get the first file if it exists
                                            if (file) {
                                                setNewLett(prevState => ({ ...prevState, name: file.name })); // Update state with the file name
                                            }
                                        }}
                                    />
                                </div>
                                <div className="w-full flex justify-end mt-5">
                                    <button className="bg-green-500 text-white w-1/4 h-10 rounded-md shadow-md hover:bg-green-600"
                                        onClick={() => {  appendLett(); }}
                                    >
                                        Προσθήκη
                                    </button>
                                </div>

                            </div>
                        }

                    </div>
                    <div className="w-full flex justify-end px-20 mt-10">
                        <button className={` ${isLettPending || userData?.letters === letters ? 'bg-gray-400' : "bg-green-500 hover:bg-green-600"}  text-white w-1/5 h-10 rounded-md shadow-md `}
                                onClick={() => changeLetters()}
                                disabled={isLettPending || userData?.letters === letters}
                        >
                            {isLettPending ? <span className="loading loading-md"></span> :"Ενημέρωση"}
                        </button>
                    </div>
                </div>



            </div>
        );
}

export default Certifications;
