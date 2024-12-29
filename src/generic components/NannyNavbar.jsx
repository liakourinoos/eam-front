import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function NannyNavbar({page=1}){
    const [selectedPage,setSelectedPage] = useState(page); //poio page eimaste


    return(
        <div className={`w-full h-12 text-xl border-b-2  border-black font-medium items-center px-auto bg-pallete-50 flex justify-evenly`}>            
            <Link to='/nannyoffers'  onClick={()=>setSelectedPage(1)} className={`cursor-pointer ${selectedPage==1?"text-red-600 underline" : 'text-black'}`}>Αγγελίες</Link>
            <Link  onClick={()=>setSelectedPage(2)} className={`cursor-pointer ${selectedPage==2?"text-red-600 underline" : 'text-black'}`}>Ειδοποιήσεις</Link>
            <Link  onClick={()=>setSelectedPage(3)} className={`cursor-pointer ${selectedPage==3?"text-red-600 underline" : 'text-black'}`}>Αξιολογήσεις</Link>
            <Link  onClick={()=>setSelectedPage(4)} className={`cursor-pointer ${selectedPage==4?"text-red-600 underline" : 'text-black'}`}>Ιστορικό</Link>


        </div>

    );
}

export default NannyNavbar;

NannyNavbar.propTypes = {
    page: PropTypes.number
};