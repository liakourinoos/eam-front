import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function NannyReview({name="default-n" , surname="def-sur", rating=0, date="99/99/9999", review="Lorem ipsum"}){
    const fullStars = Math.floor(rating); // Integer part (e.g., for 4.5, this will be 4)
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Half star if there's a decimal part
    const emptyStars = 5 - fullStars - halfStars; // Remaining stars are empty

    return(
        <div className='bg-gray-300 w-2/3 h-44 rounded-md shadow-sm'>
            {/* main div with name,pfp,date and star rating */}
            <div className='w-full h-2/5 rounded-t-md flex justify-between'>
                {/* img */}
                <div className='h-full  w-20 pl-1 py-1 '>
                    <img    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT77xKzr6ZPTH_WYNuPVmYx_Lu5EvM2LXSDWQ&s"
                            className='h-full object-contain  rounded-full'
                    />
                </div>
                {/* rest of data, name date and rating */}
                <div className='w-full h-full flex justify-between pr-5'>
                    {/* date and name */}
                    <div className='h-full py-1  font-medium'>
                        <p className='text-sm pl-2   '>{date}</p>
                        <p className='text-lg pl-2 mt-1'>{name} {surname}</p>
                    </div>

                    {/* rating */}
                    <div className='h-full flex items-start mt-4' title={`Βαθμολογία: ${rating}/5`}>
                        {/* Render full stars */}
                        {Array.from({ length: fullStars }, (_, idx) => (
                            <FaStar key={`full-${idx}`} className="text-black" />
                        ))}
                        {/* Render half star if needed */}
                        {halfStars > 0 && <FaStarHalfAlt className="text-black" />}
                        {/* Render empty stars */}
                        {Array.from({ length: emptyStars }, (_, idx) => (
                            <FaRegStar key={`empty-${idx}`} className="text-black" />
                        ))}
                    </div>


                </div>
            </div>

            {/* review div */}
            <div className="w-full h-3/5 px-1 py-2 font-medium text-lg text-ellipsis">
                <p className="h-full px-2 rounded-md shadow-sm shadow-gray-600 bg-white break-words  overflow-y-scroll   text-ellipsis">
                    {review}
                </p>
            </div>



        </div>



    )
}


NannyReview.propTypes= {
    name:PropTypes.string.isRequired,
    surname:PropTypes.string.isRequired,
    rating:PropTypes.number.isRequired,
    date:PropTypes.string.isRequired,
    review:PropTypes.string

}

export default NannyReview;
