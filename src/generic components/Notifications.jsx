import { useEffect, useState } from "react";
import { useAuth } from "../customHooks";
import PropTypes from 'prop-types';
import { useQuery} from "@tanstack/react-query";
import { RenderHeaderNavbar } from "../../global_assets/global_functions";
import Footer from './Footer.jsx';
import { fetchNotifications } from "../FetchFunctions.jsx";
import Notification from "../views/Notifications/Notification.jsx";

function Notifications(){
    const {userData, loading} = useAuth();

    const { data: notifs, isLoading: isNotifsLoading } = useQuery({
        queryFn: () => fetchNotifications(userData?.id),
        enabled: !!userData,
        queryKey: ['notifications'],
        refetchInterval: 20000 
    });


    if(loading || isNotifsLoading)
        return(
            <div className="w-full h-screen bg-white flex items-center justify-center">
                <span className="loading loading-lg"></span>

            </div>
        );

    if(!loading && !isNotifsLoading ){
        return(
            <div className="w-full h-screen bg-white  flex flex-col">
                {RenderHeaderNavbar(userData, userData?.role? 3: 2)}
                <div className="flex-grow overflow-y-auto w-full pt-10 rounded-md bg-white" >
                    {notifs.map((notif, index) => (
                        <Notification key={index} id={notif?.id} type={notif?.type}/>  
                        
                    ))}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Notifications;
