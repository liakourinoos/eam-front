import { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
function FormPage3({ form, setForm, nextFn }) {

    return (
        <div className="w-full  flex flex-col flex-grow">
            {/* progress bar */}
            <ul className="steps w-full my-2 font-medium">
                <li className="step step-secondary text-secondary">Στοιχεία Επαγγελματία</li>
                <li className="step step-secondary text-secondary">Περιοχή και Πρόγραμμα</li>
                <li className="step step-secondary text-secondary">Οριστικοποίηση</li>
            </ul>

            <p className="text-3xl font-medium mt-10 text-center">Η αίτησή σας οριστικοποιήθηκε επιτυχώς.</p>

            <FaCheckCircle className='text-9xl text-green-500 my-5 mx-auto'/>            
            <div className='w-11/12  mx-auto flex justify-center '>                    
                            <Link to='/parentapplications'
                                    className='bg-white border-2  flex items-center justify-center text-lg font-medium w-48 border-gray-500 text-md h-14 rounded-md my-3'
                            >
                                Οι αιτήσεις μου
                            </Link>
            </div>
        </div>
    );
}


export default FormPage3;
