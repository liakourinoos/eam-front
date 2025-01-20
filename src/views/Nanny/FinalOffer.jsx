import PropTypes from 'prop-types';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useMutation } from '@tanstack/react-query';
import { archiveOffer} from '../../FetchFunctions'
import { queryClient } from '../../main'; // Adjust the import path as needed.

function FinalOffer({code,finalDate, returnTo="offers"}) {
    

    const {mutateAsync:deleteOffer,isPending} = useMutation({
        mutationFn:()=>archiveOffer(code),
        // onError:()=>alert('Υπήρξε κάποιο πρόβλημα κατά την διαγραφή της αίτησης'),
        // onSuccess:()=>alert('Η αίτηση διαγράφηκε')
        onSuccess: () => {
            queryClient.invalidateQueries(['finalOffers']);
            // alert('Η αίτηση διαγράφηκε');
        }
    });

    return(
    

        
        <div className='w-full h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-semibold  py-2'>
            <div className="w-1/3 text-center">
                <p>{code}</p>
            </div>



            <div className='w-1/3 '>
                <p>{finalDate}</p>
            </div>

            {/* view button */}
            <div className='w-1/3 flex justify-center px-2 gap-2 '>
                <button  onClick={()=>nav(`/viewoffer/${code}`,{ state:  returnTo  })} 
                        className='w-2/3 border-2 border-pallete-800 text-pallete-800 hover:bg-pallete-800 hover:text-white h-14 rounded-md  flex gap-2 items-center justify-center px-2'>
                    <FaEye className='text-3xl'/>
                    Προβολή
                </button>
                <button className='w-2/3 border-2 border-pallete-800 text-pallete-800 hover:bg-pallete-800 hover:text-white h-14 rounded-md   flex gap-2 items-center justify-center px-2'
                        onClick={()=>deleteOffer()}
                >
                    <MdDelete className='text-3xl'/>
                    {isPending ? <span className='loading loading-sm'></span> : "Διαγραφή"}
                </button>
            </div>

        </div>



    );
}

export default FinalOffer;

FinalOffer.propTypes = {
    code: PropTypes.string.isRequired,
    finalDate: PropTypes.string.isRequired,
    returnTo:PropTypes.string
};