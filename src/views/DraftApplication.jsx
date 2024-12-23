import PropTypes from 'prop-types'
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";


function DraftApplication({firstName,lastName}){
    return(
    

        
        <div className='w-full h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium  py-2'>

            <div className='flex gap-3 w-1/2 justify-center '>
                <p>{firstName}</p>
                <p>{lastName}</p>
            </div>

            {/* view button */}
            <div className='w-1/2 flex gap-7 justify-center '>
                <button className='w-1/3 bg-pallete-200 h-14 rounded-md border-2 border-gray-300 flex gap-2 items-center justify-center px-2'>
                    <FaEye className='text-3xl'/>
                    <p>Προβολή</p>

                </button>
                <button className='w-1/3 bg-pallete-200 h-14 rounded-md border-2 border-gray-300 flex gap-2 items-center justify-center px-2'>
                    <MdEdit className='text-3xl'/>
                    <p>Επεξεργασία</p>

                </button>
            </div>

        </div>
    );

};

export default DraftApplication;

DraftApplication.propTypes = {

    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,

};