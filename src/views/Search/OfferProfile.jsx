import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


function OfferProfile({id,name,surname,rating,ratingCount,bio,img}) {
    return (
        <Link to={`/nannyprofile/${id}`} className="w-4/5 h-36 mx-auto my-5  flex justify-between bg-stone-100 rounded-md p-1 shadow-md shadow-gray-700">
            {/* photo */}
            <div className="h-full w-1/5  flex items-center justify-center">
                <img src={img} className="object-cover size-28 rounded-full "></img>
            </div>

            {/* name, rating and bio */}
            <div className="w-full h-full flex flex-col pl-2">

                {/* box 1: name and ratings */}
                <div className="w-full  flex justify-between pr-1 text-xl font-medium">                
                    <span >{name} {surname}</span>
                    <div>
                        <span title={`βαθμολογία: ${rating}/5`} className="text-xl font-medium">{rating}  </span>
                        <span title={`${ratingCount} ${ratingCount!==1?'χρήστες έχουν ' : 'χρήστης έχει'} αξιολογήσει την νταντά.`}>({ratingCount})</span>
                    </div>
                </div>

                {/* box2: bio */}
                <div className="my-1 h-full overflow-hidden rounded-md ">
                    <p className="border-2 pt-1 h-full border-black px-1 shadow-inner shadow-gray-500">
                        {bio}
                    </p>
                </div>
            
            </div>
        </Link>
    );
}

OfferProfile.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired, 
    surname: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired
};


export default OfferProfile;