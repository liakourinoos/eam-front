import { useEffect, useState } from "react";
import { useAuth } from "../customHooks";
import PropTypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import { RenderHeaderNavbar } from "../../global_assets/global_functions";
import Footer from './Footer.jsx';
import { fetchNotifications } from "../FetchFunctions.jsx";
import Notification from "../views/Notifications/Notification.jsx";

function Notifications() {
    const { userData, loading } = useAuth();

    const { data: notifs, isLoading: isNotifsLoading } = useQuery({
        queryFn: () => fetchNotifications(userData?.id),
        enabled: !!userData,
        queryKey: [`notifications`, userData?.id],
        refetchInterval: 5000,
        refetchOnMount: true
    });

    const [successMessage, setSuccessMessage] = useState("");
    const duration = 3000;
    useEffect(() => {
        if (successMessage.length > 0) {//make it appear for some seconds
            const timer = setTimeout(() => {
                setSuccessMessage(""); // Hide the alert after the duration
            }, duration);
            // Cleanup the timer on component unmount
            return () => clearTimeout(timer);
        }
    }, [successMessage, duration])

    if (loading)
        return (
            <div className="w-full min-h-screen bg-white flex items-center justify-center">
                <span className='text-3xl font-bold'>Φόρτωση...</span>
            </div>
        );
    if (!loading)
        return (
            <div className="w-full min-h-screen bg-white flex flex-col">
            {successMessage.length > 0 && 
                    <div role="alert" className="alert alert-success fixed top-20 left-1/2 transform z-10 -translate-x-1/2 w-1/2 flex items-center justify-center  p-4 rounded shadow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current text-white text-2xl "
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className='text-white font-bold text-xl'>{successMessage}</span>
                    </div>
                }
                {RenderHeaderNavbar(userData, userData?.role ? 3 : 2)}
                <div className="flex-grow flex flex-col w-full pb-3 rounded-md bg-white">
                    {isNotifsLoading &&
                        <div className="w-full flex-grow flex items-center justify-center">
                            <span className="loading loading-lg"></span>
                        </div>
                    }

                    {!isNotifsLoading && notifs?.length === 0 &&
                        <div className="w-full flex-grow flex items-center justify-center">
                            <p className="text-3xl font-semibold text-gray-500">Δεν βρέθηκαν ειδοποιήσεις.</p>
                        </div>
                    }

                    {!isNotifsLoading && notifs?.length !== 0 && notifs?.map((notif, index) => (
                        <Notification key={index} id={notif?.id} type={notif?.type} role={userData?.role} setSuccessMessage={setSuccessMessage} />
                    ))}
                </div>
                <Footer />
            </div>
        );
}

export default Notifications;