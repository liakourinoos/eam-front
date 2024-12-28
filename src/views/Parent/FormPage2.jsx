import { useState } from "react";
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaQuestion } from "react-icons/fa";
import {hours,days} from '../../../global_assets/global_values.jsx';
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

    const calculateEndingDate = (startDate, months) => {
        if (!startDate || !months) return "";

        // Parse the startDate (dd/mm/yyyy) into a Date object
        const [day, month, year] = startDate.split('/');
        const start = new Date(`${month}/${day}/${year}`); // Use mm/dd/yyyy format for Date

        // Add the months
        start.setMonth(start.getMonth() + parseInt(months));

        // Format the ending date as dd/mm/yyyy
        const endDay = start.getDate().toString().padStart(2, '0');
        const endMonth = (start.getMonth() + 1).toString().padStart(2, '0');
        const endYear = start.getFullYear();

        return `${endDay}/${endMonth}/${endYear}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";

        // Parse the dd/mm/yyyy format into a Date object
        const [day, month, year] = dateString.split('/');
        const date = new Date(`${month}/${day}/${year}`); // JavaScript Date accepts mm/dd/yyyy format

        return new Intl.DateTimeFormat('en-GB').format(date); // You can use 'en-GB' for the dd/mm/yyyy format
    };

    const endingDate = calculateEndingDate(form.startingDate, form.months);


    

    const handleTimeClick = (day, time) => {
        const newSchedule = form.schedule.some(slot => slot.day === day && slot.time === time)
            ? form.schedule.filter(slot => !(slot.day === day && slot.time === time))
            : [...form.schedule, { day, time }];
        setForm(prevState => ({ ...prevState, schedule: newSchedule }));
    };

    const handleColumnClick = (day) => {
        setForm(prevState => {
            const isSelected = hours.every(time => prevState.schedule.some(slot => slot.day === day && slot.time === time));
            const newSchedule = isSelected 
                ? prevState.schedule.filter(slot => slot.day !== day)
                : [...prevState.schedule, ...hours.map(time => ({ day, time }))];
            return { ...prevState, schedule: newSchedule };
        });
    };
    
    const handleRowClick = (time) => {
        setForm(prevState => {
            const isSelected = days.every(day => prevState.schedule.some(slot => slot.day === day && slot.time === time));
            const newSchedule = isSelected 
                ? prevState.schedule.filter(slot => slot.time !== time)
                : [...prevState.schedule, ...days.map(day => ({ day, time }))];
            return { ...prevState, schedule: newSchedule };
        });
    };
    


    const { mutateAsync: addApplication,isPending} = useMutation({
        mutationFn: () => addFinalApplication({ ...form, userId: userData?.id }),   
        onSuccess: () => {
            nextFn(1); // Move to the next step
        },
        onError: (error) => {
            console.error('Error:', error); // Handle error
        }
    });
    


    return (
        <div className="w-full">
            {/* progress bar */}
            <ul className="steps w-full my-2 font-medium ">
                <li className="step step-secondary text-secondary">Στοιχεία Επαγγελματία</li>
                <li className="step step-secondary text-secondary">Περιοχή και Πρόγραμμα</li>
                {!form.cantEdit && <li className="step">Οριστικοποίηση</li>}
            </ul>

            <button onClick={()=>nextFn(-1)}
                    className="bg-white  mt-10 ml-10 flex items-center justify-center font-medium border-2 size-14 border-gray-500 text-md rounded-md "    
            >
                <MdArrowBackIosNew className="text-3xl"/>
            </button>
            <p className="text-3xl font-medium mt-5 mb-10 text-center">Περιοχή και Πρόγραμμα</p>

            <div className="w-1/6 mx-auto">
                <div className="flex gap-2 items-center">
                    <p className="text-xl ml-1 font-medium">Διεύθυνση Οικίας</p>
                    <FaQuestion className="text-md" 
                                title="Μπορεί να συμπληρωθεί και η διεύθυνση του επαγγελματία, κατόπιν συνεννόησης."
                    />
                </div>
                <input
                    type="text"
                    className={`w-full font-medium h-10 border-2 rounded-md pl-2 mt-1 ${form.cantEdit ? "bg-gray-300": 'bg-white'} border-gray-300`}
                    value={form.address}
                    name="address"
                    disabled={form.cantEdit}
                    onChange={handleChange}
                />
            </div>

            {/* schedule */}
            <div className="w-1/2 mx-auto my-5 ">
                <p className="text-xl text-center font-medium mb-4">Πρόγραμμα</p>
                
                <table className="table-auto w-full border-collapse border-2 bg-white border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2"></th>
                            {days.map(day => (
                                <th key={day} className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleColumnClick(day)}>
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map(time => (
                            <tr key={time}>
                                <td className="border border-gray-300 p-2 text-center cursor-pointer" onClick={() => handleRowClick(time)}>
                                    {time}
                                </td>
                                {days.map(day => (
                                    <td key={`${day}-${time}`} className="border border-gray-300 p-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={form.schedule.some(slot => slot.day === day && slot.time === time)}
                                            onChange={() => handleTimeClick(day, time)}
                                            className={`checkbox  checkbox-secondary`}
                                            disabled={form.cantEdit}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="w-full flex justify-end my-5"> 
                    <button className="rounded-md bg-white border-2 border-gray-500   font-medium p-2 "
                            onClick={() => setForm(prevState => ({ ...prevState, schedule: [] }))}
                            disabled={form.cantEdit}
                    >
                        Καθαρισμός Ωρών
                    </button>
                </div>

            </div>



            {/* Calendar */}
            <div className="w-1/6 my-5 mx-auto">
                <p className="text-xl ml-1 mb-1 font-medium">Ημερομηνία Έναρξης</p>
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

            <div className="w-1/6 mx-auto mt-4">
                <p className='text-l font-medium'>Διάστημα Απασχόλησης</p>
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

            <p className="font-medium text-lg my-5 text-center">
                Απασχόληση από <span className="mx-1 text-xl underline">{formatDate(form.startingDate)}</span> 
                έως <span className="mx-1 text-xl underline ">{formatDate(endingDate)}</span> 
            </p>

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
                    <span className="text-lg font-medium">Αποδέχομαι τους <span className="underline" >όρους χρήσης</span></span>
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
                    <button onClick={()=>addApplication()}
                            className={` border-2 font-medium w-48 border-gray-500 text-md px-2 mr-10 h-14 rounded-md my-3
                                        ${!form.hasAccepted || !form.hasSigned || form.startingDate==="" || form.months==="" || form.address==="" || form.name==="" || form.surname==="" || form.AMKA==="" || form.schedule.length===0 || form.AMKA.length!==11 ? 'bg-gray-300' : 'bg-white' }
                            `}
                            disabled={!form.hasAccepted || !form.hasSigned || form.startingDate==="" || form.months==="" || form.address==="" || form.name==="" || form.surname==="" || form.AMKA==="" || form.AMKA.length!==11 || form.schedule.length===0}
                            title={`${!form.hasAccepted || !form.hasSigned || form.startingDate==="" || form.months==="" || form.address==="" || form.name==="" || form.surname==="" || form.AMKA==="" || form.schedule.length===0 || form.AMKA.length!==11 ? 'Παρακαλώ συμπληρώστε σωστά όλα τα πεδία.' : "" }`}
                    >
                        {isPending ? 'Οριστικοποίηση...' :'Οριστικοποίηση Αίτησης'}
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
