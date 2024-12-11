import Header from "./generic components/header";
import Footer from "./generic components/footer";
import OfferProfile from "./views/OfferProfile.jsx";
import { useState,useEffect } from "react";
// for calendar
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import { cities } from "./global_values.jsx";

function Search(){

    const [experienceSlider,setExperienceSlider] = useState(0);
    const  handleExperienceChange=(e)=>{
        setExperienceSlider(Number(e.target.value));
    }

    const [yearsSlider,setYearsSlider] = useState(0);
    const  handleYearsSlider=(e)=>{
        setYearsSlider(Number(e.target.value));
    }


    //for calendar
    const [selectedDate, setSelectedDate] = useState(null);
    const today = new Date();
  


    return(
        <div className="">
            <Header/>
            <div className="w-full flex h-screen justify-between bg-slate-300">

                {/* left div - filters */}
                <div className="w-1/3 h-full flex flex-col items-center overflow-y-auto py-10 ">
                    <div className="w-3/4 bg-gray-200 shadow-lg rounded-md shadow-gray-700 flex flex-col gap-3 py-5 items-center justify-center">
                        <p className="text-3xl font-bold">Φίλτρα Αναζήτησης</p>

                        
                        <div > 
                            <p className='text-l'>Πόλη</p>
                            <select className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled selected>Επιλέξτε</option>
                                {cities.map((city,idx)=>
                                    <option key={idx}> {city}</option>
                                )}
                            </select>
                        </div>
                        <div > 
                            <p className='text-l'>Περιοχή</p>
                            <select className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled selected>Επιλέξτε</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div>
                        <div > 
                            <p className='text-l'>Γειτονιά</p>
                            <select className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled selected>Επιλέξτε</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div>
                        <div className=" flex flex-col items-center "> 
                            <p className='text-l  w-60'>Απασχόληση επαγγελματία στην οικία μου</p>
                            <select className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled selected>Επιλέξτε</option>
                                <option>Ναι</option>
                                <option>Όχι</option>
                            </select>
                        </div>
                        <div > 
                            <p className='text-l'>Ηλικία Παιδιού</p>
                            <select className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled selected>Επιλέξτε</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div>

                        <div className="w-60 flex flex-col gap-1">
                            <p className="text-l">Χρόνια Εμπειρίας</p>
                            <input onChange={handleExperienceChange} type="range" min={0} max={4} value={experienceSlider} className="range" step="1" />
                            <div className="flex w-full justify-between  text-xs">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4+</span>
                            </div>
                        </div>

                        <div > 
                            <p className='text-l'>Φύλο</p>
                            <select className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled selected>Επιλέξτε</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div>

                        <div className="w-60 flex flex-col gap-1">
                            <p className="text-l">Διάστημα Απασχόλησης</p>
                            <input onChange={handleYearsSlider} type="range" min={0} max={9} value={yearsSlider} className="range" step="1" />
                            <div className="flex w-full justify-between  text-xs">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                            </div>
                        </div>

                        <div>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                minDate={today}
                                filterDate={(date) => date >= today}
                                open={true} // Make the calendar always open
                                showPopperArrow={false} // Hide the arrow on the calendar
                                dateFormat="yyyy-MM-dd" // Adjust the format of the displayed date
                                inline // This will render the calendar directly without an input
                                disabledKeyboardNavigation // Disable keyboard navigation for this input
                                className="calendar-only"
                            />
                        </div>
                        
                        
                        
                    </div>
                </div>

                {/* right div -results */}
                <div className=" w-2/3 h-full  overflow-y-auto p-5 ">                   
                <OfferProfile/> 
                    <OfferProfile/> <OfferProfile/> <OfferProfile/> <OfferProfile/> <OfferProfile/> <OfferProfile/> 
                    <OfferProfile/> <OfferProfile/> <OfferProfile/>  <OfferProfile/> <OfferProfile/> <OfferProfile/> 
                    <OfferProfile/> 
                    <OfferProfile/> <OfferProfile/> <OfferProfile/> <OfferProfile/> <OfferProfile/> <OfferProfile/> 
                    <OfferProfile/> <OfferProfile/> <OfferProfile/>  <OfferProfile/> <OfferProfile/> <OfferProfile/> 
             <OfferProfile/> 
                    <OfferProfile/> <OfferProfile/> <OfferProfile/> <OfferProfile/> <OfferProfile/> <OfferProfile/> 
                    <OfferProfile/> <OfferProfile/> <OfferProfile/>  <OfferProfile/> <OfferProfile/> <OfferProfile/> 
            
                    
                
                </div>




            </div>
            <Footer/>   
        </div>
    )
}
export default Search;