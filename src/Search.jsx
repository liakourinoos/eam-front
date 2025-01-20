
import Footer from './generic components/Footer.jsx'
import OfferProfile from "./views/Search/OfferProfile.jsx";
import { useState, useEffect, useContext } from "react";
// for calendar
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { cities, area, geitonia } from "../global_assets/global_values.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { RenderHeaderNavbar } from "../global_assets/global_functions.jsx";
import { useAuth } from './customHooks.jsx'
import { fetchNannies } from './FetchFunctions.jsx'
import { useQuery } from '@tanstack/react-query';
import { searchAvailableNannies } from './FetchFunctions.jsx';
function Search() {

    const loc = useLocation();
    const navigate = useNavigate();
    const { userData, loading } = useAuth();

    const {
        selectedTown = "",
        selectedLocation = "",
    } = loc.state || {};



    const [filter, setFilter] = useState({
        town: selectedTown,
        location: selectedLocation,
        atMyHouse: "",
        childAge: "",
        gender: "",
        selectedDate: null,
        timeType: "",
        monthsSlider: 0,
        experienceSlider: 0
    })
    const handleChange = (field, value) => {
        if(field ==="selectedDate") console.log("starting date is: " + value)
        setFilter(prevFilter => ({ ...prevFilter, [field]: value }));
    };

    const { data, isLoading } = useQuery({
        queryFn: ({ signal }) => searchAvailableNannies(filter, { signal }),
        queryKey: ['searchNannies', filter],
        enabled: !!userData,
        refetchOnWindowFocus: false,
        staleTime: 0,
        cacheTime: 0
    });

    useEffect(() => {
        if (userData) {
            searchAvailableNannies(filter);
        }
    }, [filter, userData]);

    // Clear state on refresh
    useEffect(() => {
        if (loc.state) {
            navigate(loc.pathname, { replace: true, state: null });
        }
    }, [loc, navigate]);


    
    const today = new Date();



    // const { data, isLoading } = useQuery({
    //     queryFn: () => fetchNannies(),
    //     queryKey: ['nannies'],
    //     // enabled: !!userData
    // })

    



    if (loading )
        return (
            <div className="w-full h-screen bg-white flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )



    if (!loading)
        return (
            <div className="">

                {RenderHeaderNavbar(userData)}

                <div className="w-full flex h-screen justify-between bg-white">

                    {/* left div - filters */}
                    <div className="w-1/3 h-full flex flex-col items-center overflow-y-auto py-10 ">
                        <div className="w-3/4 bg-gray-100 shadow-lg rounded-md shadow-gray-700 flex flex-col gap-3 py-5 items-center justify-center">
                            <p className="text-3xl font-bold">Φίλτρα Αναζήτησης</p>

                            {/* Town Filter */}
                            <div>
                                <p className='text-l'>Πόλη</p>
                                <select onChange={(e) => { handleChange('town', e.target.value); handleChange('location', ""); handleChange('atMyHouse', ""); }} value={filter.town} className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                    <option disabled value={""}>Επιλέξτε</option>
                                    {cities.map((city, idx) =>
                                        <option key={idx} value={city}>{city}</option>
                                    )}
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div>
                                <p className='text-l'>Περιοχή</p>
                                <select value={filter.location} onChange={(e)=>{handleChange('location',e.target.value); handleChange('atMyHouse',true);}} className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                    <option disabled value={""}>Επιλέξτε</option>
                                    {filter.town !== "" &&
                                        area.find(a => a.city === filter.town)?.areas.map((area, idx) =>
                                            <option key={idx} value={area}>{area}</option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className='w-60 flex flex-col gap-2 '>
                                <p className='text-l'>Μπορεί ο επαγγελματίας να φιλοξενήσει στην οικία του</p>
                                <div className={`flex gap-3 ${filter.location === "" ? 'text-gray-400' : ""}`}>
                                    <input type="radio" name="radio-1" checked={filter.atMyHouse === true} title={(filter.location === "" || filter.town === "") ? "Επιλέξτε πρώτα πόλη και περιοχή." : ""} className="radio radio-secondary" onChange={() => handleChange( 'atMyHouse',  true) } disabled={filter.location === ""} />
                                    <p>Ναι</p>
                                </div>
                                <div className={`flex gap-3 ${filter.location === "" ? 'text-gray-400' : ""}`}>
                                    <input type="radio" name="radio-1" checked={filter.atMyHouse === false} title={(filter.location === "" || filter.town === "") ? "Επιλέξτε πρώτα πόλη και περιοχή." : ""} className="radio radio-secondary" onChange={() => handleChange('atMyHouse', false )} disabled={filter.location === ""} />
                                    <p>Όχι</p>
                                </div>
                            </div>

                            <div className='flex w-60 flex-col gap-2'>
                                <p className='text-l'>Τύπος Απασχόλησης</p>
                                <div className="flex gap-3">
                                    <input type="radio" name="radio-type" checked={filter.timeType === ""} className="radio radio-secondary" onChange={() => handleChange('timeType',  "" )} />
                                    <p>Όλα</p>
                                </div>
                                <div className="flex gap-3">
                                    <input type="radio" name="radio-type" checked={filter.timeType === "full-time"} className="radio radio-secondary" onChange={() => handleChange( 'timeType', "full-time" )} />
                                    <p>Πλήρης</p>
                                </div>
                                <div className="flex gap-3">
                                    <input type="radio" name="radio-type" checked={filter.timeType === "part-time"} className="radio radio-secondary" onChange={() => handleChange('timeType', "part-time" )} />
                                    <p>Μερική</p>
                                </div>
                            </div>

                            <div className='w-60 flex flex-col gap-2 '>
                                <p className='text-l'>Ηλικία Παιδιού</p>
                                <div className="flex gap-3">
                                    <input type="radio" name="radio-2" checked={filter.childAge === "0-1"} className="radio radio-secondary" onChange={() => handleChange( 'childAge',"0-1" )} />
                                    <p>0-1 έτους</p>
                                </div>
                                <div className="flex gap-3">
                                    <input type="radio" name="radio-2" checked={filter.childAge === "1-3"} className="radio radio-secondary" onChange={() => handleChange( 'childAge',"1-3" )} />
                                    <p>1-3 ετών</p>
                                </div>
                                <div className="flex gap-3">
                                    <input type="radio" name="radio-2" checked={filter.childAge === "3-5"} className="radio radio-secondary" onChange={() => handleChange( 'childAge', "3-5" )} />
                                    <p>3-5 ετών</p>
                                </div>
                            </div>

                            <div className="w-60 flex flex-col gap-1 ">
                                <p className="text-l">Χρόνια Εμπειρίας</p>
                                <input onChange={(e) => handleChange('experienceSlider', Number(e.target.value) )} type="range" min={0} max={4} value={filter.experienceSlider} className="range range-secondary bg-white w-56 mx-auto" step="1" />
                                <div className="flex w-52 mx-auto justify-between text-xs">
                                    <span>0</span>
                                    <span>1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span>4+</span>
                                </div>
                            </div>

                            <div className='w-60 flex flex-col gap-2 '>
                                <p className='text-l'>Φύλο</p>
                                <div className="flex gap-3">
                                    <input type="radio" name="radio-3" checked={filter.gender === ""} className="radio radio-secondary" onChange={() => handleChange('gender', "" )} />
                                    <p>Όλα</p>
                                </div>
                                <div className="flex gap-3">
                                    <input type="radio" name="radio-3" checked={filter.gender === true} className="radio radio-secondary" onChange={() => handleChange('gender', true )} />
                                    <p>Αρσενικό</p>
                                </div>
                                <div className="flex gap-3">
                                    <input type="radio" name="radio-3" checked={filter.gender === false} className="radio radio-secondary" onChange={() => handleChange( 'gender',  false )} />
                                    <p>Θηλυκό</p>
                                </div>
                            </div>

                            <div className="w-60 flex flex-col gap-1">
                                <p className="text-l">Διάστημα Απασχόλησης (μήνες)</p>
                                <input onChange={(e) => handleChange( 'monthsSlider', Number(e.target.value) )} type="range" min={1} max={9} value={filter.monthsSlider} className="range range-secondary w-60 mx-auto bg-white" step="1" />
                                <div className="flex w-56 mx-auto justify-between text-xs">
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

                            <div className="w-60 flex mt-2 flex-col gap-1">
                                <p className="text-l">Ημερομηνία Έναρξης</p>
                                <DatePicker
                                    selected={filter.selectedDate}
                                    onChange={(date) => handleChange( 'selectedDate',date )}
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

                    {/* left side  */}
                    <div className="w-2/3 flex-grow   overflow-y-auto p-5">
                        {isLoading && 
                                <div className='w-full h-full flex items-center justify-center text-2xl  font-medium'>
                                    <span className=''>Αναζήτηση Επαγγελματιών...</span>
                                </div> }
                        {!isLoading && data?.length===0 && 
                                <div className='w-full h-full flex items-center justify-center text-3xl text-gray-500 font-semibold'>
                                    <p>Δε βρέθηκαν επαγγελματίες με βάση τα φίλτρα σας.</p>
                                </div>        
                        } 
                        {!isLoading && data?.length >0 && data?.map((nanny, idx) => (
                            <OfferProfile key={idx} id={nanny?.userId} name={nanny?.name} surname={nanny?.surname} bio={nanny?.bio} rating={nanny?.rating} img={nanny?.img} ratingCount={nanny?.ratingCount} />

                        ))}

                    </div>
                </div>
                <Footer />
            </div>
        );
}

export default Search;
