
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { days, hours } from '../../../global_assets/global_values';
import { FaCheck } from 'react-icons/fa';


function ApplicationPreview({ id, parentId, parentName, parentSurname, date, schedule, months, address, startingDate, status }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className='w-full mx-auto h-20 text-2xl rounded-md border-2 text-center border-gray-300 bg-white flex items-center font-medium py-2'>
            <p className='w-1/5 text-center truncate'>{id}</p>
            <Link to={`/parentprofile/${parentId}`} className='w-1/5  hover:text-pallete-700 text-center truncate'>{parentName} {parentSurname}</Link>
            <p className='w-1/5 text-center truncate'>{date}</p>
            <p className='w-1/5 text-center truncate'>{status}</p>
            <div className='w-1/5 flex justify-center '>
                <button className={`w-2/3  h-14 rounded-md border-2 border-pallete-800 text-pallete-800 hover:bg-pallete-800 hover:text-white flex gap-2 items-center justify-center px-2`}
                    onClick={() => setShowModal(true)}
                >
                    <FaEye className='text-3xl' />
                    Προβολή

                </button>
            </div>
            {/* Modal */}
            {showModal && (
                <>
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
                    <div className="bg-white w-3/4 h-3/4 flex flex-col  rounded-lg shadow-lg px-3 pt-2 pb-1 overflow-y-auto relative">

                        {/* top part for modal title and close button */}
                        <div className='w-full h-1/6 flex items-center '>
                            <p className='w-1/6 h-full'></p>
                            <p className='w-4/6 h-full font-medium text-3xl flex items-center justify-center bg-white'> Επιθεώρηση Συμφωνητικού Απασχόλησης</p>
                            <div className='w-1/6 h-full flex items-center justify-end '>
                                <button className='h-12 w-12 text-red-600  rounded-md flex items-center text-5xl font-medium justify-center bg-white'
                                    onClick={() => setShowModal(false)}
                                >
                                    <MdClose className='hover:text-red-500' />
                                </button>
                            </div>
                        </div>

                        {/* main modal body */}
                        <div className='w-full flex-grow rounded-md font-medium mb-2 shadow-md shadow-gray-700  bg-gray-100 px-2 '>
                            <p className='pt-2 text-xl'>Ο χρήστης <span className='font-bold'>{parentName} {parentSurname}</span> θέλει να σας απασχολήσει για χρονικό διάστημα <span className='mx-1 font-bold'>{months} {months > 1 ? 'μηνών' : 'μήνα'}</span> ξεκινώντας από τις
                                <span className='mx-2 font-bold'>{startingDate}</span>για τις παρακάτω αναγραφόμενες ώρες:

                            </p>

                            {/* table here!*/}
                            <table className="table-auto w-full my-1  rounded-md text-xs bg-slate-200 border-collapse shadow-sm shadow-gray-700">
                                <thead>
                                    <tr className="bg-gray-300 rounded-md">
                                        <th className="px-2 py-1 text-center"></th>
                                        {/* Render the headers for the days */}
                                        {days.map((day, idx) => (
                                            <th key={idx} className="px-2 cursor-default rounded-md text-center">
                                                {day}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Iterate over hours to create rows */}
                                    {hours.map((time, hourIdx) => (
                                        <tr key={hourIdx} className="text-center border-y-2 border-slate-400 hover:bg-gray-100">
                                            {/* First column for the time slot */}
                                            <td className="text-center cursor-default font-normal">{time}</td>
                                            {/* Iterate over days for each hour */}
                                            {days.map((day, dayIdx) => (
                                                <td key={dayIdx} className="border-2 border-slate-400 border-x">
                                                    {/* Check if the current day and hour exists in the availabilityMatrix */}
                                                    {schedule.some((entry) => entry.day === day && entry.time === time) ? (<FaCheck className="text-green-800 font-medium mx-auto" />) : ("")}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>



                            <p className='pl-2 pt-2  text-start text-xl'>στην οικία με διεύθυνση <span className='font-bold'>{address}</span>.</p>

                        </div>


                    </div>


                </div>
                </>
            )}
        </div>
    );
}

ApplicationPreview.propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    parentName: PropTypes.string.isRequired,
    parentSurname: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    schedule: PropTypes.arrayOf(
        PropTypes.shape({
            time: PropTypes.string.isRequired,
            day: PropTypes.string.isRequired
        })
    ).isRequired,
    months: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    startingDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};

export default ApplicationPreview;
