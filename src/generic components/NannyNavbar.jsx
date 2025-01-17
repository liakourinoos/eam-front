import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import {fetchNotificationCount,readNotifications} from '../FetchFunctions'
import { useAuth } from "../customHooks";
import { useMutation } from "@tanstack/react-query";

function NannyNavbar({page=1}){

    const {userData,loading} =useAuth();

    const {data:notifCount,isLoading} = useQuery({
        queryFn:()=>fetchNotificationCount(userData?.id),
        refetchInterval: 5000,
        queryKey:['notificationCount',userData?.id],
        staleTime:0
        
    });
    const [selectedPage,setSelectedPage] = useState(page); //poio page eimaste

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


    return(
        <div className={`w-full h-12 text-xl border-b-2  border-black font-medium items-center px-auto bg-pallete-50 flex justify-evenly`}>            
            <Link to='/nannyoffers'  onClick={()=>setSelectedPage(1)} className={`cursor-pointer ${selectedPage==1?"text-pallete-600 underline font-semibold" : 'text-black'}`}>Αγγελίες</Link>

            
            <div className="indicator" onClick={()=>{setNotificationsRead(true); setNotifications(0); readNotifs(); setSelectedPage(2); }}>
                {!isLoading && notifications > 0 &&<span className="indicator-item badge badge-secondary flex items-center justify-center">{notifications}</span>}
                <Link to='/notifications'  className={`cursor-pointer ${selectedPage==2?"text-pallete-600 underline font-semibold" : 'text-black'}`}>Ειδοποιήσεις</Link>
            </div>

            <Link to='/reviews' onClick={()=>setSelectedPage(3)} className={`cursor-pointer ${selectedPage==3?"text-pallete-600 underline font-semibold" : 'text-black'}`}>Αξιολογήσεις</Link>
            <Link to='/nannyhistory' onClick={()=>setSelectedPage(4)} className={`cursor-pointer ${selectedPage==4?"text-pallete-600 underline font-semibold" : 'text-black'}`}>Ιστορικό</Link>


        </div>

    );
}

export default NannyNavbar;

NannyNavbar.propTypes = {
    page: PropTypes.number
};