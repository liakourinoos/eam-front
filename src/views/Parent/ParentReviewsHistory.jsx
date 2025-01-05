import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { useState } from "react";
import { FaRegQuestionCircle } from 'react-icons/fa';
import FinalApplication from "./FinalApplication";
import { useAuth } from '../../customHooks';
import { fetchParentReviews } from "../../FetchFunctions";
import { useQuery } from "@tanstack/react-query";
import Review from "../Reviews/Review";
export default function ParentReviewsHistory() { // Corrected function declaration
    const { userData:myData,loading } = useAuth();

    const {data:parentReviews, isFetching, isLoading} = useQuery({
        queryFn: () => fetchParentReviews(myData?.id),
        queryKey: ["parentReviews", myData?.id],
        enabled: !!myData && myData?.role === true,
    });
    

    const [sortBy, setSortBy] = useState("date-desc");

return(
        <div className="w-full flex flex-col py-2  bg-white ">
            
            <div className=" w-11/12 mx-auto flex mb-10 ">
                <div className='w-1/3'></div>
                <p className="text-center font-bold w-1/3 text-4xl my-auto">Οι Αξιολογήσεις μου</p>
                <div className='w-1/3  items-center justify-center flex flex-col'> 
                    <p className=' text-lg font-medium'>Ταξινόμηση με βάση</p>
                    <select onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy}
                        className="select select-bordered rounded-md h-12 border-2 border-black pl-2 bg-white w-60 max-w-xs"
                    >
                        <option value={"date-desc"}>Ημερομηνία &#8593;</option>
                        <option value={"date-asc"}>Ημερομηνία &#8595;</option>
                    </select>
                </div>

            </div>    


            {/* reviews */}
            <div className="flex-grow bg-white flex flex-col  w-full">

                {(isLoading || isFetching) && <div className="w-full flex-grow flex items-center justify-center "> <span className="loading loading-lg"></span> </div>}
                {!(isLoading || isFetching) &&   parentReviews?.length === 0 && 
                    <div className="w-full flex-grow flex items-center justify-center"> 
                        <p className="text-2xl ">Καμία Κριτική Ακόμα.</p> 
                    </div>
                }                                
                {!(isLoading || isFetching) && parentReviews?.length > 0 &&
                    parentReviews.map((review, index) => {
                        // Add or modify properties in the review object
                        const modifiedReview = {
                            ...review, 
                            personName: myData?.name, 
                            personSurname: myData?.surname, 
                        };                                
                        return (
                            <Review
                                key={index}
                                seenFrom={myData?.role ? "parent" : "nanny"}
                                review={modifiedReview} // Pass the modified object
                                nannyName={review.personName} nannySurname={review.personSurname} nannyImg={review.img}
                            />
                            
                        );
                    })
                } 
            </div>   
        </div>
    );
}
    