import './App.css'
import Footer from './generic components/Footer.jsx'
import Header from './generic components/Header.jsx'
import { cities,area,geitonia } from "../global_assets/global_values.jsx";
import { useState, useEffect,useContext } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { RenderHeaderNavbar } from "../global_assets/global_functions.jsx";
import {UserContext} from './customHooks.jsx'
import { useQuery } from '@tanstack/react-query';
import {Login} from './FetchFunctions.jsx'
// import ParentSettings from './ParentSettings.jsx';
function App() {



  const images = [
    'https://images.pexels.com/photos/6974310/pexels-photo-6974310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Image 1
    'https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/829365088InfantNanny.jpg=ws1280x960', // Image 2
    'https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Image 3
  ];

  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState(0);
  // useEffect to change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through images
    }, 3000); // Change image every 3000ms (3 seconds)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  const [town,setTown] = useState("");
  const [location,setLocation] = useState("")
  const [neighborhood,setNeighborhood] = useState("")


  const { userData, setUserData } = useContext(UserContext);
  const nav=useNavigate();

    useEffect(() => {
      if (userData) {
          // Navigate to /search or any other route after user is logged in
          nav("/search");
      }
  }, [userData, nav]); 


  const email = 'ilias@gmail.com';
  const password='1'

  const {data:loginData,isLoading}= useQuery({
    queryFn: ()=> Login(email, password),
    queryKey: ['login']
  })

 
  if(!userData) return(
    <div className='w-full h-screen overflow-hidden flex flex-col justify-between'>
      {/* <Header/> */}
      {RenderHeaderNavbar(userData)}
      {/* main page */}
      <div className="w-full flex flex-grow relative   ">

        {/* Background) */}
        <div
          className=" h-full w-3/5 absolute top-0 right-0 z-0"
        >
          <div className="w-full h-full">
            <img
              src={images[currentIndex]}
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
    {/* main div */}
        <div
        className="w-full overflow-y-auto h-full flex flex-col  justify-center absolute top-0 left-0 z-10 bg-pink-100"
        style={{
          boxShadow: "10px 10px 20px rgba(0, 0, 139, 0.7)", // Apply shadow here
          clipPath: "polygon(0 100%, 0 0, 50% 0, 75% 0, 45% 100%, 50% 100%)",
        }}
        >
          <div className=' w-1/2 my-auto h-full flex flex-col gap-10 '>
                <p className=' ml-32 mt-10 text-3xl font-extrabold'>Βρείτε την φροντίδα που σας αξίζει!</p>
                
                {/* input div */}
                <div className='pl-5 gap-7 h-full flex flex-col my-auto '>

                 {/* Town Filter */}
                  <div>
                    <p className='text-l'>Πόλη</p>
                    <select onChange={(e) => { setTown(e.target.value); setLocation(""); setNeighborhood(""); }} value={town} className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                    <option disabled value={""}>Επιλέξτε</option>
                      {cities.map((city, idx) =>
                          <option key={idx} value={city}>{city}</option>
                      )}
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <p className='text-l'>Περιοχή</p>
                    <select onChange={(e) => {  setLocation(e.target.value); setNeighborhood(""); }} value={location} className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                      <option disabled value={""}>Επιλέξτε</option>
                        {town!=="" && 
                          area.find(a => a.city === town)?.areas.map((area, idx) =>
                          <option key={idx} value={area}>{area}</option>
                        )}
                    </select>
                  </div>

                        {/* Neighborhood Filter */}
                        <div>
                            <p className='text-l'>Γειτονιά</p>
                            <select onChange={(e) => { setNeighborhood(e.target.value) }} value={neighborhood} className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs">
                                <option disabled value={""}>Επιλέξτε</option>
                                {location!=="" && 
                                    geitonia.find(g => g.area === location)?.geitonies.map((geitonia, idx) =>
                                        <option key={idx} value={geitonia}>{geitonia}</option>
                                    )
                                }
                            </select>
                        </div>



                  <div className='w-full mb-32 flex justify-end pr-60'>
                    <Link to={{pathname:'/search',
                              
                          }} 
                          state={{selectedTown:town, selectedNeighborhood:neighborhood,selectedLocation:location}}
                          className='rounded-md flex items-center justify-center text-center text-xl bg-pink-600 w-40 h-12 text-white py-1'>
                      <span>Συνέχεια</span>
                    </Link>
                    
                  </div>
                
                </div>

          </div>

        </div>




      </div>

      <Footer/>
    </div>
  )
}

export default App;
