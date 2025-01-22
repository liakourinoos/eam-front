import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchContactedNannies } from "../../../FetchFunctions";

function RenewFormPage1({myId, form, setForm, nextFn, returnTo }) {
    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        AMKA: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({ ...prevState, [name]: value }));

        // Validate input
        let error = "";
        if (name === "name" || name === "surname") {
            if (/\d/.test(value)) {
                error = "Δεν επιτρέπονται αριθμοί.";
            } else if (/\s/.test(value)) {
                error = "Επιτρέπονται μόνο χαρακτήρες αλφάβητου.";
            }
        } else if (name === "AMKA") {
            if (!/^\d*$/.test(value)) {
                error = "Επιτρέπονται μόνο αριθμοί.";
            }
            else if( value.length !== 11 && value.length !== 0){
                error = "Το ΑΜΚΑ πρέπει να αποτελείται από 11 ψηφία.";
            }
            else if (value.length>0 && !nannies.some(nanny => nanny.AMKA === value && nanny.name === form.name && nanny.surname === form.surname)) {
                error = "Το ΑΜΚΑ που εισάγατε δεν αντιστοιχεί στον συγκεκριμένο επαγγελματία.";
                setForm(prevState => ({...prevState,correctAMKA:false}));
            }
            else if(value.length>0 && nannies.some(nanny => nanny.AMKA === value && nanny.name === form.name && nanny.surname === form.surname)) setForm(prevState => ({...prevState,correctAMKA:true}));
        }

        setErrors(prevState => ({ ...prevState, [name]: error }));
    };

    // fetch nannies that have accepted contact request
    const {data:nannies, isLoading: isNanniesLoading} = useQuery({
        queryKey: ['nannies'],
        queryFn: ()=>fetchContactedNannies(myId),
        enabled: form.cantEdit && !!myId
        
    })


    const [searchInput,setSearchInput] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    

    useEffect(() => { //initialize searchresults with everything
        if (nannies) setSearchResult(
            nannies.map(nanny => ({
                img: nanny.img,
                name: nanny.name,
                surname: nanny.surname,
                AMKA: nanny.AMKA
            })))
    }, [nannies])

    useEffect(() => {//update search result by either name or surname
        if(searchInput!==""){ 
            setSearchResult(nannies.filter(nanny => 
                nanny.name.toLowerCase().includes(searchInput.toLowerCase()) || 
                nanny.surname.toLowerCase().includes(searchInput.toLowerCase())
            ))
        }
        else{
            setSearchResult(nannies);
        }    
        console.log(searchResult);
    }, [searchInput])

    const [selectedNannyAMKA,setSelectedNannyAMKA] = useState("");

    return (
        <div className="w-full">
            {/* progress bar */}
            {!form.cantEdit &&
                <div className="w-3/4 mt-2 mx-auto flex justify-around items-center relative">
                    {/* Step 1 */}
                    <div className="text-pallete-800 z-10 text-xl font-semibold flex flex-col items-center justify-center relative">
                        <span className="rounded-full h-8 w-8 text-white flex items-center bg-pallete-800 justify-center">1</span>
                        <span>Στοιχεία Επαγγελματία</span>
                    </div>

                    {/* Line between Step 1 and Step 2 */}
                    <div className="absolute top-4 left-60 h-1 bg-gray-400 w-2/6"></div>

                    {/* Step 2 */}
                    <div className="text-gray-400 z-10 text-xl font-semibold flex flex-col items-center justify-center relative">
                        <span className="rounded-full h-8 w-8 text-white flex items-center bg-gray-400 justify-center">2</span>
                        <span>Περιοχή και Πρόγραμμα</span>
                    </div>

                    {/* Line between Step 2 and Step 3 */}
                    <div className="absolute top-4  mr-6 right-40 h-1 bg-gray-400 w-2/6"></div>

                    {/* Step 3 */}
                    <div className="text-gray-400 z-10 text-xl font-semibold flex flex-col items-center justify-center relative">
                        <span className="rounded-full h-8 w-8 text-white flex items-center bg-gray-400 justify-center">3</span>
                        <span>Οριστικοποίηση</span>
                    </div>
                </div>
            }
            {form.cantEdit &&
                <div className="w-3/4 mt-2  mx-auto flex justify-around items-center relative">
                    {/* Step 1 */}
                    <div className="text-pallete-800 z-10 text-xl font-semibold flex flex-col items-center justify-center relative">
                        <span className="rounded-full h-8 w-8 text-white flex items-center bg-pallete-800 justify-center">1</span>
                        <span>Στοιχεία Επαγγελματία</span>
                    </div>

                    {/* Line between Step 1 and Step 2 */}
                    <div className="absolute top-4 left-1/6 h-1 bg-gray-400 w-3/6"></div>

                    {/* Step 2 */}
                    <div className="text-gray-400 z-10 text-xl font-semibold flex flex-col items-center justify-center relative">
                        <span className="rounded-full h-8 w-8 text-white flex items-center bg-gray-400 justify-center">2</span>
                        <span>Περιοχή και Πρόγραμμα</span>
                    </div>

                </div>
            }
            
            <p className="text-3xl font-medium mt-16 text-center">Στοιχεία Επαγγελματία</p>
            <div className=" h-96 flex">
                {/* left div for contacts */}
                <div className="w-1/3  py-5 flex items-center">
                    {!form.cantEdit && <div className="h-full w-3/4  mx-auto flex flex-col items-center pb-3 px-5">
                        <p className="font-semibold mt-2 text-lg">Επαγγελματίες από τις επαφές σας:</p>
                        {/* scrollable div with nannies */}
                        <input  value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}
                                className="w-full h-12 mb-1 border-2 rounded-md pl-2 mt-2 bg-white border-gray-300"
                                placeholder="Ψάξτε επαγγελματία"
                                disabled={form.cantEdit}
                        />
                        <div className="bg-white overflow-y-auto h-full w-full border-2 border-gray-300 shadow-md rounded-md shadow-gray-700">
                            {form.cantEdit && <div className="w-full h-full bg-gray-300"/>}
                            {isNanniesLoading && <div className="h-full w-full flex items-center justify-center"><span className="loading loading-lg"></span></div>}
                            {!form.cantEdit && searchResult?.length >0 && searchResult?.map((nanny, index) => (
                                <div    key={index} onClick={()=>{ setForm(prevState => ({...prevState,name: nanny.name,surname: nanny.surname})); setSelectedNannyAMKA( nanny.AMKA); }} 
                                        className={` ${ selectedNannyAMKA===nanny.AMKA ? 'text-pallete-900 underline': 'text-black' } flex h-20 pl-5 items-center border-b-2 border-gray-300 hover:bg-white bg-slate-50 hover:text-pallete-500 cursor-pointer`}
                                >    
                                    <img src={nanny.img} className="h-16 w-16 rounded-full object-cover"/>
                                    <p className="text-lg font-medium ml-4">{nanny.name} {nanny.surname}</p>
                                </div>
                            ))}
                            {!form.cantEdit && searchResult?.length===0 && <div className="h-full w-full flex items-center justify-center"><p>Δεν βρέθηκαν αποτελέσματα.</p></div>}
                        </div>
                    </div>}

                </div>
                {/* middle div for info */}
                <div className="w-1/3  pl-32 flex pt-14 flex-col ">
                    <div className="w-3/5  mt-4">
                        <p className="text-xl ml-1 font-medium">Όνομα</p>
                        {errors.name && <p className="text-red-500 text-md ">{errors.name}</p>}

                        <input
                            type="text"
                            className={`w-full font-medium h-10 border-2 rounded-md pl-2 mt-1 ${form.cantEdit ? "bg-gray-300" : 'bg-white'}  ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            value={form.name}
                            name="name"
                            disabled={form.cantEdit}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="w-3/5 mt-4">
                        <p className="text-xl ml-1 font-medium">Επώνυμο</p>
                        {errors.surname && <p className="text-red-500 text-md">{errors.surname}</p>}

                        <input
                            type="text"
                            className={`w-full font-medium h-10 border-2 rounded-md pl-2 mt-1 ${form.cantEdit ? "bg-gray-300" : 'bg-white'} ${errors.surname ? 'border-red-500' : 'border-gray-300'}`}
                            value={form.surname}
                            name="surname"
                            disabled={form.cantEdit}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="w-3/5  mt-4">
                        <p className="text-xl ml-1 font-medium">AMKA</p>
                        {errors.AMKA && <p className="text-red-500 text-md">{errors.AMKA}</p>}

                        <input
                            type="text"
                            className={`w-full font-medium h-10 border-2 rounded-md pl-2 mt-1 ${form.cantEdit ? "bg-gray-300" : 'bg-white'} ${errors.AMKA ? 'border-red-500' : 'border-gray-300'}`}
                            value={form.AMKA}
                            name="AMKA"
                            disabled={form.cantEdit}

                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="w-1/3">

                </div>

            </div>

            <div className='w-11/12  mx-auto flex justify-end '>                    
                            <button onClick={()=>{nextFn(1)}}
                                    className='bg-white border-2 font-medium w-48 border-gray-500 text-md px-2 mr-10 h-14 rounded-md my-3'
                            >
                                Επόμενο
                            </button>
            </div>
        </div>
    );
}

RenewFormPage1.propTypes = {
    myId: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    setForm: PropTypes.func.isRequired,
    nextFn: PropTypes.func.isRequired,
    returnTo: PropTypes.string
};

export default RenewFormPage1;
