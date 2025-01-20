import PropTypes from 'prop-types';
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function FinalApplication({code,firstName,lastName,status,finalDate, returnTo="applications"}) {
    const nav = useNavigate();
    console.log("Inside FinalApplication: " + returnTo)
    return(
    

        
        <div className='w-full h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium  py-2'>
            <div className="w-1/5 text-center">
                <p>{code}</p>
            </div>

            <div className='flex gap-3 w-1/5 justify-center '>
                <p>{firstName}</p>
                <p>{lastName}</p>
            </div>
            
            <div className='w-1/5 '>
                <p>{status}</p>
            </div>

            <div className='w-1/5 '>
                <p>{finalDate}</p>
            </div>

            {/* view button */}
            <div className='w-1/5 flex justify-center '>
                <button 
                        className={`w-2/3  h-14 rounded-md border-2 border-pallete-800 text-pallete-800 hover:bg-pallete-800 hover:text-white flex gap-2 items-center justify-center px-2`}
                        onClick={()=>nav(`/viewapplication/${code}`,{ state:  returnTo  })}        
                >
                    <FaEye className='text-3xl'/>
                    Προβολή

                </button>
            </div>

        </div>



    );
}

export default FinalApplication;

FinalApplication.propTypes = {
    code: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    finalDate: PropTypes.string.isRequired,
    returnTo:PropTypes.string
};