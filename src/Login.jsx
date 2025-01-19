import Header from "./generic components/Header";
import Footer from "./generic components/Footer";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { useAuth } from './customHooks.jsx'; // Custom hook to get the auth context

function Login() {
  const nav = useNavigate();
  const { login, loading:isLoading } = useAuth(); // Get login function and user data from context  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const from = location.state || "/";


  const toggleVisibility = () => setPasswordVisibility((pV) => !pV);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("handleLogin started"); // Debugging entry point
    try {
      const user = await login(email, password); // Call actual login function
  
      if (user) {
        setMessage(`Welcome back, ${user.email}`);
        
        // not sure where im supposed to redirect...
        if(user?.role===false)
          nav("/nannyOffers"); 
        else{ //im a user that just logged in after pressing contact, must go to the next page
          if(from==="/") nav("/search");
          else
            nav(from); // Redirect to previous page
        }


      } else {
        setMessage("Unexpected error: Login failed without errors.");
      }
    } catch (error) {
      // console.error("Error in handleLogin:", error.message); // Log error details

      if(error.message){
        // if(error.message==="Firebase: Error (auth/invalid-email).") setMessage("Λάθος email ή κωδικός πρόσβασης."); // Update message state
        // else setMessage(error.message);
        setMessage("Λάθος email ή κωδικός πρόσβασης.")
      }
    } finally {
      console.log("handleLogin finished"); // Debugging exit point
    }
    setPassword(""); // Clear password field after login
    setEmail("")

  };
  



  const [emailError, setEmailError] = useState("");

    useEffect(() => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail && email.length > 0) {
            setEmailError("Το email δεν έχει έγκυρη μορφή.");
        } else {
            setEmailError("");
        }
    }, [email]);

    const validInput = () => {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const isPasswordProvided = password.length > 0;

      return isValidEmail && isPasswordProvided;
    };

  return (
    <div className="w-full min-h-screen flex flex-col overflow-hidden justify-between bg-pink-100 ">
      <Header />

      <div className="w-full h-full overflow-y-auto flex flex-col items-center py-20 ">
        <form className="w-2/3 rounded-md flex flex-col p-20 items-center bg-fuchsia-200 shadow-lg my-auto shadow-gray-400">
      
          <p className="text-5xl font-bold">Σύνδεση</p>
          {/* Show message after success or error */}
          {message && <p className=" text-xl mt-14 font-medium -mb-14 text-red-600">{message}</p>}
          
          <div className="w-1/4 mt-20 ">
            <p className="text-xl ml-1 font-medium ">Email</p>
            {emailError.length>0 && <p className="text-red-700 my-2 font-medium text-sm ">{emailError}</p>}
            <input
              type="email"
              className={`w-full h-10 border-2 border-gray-300 rounded-md pl-2 mt-1 bg-white ${emailError.length ===0? 'border-gray-300': 'border-red-700'  }`}
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) =>{ setMessage("");  setEmail(e.target.value)}}
            />
          </div>

          <div className="w-1/4 mt-5 ">
            <p className="text-xl ml-1 font-medium ">Κωδικός Πρόσβασης</p>

            <div className="w-full flex items-center justify-center">
              <input
                type={passwordVisibility ? "text" : "password"}
                className="w-full h-10 border-l-2 border-y-2 rounded-l-md pl-2 mt-1 border-gray-300 bg-white"
                value={password}
                onChange={(e) => { setMessage(""); setPassword(e.target.value)}}
              />
              <button
                onClick={toggleVisibility}
                type="button" // Use this for non-submitting buttons
                className="w-7 rounded-r-md border-2 border-gray-300 h-10 mt-1 bg-white flex items-center justify-center"
              >
                {!passwordVisibility ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* <a href=" " className="mt-3 mr-24" title="ΜΗ λειτουργικός σύνδεσμος.">
            <span className="underline font-medium">Ξέχασα τον κωδικό μου</span>
          </a> */}

          <span className="mt-3 mr-20 ">
            Νέος Χρήστης;
            <Link to="/signup">
              <span className="underline font-medium ml-2">Εγγραφή{" >"}</span>
            </Link>
          </span>

          {/* Display loading or error messages */}
          <div className="w-full flex justify-end px-32">
            <button
              onClick={handleLogin}
              type="submit"
              className={`${validInput() ? "bg-pink-600" : "bg-gray-500" } h-10 w-32 text-lg justify-center ml-60 flex items-center font-medium text-white rounded-md px-3 py-1 mt-5`}
              disabled={isLoading || !validInput()} // Disable button when loading
              title={validInput() ? "Σύνδεση" : "Συμπληρώστε πρώτα τα στοιχεία σύνδεσής σας"}
            >
              {isLoading && <span className="loading loading-spinner loading-md "/>}
              {!isLoading && "Σύνδεση"}
            </button>
          </div>
          
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
