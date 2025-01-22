import { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function FormPage3({ form, setForm, nextFn }) {

    return (
        <div className="w-full  flex flex-col flex-grow">
            {/* progress bar */}
            {/* <ul className="steps w-full my-2 font-medium">
                <li className="step step-secondary text-secondary">Περιοχή Απασχόλησης</li>
                <li className="step step-secondary text-secondary">Πρόγραμμα Απασχόλησης</li>
                <li className="step step-secondary text-secondary">Οριστικοποίηση</li>
            </ul> */}
            
                <div className="w-3/4 mt-5 mx-auto flex justify-around items-center relative">
                    {/* Step 1 */}
                    <div className="text-pallete-800 z-10 text-xl font-semibold flex flex-col items-center justify-center relative">
                        <span className="rounded-full h-8 w-8 text-white flex items-center bg-pallete-800 justify-center">1</span>
                        <span>Περιοχή Απασχόλησης</span>
                    </div>

                    {/* Line between Step 1 and Step 2 */}
                    <div className="absolute top-4 left-60 h-1 bg-pallete-800 w-2/6"></div>

                    {/* Step 2 */}
                    <div className="text-pallete-800 z-10 text-xl font-semibold flex flex-col items-center justify-center relative">
                        <span className="rounded-full h-8 w-8 text-white flex items-center bg-pallete-800 justify-center">2</span>
                        <span>Πρόγραμμα Απασχόλησης</span>
                    </div>

                    {/* Line between Step 2 and Step 3 */}
                    <div className="absolute top-4  mr-6 right-40 h-1 bg-pallete-800 w-2/6"></div>

                    {/* Step 3 */}
                    <div className="text-pallete-800 z-10 text-xl font-semibold flex flex-col items-center justify-center relative">
                        <span className="rounded-full h-8 w-8 text-white flex items-center bg-pallete-800 justify-center">3</span>
                        <span>Οριστικοποίηση</span>
                    </div>
                </div>
            
            

            <p className="text-3xl font-medium mt-10 text-center">Η αγγελία σας οριστικοποιήθηκε επιτυχώς.</p>

            <FaCheckCircle className='text-9xl text-green-500 my-5 mx-auto'/>            
            <div className='w-11/12  mx-auto flex justify-center '>                    
                            <Link to='/nannyoffers'
                                    className='bg-white border-2  flex items-center justify-center text-lg font-medium w-48 border-gray-500 text-md h-14 rounded-md my-3'
                            >
                                Οι Αγγελίες μου
                            </Link>
            </div>
        </div>
    );
}


export default FormPage3;
