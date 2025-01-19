import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

Review.propTypes = {
    review: PropTypes.shape({
        bio: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        parentId: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        personName: PropTypes.string.isRequired,
        personSurname: PropTypes.string.isRequired,
        nannyId: PropTypes.string.isRequired,
    }).isRequired,

    // se periptwsi pou emfanizoume kritikes pou exei kanei o goneas, prepei na exoume kai to onoma tis ntantas sumfwna me to wireframe
    nannyName: PropTypes.string,
    nannySurname: PropTypes.string,
    nannyImg: PropTypes.string,

    seenFrom: PropTypes.string.isRequired,
};

export default function Review({seenFrom,nannyName,nannySurname,nannyImg,review}){

    const [fullStars,setFullStars]=useState(0);
    const [halfStars,setHalfStars]=useState(0); ;
    const [emptyStars,setEmptyStars]=useState(0);
    
    useEffect(()=>{
        if(review.rating){
            const rating = review.rating;
            setFullStars(Math.floor(rating)); // Integer part (e.g., for 4.5, this will be 4)
            setHalfStars(rating % 1 >= 0.5 ? 1 : 0); // Half star if there's a decimal part
            setEmptyStars(5 - Math.floor(rating) - (rating % 1 >= 0.5 ? 1 : 0)); // Remaining stars are empty
        }
    },[])

    return(
        <div className="w-11/12 md:w-3/5 mx-auto bg- flex h-40  items-center justify-center font-medium  border-2 pb-2 shadow-lg shadow-gray-300 border-black rounded-lg px-2 py-1 my-5">
            
            {/* left div: img */}
            <div className='w-32 h-full flex items-center justify-center'>
                <img src={seenFrom==="parent" ? nannyImg : review.img  } alt="" className=" h-32 rounded-full"/>
            </div>
            {/* right, all the rest */}
            <div className='w-5/6 h-full flex flex-col pl-2'>
                <p className='ml-1 font-normal'>{review.createdAt}</p>
                
                <div className='w-full flex pl-1 items-center  justify-between'>

                    {/* name and rating on the same row */}
                    <div className='flex items-center text-xl mb-2'>
                        {seenFrom === "parent" && <span className='hover:text-pallete-700'>{review.personName} {review.personSurname} {`>`} <Link className=' underline ' to={`/nannyprofile/${review.nannyId}`}>{nannyName} {nannySurname}</Link></span>}
                        {seenFrom !== "parent" && <Link className=' underline hover:text-pallete-700 ' to={`/parentprofile/${review.parentId}`}>{review.personName} {review.personSurname}</Link>}

                    </div>

                    {/* stars */}
                    <div className="flex items-center h-full mr-1" title={`Βαθμολογία: ${review.rating}/5`}>
                        {/* Render full stars */}
                        {Array.from({ length: fullStars }, (_, idx) => (
                            <FaStar key={`full-${idx}`} className="text-black text-xl" />
                        ))}
                        {/* Render half star if needed */}
                        {halfStars > 0 && <FaStarHalfAlt className="text-black text-xl" />}
                        {/* Render empty stars */}
                        {Array.from({ length: emptyStars }, (_, idx) => (
                            <FaRegStar key={`empty-${idx}`} className="text-black text-xl" />
                        ))}
                    </div>

                </div>

                {/* bio */}
                <textarea   className='w-full px-2 py-1 bg-white h-full rounded-md border-2 border-gray-400'
                            value={review.bio}
                            readOnly
                />

            </div>


        </div>
    );
}