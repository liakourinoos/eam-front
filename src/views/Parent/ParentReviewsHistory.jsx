import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { useState } from "react";
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useAuth } from '../../customHooks';
import { fetchParentReviews } from "../../FetchFunctions";
import { useQuery } from "@tanstack/react-query";
import Review from './../Reviews/Review';

export default function ParentReviewsHistory() {
    const { userData } = useAuth();

    const { data: parentReviews, isLoading, isFetching } = useQuery({
        queryFn: () => fetchParentReviews(userData?.id),
        queryKey: ['parentReviewHistory', userData?.id],
        enabled: !!userData
    });

    const [sortBy, setSortBy] = useState("date-desc");

    return (
        <div className="w-auto flex-grow py-2 flex flex-col h-full">

            <div className="w-11/12 mx-auto flex">
                <div className='w-1/3'></div>
                <p className="text-center font-bold w-1/3 text-4xl my-auto">Ιστορικό Κριτικών</p>
                <div className='w-1/3 items-end justify-center flex flex-col'>
                    <p className='text-lg font-medium'>Ταξινόμηση με βάση</p>
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
            <div className="flex-grow bg-white flex flex-col w-11/12 mx-auto mt-5 mb-5 gap-2 items-center justify-start overflow-y-auto">
                {(isLoading || isFetching) &&
                    <div className="flex-grow flex items-center justify-center">
                        <span className="loading loading-lg"></span>
                    </div>
                }
                {!(isLoading || isFetching) && parentReviews?.length === 0 &&
                    <div className="flex-grow flex flex-col items-center justify-center">
                        <p className="text-center text-gray-500 text-2xl font-semibold">Δεν βρέθηκαν παλαιότερες κριτικές.</p>
                    </div>
                }
                {!(isLoading || isFetching) && parentReviews?.length > 0 &&
                    parentReviews.map((review, index) => {
                        // Add or modify properties in the review object
                        const modifiedReview = {
                            ...review,
                            personName: userData?.name,
                            personSurname: userData?.surname,
                        };
                        return (
                            <Review
                                key={index}
                                seenFrom={userData?.role ? "parent" : "nanny"}
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