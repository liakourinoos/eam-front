import { MdEmail,MdPhone } from "react-icons/md";
import PropTypes from 'prop-types';
import { GrSkype } from "react-icons/gr";
import { Link } from "react-router-dom";

Payment.propTypes = {
    nannyName: PropTypes.string.isRequired,
    nannySurname: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    voucher:PropTypes.number.isRequired
};
export default function Payment({nannyName,nannySurname,id,voucher,date}) {

    return(
        <div className='w-full  mx-auto h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium  py-2'>
            {/* name */}
            <Link to={`/nannyprofile/${id}`} className='w-1/3 h-full flex justify-center items-center  hover:text-pallete-600'>{nannyName} {nannySurname}</Link>
            <p className='w-1/3 h-full flex justify-center items-center fon'>{date}</p>
            <p className="w-1/3 text-center">{voucher}</p>
        </div>
    )

}