import { MdEmail,MdPhone } from "react-icons/md";
import PropTypes from 'prop-types';
import { GrSkype } from "react-icons/gr";
import { Link } from "react-router-dom";

Contact.propTypes = {
    nannyName: PropTypes.string.isRequired,
    nannySurname: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    contactType: PropTypes.string.isRequired,
    contactInfo: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status:PropTypes.string.isRequired
};
export default function Contact({nannyName,nannySurname,id,contactType,status,contactInfo,date}) {

    return(
        <div className='w-full  mx-auto h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium  py-2'>
            {/* name */}
            <Link to={`/nannyprofile/${id}`} className='w-1/4 h-full flex justify-center items-center  hover:text-pallete-600'>{nannyName} {nannySurname}</Link>
            <p className='w-1/4 h-full flex justify-center items-center '>{date}</p>
            <p className="w-1/4 text-center">{status==="pending" ? "Αναμονή Απάντησης" : status}</p>
            <div className='w-1/4  h-full  flex items-center justify-center gap-3'>
                {contactType==="email" && <MdEmail className="text-2xl"/>}
                {contactType==="phone" && <MdPhone className="text-3xl"/>}
                {contactType==="skype" && <GrSkype className="text-3xl"/>}
                <p className="text-center">{contactType==="phone" && "+30"} {contactInfo}</p>
            </div>
        </div>
    )

}