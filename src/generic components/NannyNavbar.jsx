import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import {fetchNotificationCount,readNotifications} from '../FetchFunctions'
import { useAuth } from "../customHooks";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { BsFillClipboard2Fill } from "react-icons/bs";
import { FaBell } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
function NannyNavbar({page=1}){
    const nav=useNavigate();
    const {userData,loading} =useAuth();
    const [selectedPage,setSelectedPage] = useState(page); //poio page eimaste


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
        if(selectedPage===2){
            setNotificationsRead(true);
            readNotifs();
        }

    },[notifications,notifCount])


    return(
        <div className={`w-full h-12 text-xl border-b-2  border-black font-normal items-center px-auto bg-white flex justify-evenly`}>            
            <Link to='/nannyoffers'  onClick={()=>setSelectedPage(1)} className={`cursor-pointer hover:text-pallete-700 flex items-center gap-1 ${selectedPage==1?"text-pallete-800 underline font-semibold" : 'text-black'}`}>
                <span className=" text-2xl "><FaClipboardList/> </span>
                <span >Αγγελίες</span>
            </Link> 

             
            <div    className={` indicator flex items-center hover:text-pallete-700 gap-1 cursor-pointer ${selectedPage==2?"text-pallete-800 underline font-semibold" : 'text-black'}`} 
                    onClick={()=>{setNotificationsRead(true); setNotifications(0); readNotifs(); setSelectedPage(2); nav("/notifications"); }}>
                {((!isLoading && notifications > 0) && selectedPage!==2) &&<span className="indicator-item badge badge-secondary flex items-center justify-center">{notifications}</span>}
                {/* <Link to='/notifications'  className={`cursor-pointer ${selectedPage==2?"text-pallete-800 underline font-semibold" : 'text-black'}`}>Ειδοποιήσεις</Link> */}
                    <span className=" text-2xl "><FaBell/> </span>
                    <span >Ειδοποιήσεις</span>
            </div>

            <Link to='/reviews' onClick={()=>setSelectedPage(3)} className={`cursor-pointer hover:text-pallete-700 flex items-center gap-1 ${selectedPage==3?"text-pallete-800 underline font-semibold" : 'text-black'}`}>
                <span className=" text-2xl "><FaStarHalfAlt/></span>
                <span >Αξιολογήσεις</span>
            </Link>
            <Link to='/nannyhistory'  onClick={()=>setSelectedPage(4)} className={`cursor-pointer hover:text-pallete-700 flex items-center gap-1 ${selectedPage==4?"text-pallete-800 underline font-semibold" : 'text-black'}`}>
                <span className=" text-2xl "><FaHistory/></span>
                <span >Ιστορικό</span>
            
            </Link>

        </div>

    );
}

export default NannyNavbar;

NannyNavbar.propTypes = {
    page: PropTypes.number
};