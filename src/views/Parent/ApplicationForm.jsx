import {RenderHeaderNavbar} from '../../../global_assets/global_functions.jsx';
import { useState,useEffect } from 'react';
import {useAuth} from '../../customHooks.jsx';
import Footer from '../../generic components/Footer.jsx';
import {Link, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import FormPage1 from './FormPage1.jsx';
import FormPage2 from './FormPage2.jsx';
import FormPage3 from './FormPage3.jsx';
import { useParams } from 'react-router-dom';
import { fetchApplication,addDraftApplication } from '../../FetchFunctions.jsx';
import { useQuery,useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

function ApplicationForm({action="Δημιουργία Νέου Συμφωνητικού"  }){
    const nav=useNavigate();
    const {id} = useParams();
    const location = useLocation();
    const { state } = location || {}; // Access state from location
    const returnTo  = state || "applications"; // Destructure the state object safely


    const { userData,loading } = useAuth();
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
        correctAMKA:false
    });

    

    const {data,isLoading}=useQuery({
        queryFn:()=>fetchApplication(id),
        queryKey:['application',id],
        retry:false,
        enabled:action==="Προβολή Συμφωνητικού" || action==="Επεξεργασία Συμφωνητικού" && !!id
    })

    const {mutateAsync:addDraft,isPending} = useMutation({
        mutationFn:()=>addDraftApplication({...formState,userId:userData.id}),
        retry:false,
        onSuccess:()=>nav("/parentapplications", { state: { successMessage: "Το συμφωνητικό αποθηκεύτηκε στα μη οριστικοποιημένα με επιτυχία." } })
    })
    console.log("inside application form: " +returnTo)


    useEffect(() => {
        if (!isLoading && data) {
            const isView = action === "Προβολή Συμφωνητικού";
            const isEdit = action === "Επεξεργασία Συμφωνητικού";
    
            setFormState({
                ...formState,
                name: isEdit || isView ? data?.nannyName ?? "" : "",
                surname: isEdit || isView ? data?.nannySurname ?? "" : "",
                AMKA: isEdit || isView ? data?.nannyAMKA ?? "" : "",
                address: isEdit || isView ? data?.address ?? "" : "",
                schedule: isEdit || isView ? data?.schedule ?? [] : [],
                startingDate: isEdit || isView ? data?.startingDate ?? "" : "",
                months: isEdit || isView ? data?.months ?? "" : "",
                hasAccepted: isView,
                hasSigned: isView,
                cantEdit: isView,
                id: isEdit ? data?.id : null,
                correctAMKA: isView ? true : (data?.correctAMKA ?? false)
            });
        }
    }, [data, isLoading, action]);

    const [selectedPage,setSelectedPage] = useState(1);
    const handleNextPage = (num=1)=> setSelectedPage(sp => sp+num);

    // {!isLoading && console.log(data)}

    if(isLoading || loading)
        return(
            <div className='w-full h-screen bg-white flex items-center justify-center text-3xl font-medium'>
                <span className='text-3xl font-bold'>Φόρτωση...</span>
            </div>
        )

    if(( (action==="Προβολή Συμφωνητικού" && !isLoading && data) || action==="Δημιουργία Νέου Συμφωνητικού" || action==="Επεξεργασία Συμφωνητικού") ) 
        return(
            <div className='w-full min-h-screen flex flex-col bg-white'>
                {RenderHeaderNavbar(userData,returnTo==="history" ? 5:2)}
                
                {/* main page */}
                <div className='flex flex-col bg-white mb-5 flex-grow'>

                    {/* breadcrumbs */}
                    <div className="breadcrumbs  pl-5 text-md">
                        <ul>
                            <li><Link to={returnTo==="applications" ? `/parentapplications` : `/parentHistory` }>{returnTo==="applications" ? "Συμφωνητικά" : "Ιστορικό"}</Link></li>
                            <li><p className='font-semibold'>{action}</p></li>
                        </ul>
                    </div>
                    
                    <p className='my-5 mx-auto text-3xl font-medium'>{action}</p>
                    {action!=="Προβολή Συμφωνητικού" && selectedPage!==3 &&
                        <div className='w-11/12  mx-auto'>
                            <button 
                                className={`border-2 font-medium w-48 border-gray-500 text-md px-2 h-16 rounded-md my-3 
                                    ${(formState.name==="" && formState.surname==="" && formState.AMKA==="" && formState.address==="" 
                                        && formState.schedule.length===0 && formState.startingDate==="" && formState.months==="" && !formState.hasAccepted && !formState.hasSigned)
                                        ? "text-gray-500 cursor-not-allowed" : "border-2 border-pallete-800 text-pallete-800 font-semibold hover:bg-pallete-800 hover:text-white hover:border-pallete-800"}
                                `}

                                onClick={()=>addDraft()}
                                title={formState.name==="" || formState.surname==="" || formState.AMKA==="" || formState.address==="" || formState.schedule.length===0 || formState.startingDate==="" || formState.months==="" || !formState.hasAccepted || !formState.hasSigned ? "Συμπληρώστε κάποιο από τα πεδία πρώτα." : ""}
                                disabled={isPending || (
                                        formState.name==="" && formState.surname==="" && formState.AMKA==="" && formState.address==="" && formState.schedule.length===0 && formState.startingDate==="" && formState.months==="" && !formState.hasAccepted && !formState.hasSigned)
                                }
                            >
                                {isPending ? "Αποθήκευση..." : "Προσωρινή Αποθήκευση"}
                            </button>
                        </div>
                    }

                    {/* main content, the two page form */}
                        <div className='w-11/12 mx-auto flex flex-col flex-grow bg-white rounded-lg shadow-md shadow-gray-600 mb-3 '>
                            
                            {/* page1,2,3 here */}
                            {selectedPage==1 && <FormPage1 myId={userData?.id} form={formState} setForm={setFormState} returnTo={returnTo} nextFn={handleNextPage}/>}
                            {selectedPage==2 && <FormPage2 form={formState} setForm={setFormState} nextFn={handleNextPage} returnTo={returnTo}/>}
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
    // returnTo: PropTypes.string
};
