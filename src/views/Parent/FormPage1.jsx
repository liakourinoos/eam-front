import { useState } from "react";
import PropTypes from 'prop-types';

function FormPage1({ form, setForm, nextFn }) {
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
        }

        setErrors(prevState => ({ ...prevState, [name]: error }));
    };

    return (
        <div className="w-full">
            {/* progress bar */}
            <ul className="steps w-full my-2 font-medium">
                <li className="step step-secondary text-secondary">Στοιχεία Επαγγελματία</li>
                <li className="step">Περιοχή και Πρόγραμμα</li>
                {!form.cantEdit && <li className="step">Οριστικοποίηση</li>}
            </ul>

            <p className="text-3xl font-medium my-20 text-center">Στοιχεία Επαγγελματία</p>

            <div className="w-1/6 mx-auto">
                <p className="text-xl ml-1 font-medium">Όνομα</p>
                {errors.name && <p className="text-red-500 text-md ">{errors.name}</p>}

                <input
                    type="text"
                    className={`w-full font-medium h-10 border-2 rounded-md pl-2 mt-1 ${form.cantEdit ? "bg-gray-300": 'bg-white'}  ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    value={form.name}
                    name="name"
                    disabled={form.cantEdit}
                    onChange={handleChange}
                />
            </div>

            <div className="w-1/6 mx-auto mt-4">
                <p className="text-xl ml-1 font-medium">Επώνυμο</p>
                {errors.surname && <p className="text-red-500 text-md">{errors.surname}</p>}

                <input
                    type="text"
                    className={`w-full font-medium h-10 border-2 rounded-md pl-2 mt-1 ${form.cantEdit ? "bg-gray-300": 'bg-white'} ${errors.surname ? 'border-red-500' : 'border-gray-300'}`}
                    value={form.surname}
                    name="surname"
                    disabled={form.cantEdit}
                    onChange={handleChange}
                />
            </div>

            <div className="w-1/6 mx-auto mt-4">
                <p className="text-xl ml-1 font-medium">AMKA</p>
                {errors.AMKA && <p className="text-red-500 text-md">{errors.AMKA}</p>}

                <input
                    type="text"
                    className={`w-full font-medium h-10 border-2 rounded-md pl-2 mt-1 ${form.cantEdit ? "bg-gray-300": 'bg-white'} ${errors.AMKA ? 'border-red-500' : 'border-gray-300'}`}
                    value={form.AMKA}
                    name="AMKA"
                    disabled={form.cantEdit}

                    onChange={handleChange}
                />
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

FormPage1.propTypes = {
    form: PropTypes.object.isRequired,
    setForm: PropTypes.func.isRequired,
    nextFn: PropTypes.func.isRequired,
};

export default FormPage1;
