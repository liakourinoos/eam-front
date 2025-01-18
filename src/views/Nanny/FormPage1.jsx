import { useState,useEffect } from "react";
import PropTypes from 'prop-types';
import {cities,area} from "../../../global_assets/global_values.jsx";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
function FormPage1({ form, setForm, nextFn }) {


    const [selectedAreas,setSelectedAreas] = useState([form.rows.map(row => row.area)]);

    useEffect(() => {
        // Extract areas from form.rows, ensure they are unique and non-empty
        const areas = Array.from(new Set(form.rows.map(row => row.area).filter(area => area !== "")));
        setSelectedAreas(areas);
    }, [form.rows]); // This will run whenever form.rows changes

    return (
        <div className="w-full">
            {/* progress bar */}
            <ul className="steps w-full my-2 font-medium">
                <li className="step step-secondary text-secondary">Περιοχή Απασχόλησης</li>
                <li className="step">Πρόγραμμα Απασχόλησης</li>
                {!form.cantEdit && <li className="step">Οριστικοποίηση</li>}
            </ul>

            <p className="text-3xl font-medium my-20 text-center">Περιοχή Απασχόλησης</p>

            <div className="w-1/5 mx-auto text-xl">
                <p className=" font-medium mb-pl-2">Πόλη</p>
                <select value={form.town} 
                        onChange={(e)=>{setForm({...form, town: e.target.value , rows:[{index:1, area:"",canHost:""}]});setSelectedAreas([]); }} //kathe fora pou allazei i poli ta upoloipa trwne reset
                        className={`select select-bordered font-medium text-xl rounded-md bg-white h-12 border-2 border-gray-300 pl-2 w-full `}
                        disabled={form.cantEdit}       
                >
                    <option disabled value={""}>Επιλέξτε</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>

            </div>
            
            {/* //each row should have all its fields in one .map! */}
            <div className="w-1/6 mt-10 mx-auto">

                {form?.rows.map((row, index) =>(
                    <div key={index} className=" w-full mb-20 mx-auto ">

                        {/* koumpi diagrafis */}
                        { index!==0 && 
                            <button className=" flex items-center justify-center text-red-600 text-md font-medium rounded-md mb-2 w-full  p-2"
                                onClick={() => {
                                    const removedArea = form.rows[index]?.area; // Capture the area to be removed
                                    const updatedRows = form.rows.filter((_, i) => i !== index); // Remove the selected row
                        
                                    // Update selectedAreas by filtering out the removed area
                                    const updatedSelectedAreas = selectedAreas.filter((area) => area !== removedArea);
                        
                                    // Update state
                                    setForm({ ...form, rows: updatedRows });
                                    setSelectedAreas(updatedSelectedAreas);
                                }}
                            >
                                <MdOutlineRemoveCircleOutline className="text-2xl mr-1" />
                                Αφαίρεση Επιπλέον Περιοχής
                            </button>
                        }

                        {/* //perioxi */}
                        <div  className=' w-full mx-auto '>
                            <p className="text-l font-medium pl-2">Περιοχή</p>
                            <select value={row.area} 
                                    onChange={(e) => {
                                        const newArea = e.target.value; // The newly selected area
                                        const oldArea = row.area; // The previously selected area
                                        
                                        const updatedRows = form.rows.map((r, idx) =>
                                            idx === index ? { ...r, area: newArea} : r
                                        );
                                
                                        // Update selectedAreas: remove the old area and add the new one
                                        const updatedSelectedAreas = [
                                            ...selectedAreas.filter((area) => area !== oldArea),
                                            newArea,
                                        ];
                                
                                        // Update state
                                        setForm({ ...form, rows: updatedRows });
                                        setSelectedAreas(updatedSelectedAreas);
                                    }}
                                    className={`select select-bordered rounded-md bg-white h-12 border-2 border-gray-300 pl-2 w-full max-w-xs`}
                                    disabled={form.cantEdit}       
                            >
                                <option disabled value={""}>Επιλέξτε</option>
                                {form.town !== "" &&
                                    area.find((a) => a.city === form.town)?.areas
                                        .filter(
                                            (area) => !selectedAreas.includes(area) || area === row.area // Always include the currently selected area
                                        )
                                        .map((area, idx) => (
                                            <option key={idx} value={area}>
                                                {area}
                                            </option>
                                    ))} 
                            </select>
                        </div>

                        

                        {/* μπορει να φιλοξενησει */}
                        <div className="w-full mt-3  mx-auto ">
                            <p className="text-l font-medium pl-2">Μπορώ να φιλοξενήσω παιδί στην οικία μου</p>
                            {/* <select value={row.canHost} 
                                    onChange={(e) => {
                                        const updatedRows = form.rows.map((r, idx) =>
                                            idx === index ? { ...r, canHost: e.target.value === "true" } : r
                                        );
                                        setForm({ ...form, rows: updatedRows });
                                    }}                                    
                                    className={`select select-bordered rounded-md bg-white h-12 border-2 border-gray-300 pl-2 w-full max-w-xs`}
                                    disabled={form.cantEdit}       
                            >
                                <option disabled value={""}>Επιλέξτε</option>
                                <option value={true}>Ναι</option>
                                <option value={false}>Όχι</option>
                            </select> */}
                            <div className={`flex ml-3 mt-2  gap-3 ${form.rows[index]?.area==="" ? 'text-gray-400' :""} `}>
                                <input  type="radio" name={`radio-${index}`} checked={form.rows[index]?.canHost===true} title={ (form.rows[index]?.area==="") ? "Επιλέξτε πρώτα πόλη και περιοχή." : ""} 
                                        className="radio radio-secondary"  disabled={form.rows[index]?.area==="" || form.cantEdit} 
                                        onChange={() => {
                                            const updatedRows = form.rows.map((r, idx) =>
                                                idx === index ? { ...r, canHost: true } : r
                                            );
                                            setForm({ ...form, rows: updatedRows });
                                        }}          
                                />
                                <p className={`${form.rows[index]?.canHost===false ? 'text-gray-400': ''}`}>Ναι</p>
                            </div>
                            <div className={`flex ml-3 mt-2  gap-3 ${form.rows[index]?.area===""? 'text-gray-400' :""} `}>
                                <input  type="radio" name={`radio-${index}`} checked={form.rows[index]?.canHost===false} title={ (form.rows[index]?.area==="") ? "Επιλέξτε πρώτα πόλη και περιοχή." : ""} 
                                        className="radio radio-secondary"  disabled={form.rows[index]?.area==="" || form.cantEdit} 
                                        onChange={() => {
                                            const updatedRows = form.rows.map((r, idx) =>
                                                idx === index ? { ...r, canHost: false } : r
                                            );
                                            setForm({ ...form, rows: updatedRows });
                                        }}          
                                />
                                <p className={`${form.rows[index]?.canHost===true ? 'text-gray-400': ''}`}>Όχι</p>
                            </div>
                        </div>
                        
                        



                    </div>
                ))}
            </div>
            {/* //check if there are more areas to add */}
            { area.find((a) => a.city === form.town)?.areas.length > selectedAreas.length   && !form.cantEdit &&

                    <button onClick={() => {
                                const updatedRows = [
                                    ...form.rows,
                                    { index: form.rows.length , area: "", canHost: "" }
                                ];
                                setForm({ ...form, rows: updatedRows });
                            }}
                            className='flex items-center justify-center mx-auto rounded-md font-medium text-2xl mt-10 p-2'
                    >
                        <MdAddCircleOutline className="text-3xl mr-2"/>
                        Προσθήκη Επιπλέον Περιοχής
                    </button>
            }
            
            <div className='w-11/12 mt-10  mx-auto flex justify-end '>                    
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
