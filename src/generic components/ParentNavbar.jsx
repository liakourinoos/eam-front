import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaRegHandshake ,FaBell,FaMoneyBills,FaMagnifyingGlass} from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {fetchNotificationCount,readNotifications} from '../FetchFunctions'
import { useAuth } from "../customHooks";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";


function ParentNavbar({page=1}){
    const [selectedPage,setSelectedPage] = useState(page); //poio page eimaste
    const {userData,loading} =useAuth();
    const nav=useNavigate();

    const {data:notifCount,isLoading} = useQuery({
        queryFn:()=>fetchNotificationCount(userData?.id),
        refetchInterval: 5000,
        queryKey:['notificationCount',userData?.id],
        staleTime:0
        
    });
    

    const [notifications, setNotifications] = useState(0);
    const [notificationsRead, setNotificationsRead] = useState(false);

    useEffect(() => {
        if (!isLoading && !notificationsRead) {
            setNotifications(notifCount); // Update state from query only if not manually cleared
        }
        
    }, [notifCount, isLoading, notificationsRead]);
    


    const {mutateAsync:readNotifs} = useMutation({
        mutationFn:()=>readNotifications(userData?.id),
        onSuccess:()=>setNotifications(0),
        
    })

    useEffect(()=>{
        if(selectedPage===3){
            setNotificationsRead(true);
            readNotifs();
        }

    },[notifications,notifCount])


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

            <div className={`relative flex items-center hover:text-pallete-700 gap-1 cursor-pointer ${selectedPage==3?"text-pallete-800 underline font-semibold" : 'text-black'}`} 
                 onClick={()=>{setNotificationsRead(true); setNotifications(0); readNotifs(); setSelectedPage(3); nav("/notifications"); }}>
                <span className="text-2xl"><FaBell/></span>
                <span>Ειδοποιήσεις</span>
                {((!isLoading && notifications > 0) && selectedPage!==3) && 
                    <span className="absolute top-[-5px] right-[-18px] bg-pallete-800 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications >=10 ? '9+' : notifications}
                    </span>}
            </div>

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