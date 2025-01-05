import { MdEmail,MdPhone } from "react-icons/md";
import PropTypes from 'prop-types';
import { GrSkype } from "react-icons/gr";
import { Link } from "react-router-dom";

Contact.propTypes = {
    parentName: PropTypes.string.isRequired,
    parentSurname: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    contactType: PropTypes.string.isRequired,
    contactInfo: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};
export default function Contact({parentName,parentSurname,id,contactType,contactInfo,date}) {

    return(
        <div className='w-11/12 my-2 mx-auto h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium  py-2'>
            {/* name */}
            <Link to={`/parentprofile/${id}`} className='w-1/3 h-full flex justify-center items-center font-semibold hover:text-pallete-600'>{parentName} {parentSurname}</Link>
            <p className='w-1/3 h-full flex justify-center items-center font-semibold'>{date}</p>
            <div className='w-1/3  h-full font-semibold flex items-center justify-center gap-3'>
                {contactType==="email" && <MdEmail className="text-2xl"/>}
                {contactType==="phone" && <MdPhone className="text-3xl"/>}
                {contactType==="skype" && <GrSkype className="text-3xl"/>}
                <p className="">{contactType==="phone" && "+30"} {contactInfo}</p>
            </div>
        </div>
    )

}