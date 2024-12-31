import { useState,useEffect } from "react";
import {useQuery } from "@tanstack/react-query";
import {useAuth} from "../customHooks"
import { RenderHeaderNavbar } from "../../global_assets/global_functions";
import Footer from "./Footer";
import {fetchNannyReviews,fetchParentReviews} from '../FetchFunctions'
import Review from "../views/Reviews/Review";
import { useNavigate } from "react-router-dom";

function Reviews(){
    const {userData:myData,loading} = useAuth();

    const nav = useNavigate();

   

    const {data:nannyReviews,isNannyReviewsLoading} = useQuery({
        queryFn:()=>fetchNannyReviews(myData?.id),
        queryKey:["nannyReviews", myData?.id],
        enabled: !!myData && (myData.role === false) //only fetch if nanny

    })

    const {data:parentReviews,isParentReviewsLoading} = useQuery({
        queryFn:()=>fetchParentReviews(myData?.id),
        queryKey:["parentReviews", myData?.id],
        enabled: !!myData && (myData?.role===true) //only fetch if parent

    })

    if(loading){
        return (
            <div className="w-full bg-white h-screen flex justify-center items-center">
                <span className="loading loading-lg"></span>
            </div>
        )
    }



    if(!loading ){
        return(
            <div className="w-full min-h-screen flex flex-col bg-white">
                {RenderHeaderNavbar(myData, myData.role ? 0 : 3)}

                <div className="flex-grow bg-white flex flex-col  w-full">

                    {/* for nannies */}
                    {isNannyReviewsLoading && <div className="w-full flex-grow  flex items-center justify-center"> <span className="loading loading-lg"></span> </div>}
                    {!isNannyReviewsLoading && nannyReviews &&  nannyReviews.length === 0 && 
                        <div className="w-full flex-grow bg-white flex items-center justify-center"> 
                            <p className="text-2xl text-gray-500">Καμία Κριτική Ακόμα.</p> 
                        </div>
                    }
                    
                    {!isNannyReviewsLoading && nannyReviews && nannyReviews.length > 0 &&
                            nannyReviews.map((review,index)=>(
                                <Review key={index} seenFrom = {myData?.role ? "parent" : "nanny"} review={review} nannyName={myData?.name} nannySurname={myData?.surname} nannyImg={myData?.img} />          
                            ))
                    }    



                    {/* for parents */}
                    {isParentReviewsLoading && <div className="w-full flex-grow  flex items-center justify-center"> <span className="loading loading-lg"></span> </div>}
                    {!isParentReviewsLoading && parentReviews &&  parentReviews.length === 0 && 
                        <div className="w-full flex-grow bg-white flex items-center justify-center"> 
                            <p className="text-2xl text-gray-500">Καμία Κριτική Ακόμα.</p> 
                        </div>
                    }
                    
                    {
                        !isParentReviewsLoading && parentReviews && parentReviews.length > 0 &&
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

                

                <Footer/>
            </div>
        );
    }
}

export default Reviews;