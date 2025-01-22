import './App.css';
import Footer from './generic components/Footer.jsx';
import Header from './generic components/Header.jsx';
import { cities, area } from "../global_assets/global_values.jsx";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RenderHeaderNavbar } from "../global_assets/global_functions.jsx";
import { useAuth } from './customHooks.jsx';
import SlidingImageSlideshow from './SlideShow.jsx'; // Import the slideshow component

function App() {
  const [town, setTown] = useState("");
  const [location, setLocation] = useState("");

  const { userData, loading } = useAuth(); // Access the user from the context  

  if (loading) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <span className='text-3xl font-bold'>Φόρτωση...</span>
      </div>
    );
  }

  if (!loading)
    return (
      <div className="w-full h-screen flex flex-col overflow-hidden justify-between">
        {RenderHeaderNavbar(userData, 0)}
        {/* Main Page */}
        <div className="w-full flex flex-grow relative">
          {/* Background */}
          <div className="h-full w-3/5 absolute top-0 right-0 z-0">
            <SlidingImageSlideshow /> {/* Replace the background image logic with the slideshow */}
          </div>

          {/* Main Div */}
          <div
            className="w-full h-full flex flex-col justify-center absolute  top-0 left-0 z-10 bg-white"
            style={{
              boxShadow: "10px 10px 20px rgba(0, 0, 139, 0.7)", // Apply shadow here
              clipPath: "polygon(0 100%, 0 0, 50% 0, 75% 0, 45% 100%, 50% 100%)",
            }}
          >
            <div className='w-1/2 my-auto h-full flex flex-col gap-10'>
              <p className='ml-32 mt-20 text-5xl text-pallete-800 font-extrabold'>Οι <span className="underline">ΤΕΛΕΥΤΑIΟΙ</span> όταν έχει να κάνει με την φροντίδα του παιδιού σας!</p>

              {/* Input Div */}
              <div className='pl-20 gap-7 h-full flex flex-col justify-center items-center pr-36 text-2xl'>
                {/* Town Filter */}
                <div>
                  <p className='font-semibold'>Πόλη</p>
                  <select
                    onChange={(e) => {
                      setTown(e.target.value);
                      setLocation("");
                    }}
                    value={town}
                    className="select text-lg select-bordered rounded-md h-14 border-2 border-black pl-2 bg-white w-80 max-w-xs"
                  >
                    <option disabled value={""}>Επιλέξτε</option>
                    {cities.map((city, idx) => (
                      <option key={idx} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <p className='font-semibold'>Περιοχή</p>
                  <select
                    onChange={(e) => { setLocation(e.target.value); }}
                    value={location}
                    className="select text-lg mt-2 select-bordered rounded-md h-14 border-2 border-black pl-2 bg-white w-80 max-w-xs"
                  >
                    <option disabled value={""}>Επιλέξτε</option>
                    {town !== "" &&
                      area.find(a => a.city === town)?.areas.map((area, idx) => (
                        <option key={idx} value={area}>{area}</option>
                      ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className='w-80 mb-28 mt-2 flex justify-end'>
                  <Link
                    to={{
                      pathname: '/search',
                    }}
                    state={{ selectedTown: town, selectedLocation: location }}
                    className='rounded-md flex items-center justify-center font-semibold text-center text-xl bg-pallete-800 hover:bg-pallete-600 w-40 h-12 text-white py-1'
                  >
                    <span>Συνέχεια</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
}

export default App;
