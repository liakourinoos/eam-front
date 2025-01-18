import PropTypes from 'prop-types';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useMutation } from '@tanstack/react-query';
import { archiveOffer} from '../../FetchFunctions'
import { queryClient } from '../../main'; // Adjust the import path as needed.

function ArchivedOffer({code,finalDate}) {
    

    

    return(
    

        
        <div className='w-full h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium  py-2'>
            <div className="w-1/3 text-center">
                <p>{code}</p>
            </div>



            <div className='w-1/3 '>
                <p>{finalDate}</p>
            </div>

            {/* view button */}
            <div className='w-1/3 flex justify-center px-2 gap-2 '>
                <Link to={`/viewoffer/${code}`} className='w-2/3 bg-pallete-200 h-14 rounded-md border-2 border-gray-300 flex gap-2 items-center justify-center px-2'>
                    <FaEye className='text-3xl'/>
                    Προβολή
                </Link>
            </div>

        </div>



    );
}

export default ArchivedOffer;

ArchivedOffer.propTypes = {
    code: PropTypes.string.isRequired,
    finalDate: PropTypes.string.isRequired
};