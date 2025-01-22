import PropTypes from 'prop-types'
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function DraftOffer({code}){
    const nav=useNavigate();
    return(
    

        
        <div className='w-full h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium  py-2'>

            <div className='flex gap-3 w-1/2 justify-center '>
                <p>{code}</p>
                
            </div>

            {/* view button */}
            <div className='w-1/2 flex gap-7 justify-center '>
                <button  onClick={()=>nav(`/viewoffer/${code}`)} 
                        className='w-1/3 border-2 border-pallete-800 text-pallete-800 hover:bg-pallete-800 hover:text-white h-14 rounded-md  flex gap-2 items-center justify-center px-2'>
                        <FaEye className='text-3xl'/>
                        Προβολή

                </button>
                <Link to={`/editoffer/${code}`} className='w-1/3  h-14 rounded-md border-2 border-pallete-800 text-pallete-800 hover:bg-pallete-800 hover:text-white flex gap-2 items-center justify-center px-2'>
                        <MdEdit className='text-3xl'/>
                        Επεξεργασία

                </Link>
            </div>

        </div>
    );

};

export default DraftOffer;

DraftOffer.propTypes = {
    code: PropTypes.string.isRequired,
};