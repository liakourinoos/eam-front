
import Footer from './generic components/Footer.jsx'
import OfferProfile from "./views/Search/OfferProfile.jsx";
import { useState, useEffect,useContext } from "react";
// for calendar
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { cities,area,geitonia } from "../global_assets/global_values.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { RenderHeaderNavbar } from "../global_assets/global_functions.jsx";
import {useAuth} from './customHooks.jsx'
import {fetchNannies} from './FetchFunctions.jsx'
import {  useQuery } from '@tanstack/react-query';

function Search() {

    const loc = useLocation();
    const navigate = useNavigate();

    const { 
        selectedTown = "", 
        selectedLocation = "", 
    } = loc.state || {};

    // States for inputs
    const [town, setTown] = useState(selectedTown);
    const [location, setLocation] = useState(selectedLocation);
    const [atMyHouse,setAtMyHouse]= useState("")
    const [childAge,setChildAge] = useState("");
    const [gender,setGender] = useState("")
    const [experienceSlider, setExperienceSlider] = useState(0);
    const handleExperienceChange = (e) => {
        setExperienceSlider(Number(e.target.value));
    };

    const [yearsSlider, setYearsSlider] = useState(0);
    const handleYearsSlider = (e) => {
        setYearsSlider(Number(e.target.value));
    };

    // Clear state on refresh
    useEffect(() => {
        if (loc.state) {
            navigate(loc.pathname, { replace: true, state: null });
        }
    }, [loc, navigate]);



    // For calendar
    const [selectedDate, setSelectedDate] = useState(null);
    const today = new Date();

    const { userData,loading } = useAuth();


    const {data,isLoading} = useQuery({
        queryFn:()=>fetchNannies(),
        queryKey: ['nannies'],
        // enabled: !!userData
    })

    if(loading || isLoading) 
        return(
            <div className="w-full h-screen bg-white flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )

        

    if(!loading && !isLoading)
    return (
        <div className="">
        
            {RenderHeaderNavbar(userData)}

            <div className="w-full flex h-screen justify-between bg-pallete-50">

                {/* left div - filters */}
                <div className="w-1/3 h-full flex flex-col items-center overflow-y-auto py-10 ">
                    <div className="w-3/4 bg-gray-200 shadow-lg rounded-md shadow-gray-700 flex flex-col gap-3 py-5 items-center justify-center">
                        <p className="text-3xl font-bold">Φίλτρα Αναζήτησης</p>

                        {/* Town Filter */}
                        <div>
                            <p className='text-l'>Πόλη</p>
                            <select onChange={(e) => { setTown(e.target.value); setLocation(""); setAtMyHouse("");  }} value={town} className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled value={""}>Επιλέξτε</option>
                                {cities.map((city, idx) =>
                                    <option key={idx} value={city}>{city}</option>
                                )}
                            </select>
                        </div>

                        {/* Location Filter */}
                        <div>
                            <p className='text-l'>Περιοχή</p>
                            <select onChange={(e) => {  setLocation(e.target.value); setAtMyHouse(""); }} value={location} className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled value={""}>Επιλέξτε</option>
                                {town!=="" && 
                                    area.find(a => a.city === town)?.areas.map((area, idx) =>
                                        <option key={idx} value={area}>{area}</option>
                                    )
                                }
                            </select>
                        </div>

                        

                        {/* Other Filters */}
                        {/* <div className="flex flex-col items-center">
                            <p className='text-l w-60'>Απασχόληση επαγγελματία στην οικία μου</p>
                            <select value={location==="" ? "" : atMyHouse} onChange={(e)=>setAtMyHouse(e.target.value==="true")} className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled value={""}>Επιλέξτε</option>
                                { location!=="" && <option value={true}>Ναι</option>}
                                { location!=="" && <option value={false}>Όχι</option>}
                            </select>
                        </div> */}
                        <div className='w-60 flex flex-col gap-2 '>
                            <p className='text-l'>Απασχόληση επαγγελματία στην οικία μου</p>
                            
                            <div className={`flex  gap-3 ${location==="" ? 'text-gray-400' :""}`}>
                                <input type="radio" name="radio-1" checked={atMyHouse===true} title={(location==="" || town==="" )  ? "Επιλέξτε πρώτα πόλη και περιοχή." : ""}  className="radio radio-secondary" onChange={()=>setAtMyHouse(true)} disabled={location===""} />
                                <p>Ναι</p>
                            </div>
                            <div className={`flex  gap-3 ${location==="" ? 'text-gray-400' :""}`}>
                                <input type="radio" name="radio-1" checked={atMyHouse===false} title={ (location==="" || town==="") ? "Επιλέξτε πρώτα πόλη και περιοχή." : ""} className="radio radio-secondary" onChange={()=>setAtMyHouse(false)}  disabled={location===""} />
                                <p>Όχι</p>
                            </div>
                        </div>

                        {/* <div>
                            <p className='text-l'>Ηλικία Παιδιού</p>
                            <select value={childAge} onChange={(e)=>setChildAge(e.target.value)} className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled value={""}>Επιλέξτε</option>
                                <option>0-1</option>
                                <option>1-3</option>
                                <option>3-5</option>
                            </select>
                        </div> */}
                        <div className='w-60 flex flex-col gap-2 '>
                            <p className='text-l'>Ηλικία Παιδιού</p>
                           
                            <div className="flex  gap-3 ">
                                <input type="radio" name="radio-2" className="radio radio-secondary" onChange={()=>setChildAge("0-1")} />
                                <p>0-1</p>
                            </div>
                            <div className="flex gap-3">
                                <input type="radio" name="radio-2" className="radio radio-secondary" onChange={()=>setChildAge("1-3")} />
                                <p>1-3</p>
                            </div>
                            <div className="flex gap-3">
                                <input type="radio" name="radio-2" className="radio radio-secondary" onChange={()=>setChildAge("3-5")}/>
                                <p>3-5</p>
                            </div>
                        </div>

                        {/* Experience Slider */}
                        <div className="w-60 flex flex-col gap-1">
                            <p className="text-l">Χρόνια Εμπειρίας</p>
                            <input onChange={handleExperienceChange} type="range" min={0} max={4} value={experienceSlider} className="range range-secondary" step="1" />
                            <div className="flex w-full justify-between text-xs">
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4+</span>
                            </div>
                        </div>

                        <div className='w-60 flex flex-col gap-2 '>
                            <p className='text-l'>Φύλο</p>
                            {/* <select value={gender} onChange={(e)=>setGender(e.target.value)} className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled value={""}>Επιλέξτε</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select> */}
                            <div className="flex  gap-3 ">
                                <input type="radio" name="radio-3" className="radio radio-secondary" onChange={()=>setGender("")} />
                                <p>Άλλο</p>
                            </div>
                            <div className="flex gap-3">
                                <input type="radio" name="radio-3" className="radio radio-secondary" onChange={()=>setGender(true)} />
                                <p>Αρσενικό</p>
                            </div>
                            <div className="flex gap-3">
                                <input type="radio" name="radio-3" className="radio radio-secondary" onChange={()=>setGender(false)}/>
                                <p>Θηλυκό</p>
                            </div>
                        </div>

                        {/* Employment Period Slider */}
                        <div className="w-60 flex flex-col gap-1">
                            <p className="text-l">Διάστημα Απασχόλησης (μήνες)</p>
                            <input onChange={handleYearsSlider} type="range" min={1} max={9} value={yearsSlider} className="range range-secondary" step="1" />
                            <div className="flex w-full mx-auto justify-between text-xs">
                                {/* <span>0</span> */}
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

                        {/* Calendar */}
                        <div className="w-60 flex mt-2 flex-col gap-1">
                            <p className="text-l">Ημερομηνία Έναρξης</p>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                minDate={today}
                                filterDate={(date) => date >= today}
                                inline
                                disabledKeyboardNavigation
                                dateFormat="yyyy-MM-dd"
                                className="calendar-only"
                            />
                        </div>
                    </div>
                </div>

                {/* Right div - results */}
                <div className="w-2/3 h-full overflow-y-auto p-5">
                    {data?.map((nanny,idx)=>(
                        <OfferProfile key={idx} id={nanny?.id} name={nanny?.name} surname={nanny?.surname} bio={nanny?.bio} rating={nanny?.rating} img={nanny?.img} ratingCount={nanny?.ratingCount}/>

                    ))}

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Search;
