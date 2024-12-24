import {RenderHeaderNavbar} from '../../../global_assets/global_functions.jsx';
import { useContext,useState,useEffect } from 'react';
import {useAuth} from '../../customHooks.jsx';
import Footer from '../../generic components/Footer.jsx';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FormPage1 from './FormPage1.jsx';
import FormPage2 from './FormPage2.jsx';
import FormPage3 from './FormPage3.jsx';
function ApplicationForm({action="Δημιουργία Νέας Αίτησης"}){
    const { userData } = useAuth();
    // form should either start with this or be fetched from the server
    const [formState, setFormState] = useState({
        name:"",
        surname:"",
        AMKA:"",
        address:"",
        schedule:[],
        startingDate:"",
        months:"",
        hasAccepted:false,
        hasSigned:false,
    });

    const [selectedPage,setSelectedPage] = useState(1);
    const handleNextPage = (num=1)=> setSelectedPage(sp => sp+num);

    return(
        <div className='w-full h-screen flex flex-col bg-pallete-50'>
            {RenderHeaderNavbar(userData,2)}
            
            {/* main page */}
            <div className='flex flex-col bg-pallete-50 flex-grow'>

                {/* breadcrumbs */}
                <div className="breadcrumbs  pl-5 text-md">
                    <ul>
                        <li><Link to='/parentapplications'>Αιτήσεις</Link></li>
                        <li><Link className='font-medium'>{action}</Link></li>
                    </ul>
                </div>

                <p className='my-5 mx-auto text-3xl font-medium'>{action}</p>
                <div className='w-11/12  mx-auto'>
                    <button className='bg-white border-2 font-medium w-48 border-gray-500 text-md px-2 h-16 rounded-md my-3 '>
                        Προσωρινή Αποθήκευση
                    </button>
                </div>

                {/* main content, the two page form */}
                    <div className='w-11/12 mx-auto flex flex-col flex-grow bg-pallete-100 rounded-md shadow-md shadow-gray-400 mb-3 '>

                        {/* page1,2,3 here */}
                        {selectedPage==1 && <FormPage1 form={formState} setForm={setFormState} nextFn={handleNextPage}/>}
                        {selectedPage==2 && <FormPage2 form={formState} setForm={setFormState} nextFn={handleNextPage}/>}
                        {selectedPage==3 && <FormPage3/>}



                    </div>

            </div>
            <Footer/>
        </div>

    );
}

export default ApplicationForm;

ApplicationForm.propTypes = {
    action: PropTypes.string,
};
