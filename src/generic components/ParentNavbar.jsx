import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaRegHandshake ,FaBell,FaMoneyBills,FaMagnifyingGlass} from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";

function ParentNavbar({page=1}){
    const [selectedPage,setSelectedPage] = useState(page); //poio page eimaste
    return(
        <div className={`w-full h-12 text-xl border-b-2  border-black font-normal items-center px-auto bg-white flex justify-evenly`}>
            <Link to='/search'  onClick={()=>setSelectedPage(1)} className={`cursor-pointer hover:text-pallete-700 flex items-center gap-1 ${selectedPage==1?"text-pallete-800 underline font-semibold" : 'text-black'}`}>
                <span className=" text-2xl "><FaMagnifyingGlass/> </span>
                <span >Αναζήτηση</span>
            </Link>
            <Link to='/parentapplications'  onClick={()=>setSelectedPage(2)} className={`cursor-pointer hover:text-pallete-700 flex items-center gap-1 ${selectedPage==2?"text-pallete-800 underline font-semibold" : 'text-black'}`}>
                <span className=" text-3xl "><FaRegHandshake/> </span>
                <span >Συμφωνητικά </span>
            </Link>

            <Link to='/notifications' onClick={()=>setSelectedPage(3)} className={`cursor-pointer hover:text-pallete-700 flex gap-1 items-center ${selectedPage==3?"text-pallete-800 underline font-semibold" : 'text-black'}`}>
                <span className=" text-2xl "><FaBell/> </span>
                <span >Ειδοποιήσεις</span>
            </Link>


            <Link to='/parentpayments' onClick={()=>setSelectedPage(4)} className={`cursor-pointer hover:text-pallete-700 flex items-center gap-1 ${selectedPage==4?"text-pallete-800 underline font-semibold" : 'text-black'}`}>
                <span className=" text-3xl "><FaMoneyBills/> </span>
                <span >Πληρωμές</span>
            </Link>
            <Link to='/parenthistory'  onClick={()=>setSelectedPage(5)} className={`cursor-pointer hover:text-pallete-700 flex items-center gap-1 ${selectedPage==5?"text-pallete-800 underline font-semibold" : 'text-black'}`}>
                <span className=" text-2xl "><FaHistory/></span>
                <span >Ιστορικό</span>
            
            </Link>

    
        </div>
    
    );
}


export default ParentNavbar;

ParentNavbar.propTypes = {
    page: PropTypes.number
};