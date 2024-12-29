import { useState } from "react";
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../customHooks.jsx";
import { addFinalApplication } from "../../FetchFunctions.jsx";

function FormPage2({ form, setForm, nextFn }) {

    const {userData} = useAuth();


    const [selectedDate, setSelectedDate] = useState(() => {
        if (form.startingDate) {
            const [day, month, year] = form.startingDate.split('/');
            return new Date(`${month}/${day}/${year}`); // Convert the string to a Date object
        }
        return new Date(); // Default to current date if startingDate is empty or invalid
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name !== "hasAccepted" && name !== "hasSigned" ) setForm(prevState => ({ ...prevState, [name]: value }));
        else setForm(prevState => ({ ...prevState, [name]: !prevState[name] }));
        
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);

        // Format the date as dd/mm/yyyy before storing it as a string
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        setForm(prevState => ({ ...prevState, startingDate: formattedDate }));
    };

    
    const checkInputs=()=>{
        return (
            form.hasAccepted && form.hasSigned && form.startingDate!=="" && form.months!==""  &&
            form.town!=="" && 
            form.rows.every(row =>
                Object.entries(row).every(([key, value]) => {
                    // Check if the value is not an empty string and not an empty array
                    if (Array.isArray(value)) {
                        return value.length > 0; // Ensure the array is not empty
                    }
                    return value !== ""; // Check that the value is not an empty string
                })
            )

        );
    }



    
    


    // const { mutateAsync: addApplication,isPending} = useMutation({
    //     mutationFn: () => addFinalApplication({ ...form, userId: userData?.id }),   
    //     onSuccess: () => {
    //         nextFn(1); // Move to the next step
    //     },
    //     onError: (error) => {
    //         console.error('Error:', error); // Handle error
    //     }
    // });
    


    return (
        <div className="w-full">
            {/* progress bar */}
            <ul className="steps w-full my-2 font-medium ">
                <li className="step step-secondary text-secondary">Περιοχή Απασχόλησης</li>
                <li className="step step-secondary text-secondary">Πρόγραμμα Απασχόλησης</li>
                {!form.cantEdit && <li className="step">Οριστικοποίηση</li>}
            </ul>

            <button onClick={()=>nextFn(-1)}
                    className="bg-white  mt-10 ml-10 flex items-center justify-center font-medium border-2 size-14 border-gray-500 text-md rounded-md "    
            >
                <MdArrowBackIosNew className="text-3xl"/>
            </button>
            <p className="text-3xl font-medium mt-5 mb-10 text-center">Περιοχή και Πρόγραμμα</p>

           


            {/* Calendar */}
            <div className="w-1/6 my-5 mx-auto">
                <p className="text-xl ml-2 mb-1 font-medium">Ημερομηνία Έναρξης</p>
                <p className="text-xs ml-2 font-normal mb-2">Παρακαλούμε επιλέξτε την κοντινότερη ημερομηνία που είστε διαθέσιμοι.</p>
                <DatePicker selected={selectedDate}
                            onChange={form.cantEdit ? undefined : handleDateChange}
                            minDate={new Date()}
                            inline
                            disabledKeyboardNavigation
                            dateFormat="yyyy-MM-dd"
                            className={`calendar-only ${form.cantEdit ? 'disabled-datepicker' : ''}`}
                            disabled={form.cantEdit} // Disables the DatePicker component
                            
                />
            </div>

            <div className="w-1/6 mx-auto mt-8">
                <p className='text-l font-medium  ml-2'>Διάστημα Απασχόλησης</p>
                <p className='text-xs font-normal mb-2 ml-2' >Παρακαλούμε επιλέξτε το μεγαλύτερο διάστημα μηνών που είστε διατεθειμένοι να μείνετε απασχολημένοι από τον ίδιο κηδεμόνα.</p>
                <select value={form.months} 
                        onChange={handleChange} 
                        className={`select select-bordered rounded-md bg-white h-12 border-2 border-gray-300 pl-2 w-full max-w-xs`}
                        name="months" 
                        disabled={form.cantEdit}       
                >
                    <option disabled value={""}>Επιλέξτε</option>
                    <option value={1}>1 μήνας</option>
                    <option value={2}>2 μήνες</option>
                    <option value={3}>3 μήνες</option>
                    <option value={4}>4 μήνες</option>
                    <option value={5}>5 μήνες</option>
                    <option value={6}>6 μήνες</option>
                    <option value={7}>7 μήνες</option>
                    <option value={8}>8 μήνες</option>
                    <option value={9}>9 μήνες</option>
                </select>
            </div>

            <div className="w-1/6 mx-auto mt-8">
                <p className='text-l font-medium ml-2'>Ηλικία Παιδιού (προαιρετικό)</p>
                <select value={form.childAge} 
                        onChange={handleChange} 
                        className={`select select-bordered rounded-md bg-white h-12 border-2 border-gray-300 pl-2 w-full max-w-xs`}
                        name="childAge" 
                        disabled={form.cantEdit}       
                >
                    <option disabled value={""}>Επιλέξτε</option>
                    <option value={"0-1"}>0-1 ετών</option>
                    <option value={"1-3"}>1-3 ετών</option>
                    <option value={"3-5"}>3-5 ετών</option>

                </select>
            </div>

            {/* <p className="font-medium text-lg my-5 text-center">
                Απασχόληση από <span className="mx-1 text-xl underline">{formatDate(form.startingDate)}</span> 
                έως <span className="mx-1 text-xl underline ">{formatDate(endingDate)}</span> 
            </p> */}

            {/* accept terms */}
            <div className="w-1/3 my-10 mx-auto">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2 h-6 w-6"
                        checked={form.hasAccepted || false}
                        name="hasAccepted"
                        onChange={handleChange}
                        disabled={form.cantEdit}
                    />
                    <span className="text-lg font-medium">Αποδέχομαι τους <span title="ΜΗ λειτουργικός σύνδεσμος." className="underline" >όρους χρήσης</span></span>
                </label>
            </div>

            {/* sign */}
            <div className="w-1/3 my-10 mx-auto ">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2 h-6 w-6"
                        checked={form.hasSigned || false}
                        name="hasSigned"
                        onChange={handleChange}
                        disabled={form.cantEdit}
                    />
                    <span className="text-lg font-medium">Ψηφιακή Υπογραφή</span>
                </label>
            </div>

            <div className='w-11/12 mx-auto flex justify-end'>                    
                {!form.cantEdit &&
                    <button 
                            // onClick={()=>addApplication()}
                            onClick={()=>{console.log(form); nextFn(1)}}
                            className={` border-2 font-medium w-48 border-gray-500 text-md px-2 mr-10 h-14 rounded-md my-3
                                        ${!checkInputs() ? 'bg-gray-300' : 'bg-white' }
                            `}
                            disabled={!checkInputs()}
                            title={`${ !checkInputs() ? 'Παρακαλώ συμπληρώστε σωστά όλα τα πεδία.' : "" }`}
                    >
                        {/* {isPending ? 'Οριστικοποίηση...' :'Οριστικοποίηση Αίτησης'} */}
                        test
                    </button>
                }
                {form.cantEdit && 
                    <Link to='/parentapplications' className={` border-2 flex items-center justify-center bg-white font-medium w-48 border-gray-500 text-md px-2 mr-10 h-14 rounded-md my-3`}>
                        Οι Αιτήσεις Μου
                    </Link>

                }
            </div>
        </div>
    );
}

FormPage2.propTypes = {
    form: PropTypes.object.isRequired,
    setForm: PropTypes.func.isRequired,
    nextFn: PropTypes.func.isRequired,
};

export default FormPage2;
