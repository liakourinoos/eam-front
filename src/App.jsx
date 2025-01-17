import './App.css'
import Footer from './generic components/Footer.jsx'
import Header from './generic components/Header.jsx'
import { cities,area,geitonia } from "../global_assets/global_values.jsx";
import { useState, useEffect,useContext } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { RenderHeaderNavbar } from "../global_assets/global_functions.jsx";
import {useAuth} from './customHooks.jsx'
function App() {



  const images = [
    'https://images.pexels.com/photos/6974310/pexels-photo-6974310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Image 1
    'https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/829365088InfantNanny.jpg=ws1280x960', // Image 2
    'https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Image 3
  ];

  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState(0);
  // useEffect to change the image every 3 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through images
  //   }, 3000); // Change image every 3000ms (3 seconds)

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, [images.length]);

  const [animationClass, setAnimationClass] = useState('slide-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass('slide-out');
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setAnimationClass('slide-in');
      }, 500); // Duration of slide-out animation
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);


  const [town,setTown] = useState("");
  const [location,setLocation] = useState("")


  const { userData,loading } = useAuth(); // Access the user from the context  


  
  if(loading) return <div className="w-full h-screen bg-white flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                      </div>


  if(!loading) 
    return(
      <div className='w-full h-screen flex flex-col overflow-hidden justify-between'>
        {RenderHeaderNavbar(userData,0)}
        {/* main page */}
        <div className="w-full flex flex-grow relative   ">

         {/* Background */}
        <div className="h-full w-3/5 absolute top-0 right-0 z-0">
          <div className="image-container">
            <img
              src={images[currentIndex]}
              alt="Background"
              className={`object-cover w-full h-full ${animationClass}`}
            />
          </div>
        </div>
      {/* main div */}
          <div
          className="w-full  h-full flex flex-col  justify-center absolute top-0 left-0 z-10 bg-pink-200 "
          style={{
            boxShadow: "10px 10px 20px rgba(0, 0, 139, 0.7)", // Apply shadow here
            clipPath: "polygon(0 100%, 0 0, 50% 0, 75% 0, 45% 100%, 50% 100%)",
          }}
          >
            <div className='w-1/2 my-auto h-full flex flex-col gap-10 '>
                  <p className=' ml-32 mt-20 text-5xl font-extrabold'>Βρείτε την φροντίδα που σας αξίζει!</p>
                  
                  {/* input div */}
                  <div className='pl-20 gap-7 h-full flex flex-col justify-center items-center pr-36 text-2xl  '>

                  {/* Town Filter */}
                    <div>
                      <p className='font-semibold'>Πόλη</p>
                      <select onChange={(e) => { setTown(e.target.value); setLocation("");  }} value={town} className="select text-xl select-bordered rounded-md h-16  border-2 border-black pl-2 bg-white w-80 max-w-xs">
                      <option disabled value={""}>Επιλέξτε</option>
                        {cities.map((city, idx) =>
                            <option key={idx} value={city}>{city}</option>
                        )}
                      </select>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <p className='font-semibold'>Περιοχή</p>
                      <select onChange={(e) => {  setLocation(e.target.value);  }} value={location} className="select text-xl mt-2 select-bordered rounded-md h-16  border-2 border-black pl-2 bg-white w-80 max-w-xs">
                        <option disabled value={""}>Επιλέξτε</option>
                          {town!=="" && 
                            area.find(a => a.city === town)?.areas.map((area, idx) =>
                            <option key={idx} value={area}>{area}</option>
                          )}
                      </select>
                    </div>

                        



                    <div className='w-80 mb-28 mt-2 flex justify-end  '>
                      <Link to={{pathname:'/search',
                                
                            }} 
                            state={{selectedTown:town,selectedLocation:location}}
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
