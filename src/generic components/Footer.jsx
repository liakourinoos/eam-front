import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { PiBabyDuotone } from "react-icons/pi";
function Footer() {

    return(
        <div className="w-full h-16 flex justify-between  border-t-2 border-black bg-pallete-50"> 
            {/* div1, social media links */}
            <div className="w-1/3 h-full flex gap-10 pl-10 items-center  ">

                <a href="https://facebook.com">
                    <div className="w-10 h-10 rounded-lg bg-white flex justify-center items-center">
                            <FaFacebook className="h-7 w-7" to={"www.facebook.gr"}/>
                        </div>
                </a>
                <a href="https://instagram.com">
                    <div className="w-10 h-10 rounded-lg bg-white flex justify-center items-center">
                        <FaInstagram className="h-7 w-7"/>
                    </div>
                </a>
                <a href="https://X.com">
                    <div className="w-10 h-10 rounded-lg bg-white flex justify-center items-center">
                        <FaXTwitter className="h-7 w-7"/>
                    </div>
                </a>

            </div>

            {/* div2, logo */}
            <div className="w-1/3 h-full flex justify-center ">
                <PiBabyDuotone className="w-1/6  h-full text-pallete-600"/>
            
            </div>

            {/* div3, support, help */}
            <div className="w-1/3 h-full flex justify-between ">

                {/* help */}
                <Link to='/about' className="my-auto mx-auto"><p className="underline text-black font-bold text-center  ">Εγχειρίδιο Χρήσης</p></Link>
                <div className="flex flex-col justify-center  px-2 ">
                    <p><span className="font-medium">support:</span> nanika@gmail.com</p>
                    <p><span className="font-medium">Nanika©</span>, 2024-2024</p>
                </div>

            </div>

        
        </div>
    )

}

export default Footer