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
import { fetchOffer, addDraftOffer } from '../../FetchFunctions.jsx';
import { useQuery,useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

function OfferForm({action="Δημιουργία Νέας Αγγελίας"}){
    const nav=useNavigate();
    
    const {id} = useParams();
    const location = useLocation();
    const { state } = location || {}; // Access state from location
    const returnTo  = state || "offers"; // Destructure the state object safely

    const { userData } = useAuth();
    // form should either start with this or be fetched from the server
    const [formState, setFormState] = useState({
        town:"",
        rows:[
            {index:0, area:"",neighborhood:[],canHost:""}
        ],
        startingDate:"",
        months:"",
        childAge:"",
        timeType:""

    });

    

    const {data,isLoading}=useQuery({
        queryFn:()=>fetchOffer(id),
        queryKey:['offers',id],
        retry:false,
        enabled:action==="Προβολή Αγγελίας" || action==="Επεξεργασία Αγγελίας" && !!id
    })

    const {mutateAsync:addDraft,isPending} = useMutation({
        mutationFn:()=>addDraftOffer({...formState,userId:userData.id}),
        retry:false,
        onSuccess:()=>{
            nav("/nannyoffers", { state: { successMessage: "Η αγγελία αποθηκεύτηκε στις μη οριστικοποιημένες με επιτυχία." } })
        }
    })


    useEffect(() => {
        if (!isLoading && data) {
            const isView = action === "Προβολή Αγγελίας";
            const isEdit = action === "Επεξεργασία Αγγελίας";
    
            setFormState({
                ...formState,
                town: isEdit || isView ? data?.town ?? "": "",
                rows: isEdit || isView ? data?.rows ?? [ {index:0, area:"",neighborhood:[],canHost:""} ] : [ {index:0, area:"",neighborhood:[],canHost:""} ],
                // location: isEdit || isView ? data?.location ?? []: [],
                // neighborhood: isEdit || isView ? data?.neighborhood ?? [] : [],
                startingDate: isEdit || isView ? data?.startingDate ?? "" : "",
                months: isEdit || isView ? data?.months ?? "" : "",
                childAge: isEdit || isView ? data?.childAge ?? "" : "",
                timeType: isEdit || isView ? data?.timeType ?? "" : "",
                hasAccepted: isView,
                hasSigned: isView,
                cantEdit: isView,
                id: isEdit ? data?.id : null,
            });
        }
    }, [data, isLoading, action]);

    const isFormEmpty = () => {
        return !formState.town &&
            formState.rows.every(row => !row.area && row.neighborhood.length === 0 && !row.canHost) &&
            !formState.startingDate &&
            !formState.months &&
            !formState.childAge &&
            !formState.timeType;
    };

    const [selectedPage,setSelectedPage] = useState(1);
    const handleNextPage = (num=1)=> setSelectedPage(sp => sp+num);

    // {!isLoading && console.log(data)}

    if(isLoading)
        return(
            <div className='w-full h-screen bg-white flex items-center justify-center text-3xl font-medium'>
                <h1>Loading...</h1>
            </div>
        )

    if((action==="Προβολή Αγγελίας" && !isLoading && data) || action==="Δημιουργία Νέας Αγγελίας" || action==="Επεξεργασία Αγγελίας") 
        return(
            <div className='w-full min-h-screen flex flex-col bg-white'>
                {RenderHeaderNavbar(userData,returnTo==="history" ? 4:1)}
                
                {/* main page */}
                <div className='flex flex-col bg-white flex-grow'>

                    {/* breadcrumbs */}
                    <div className="breadcrumbs  pl-5 text-md">
                        <ul>
                            <li><Link to={returnTo==="offers" ? `/nannyoffers` : `/nannyhistory` }>{returnTo==="offers" ? "Αγγελίες" : "Ιστορικό"}</Link></li>
                            <li><span className='font-medium'>{action}</span></li>
                        </ul>
                    </div>
                    
                    <p className='my-5 mx-auto text-3xl font-medium'>{action}</p>
                    {action!=="Προβολή Αγγελίας" && 
                        <div className='w-11/12  mx-auto'>
                            <button 
                                className={`border-2 font-medium w-48 border-gray-500 text-md px-2 h-16 rounded-md my-3  
                                            ${isFormEmpty() ? "text-gray-500 cursor-not-allowed" : "border-2 border-pallete-800 text-pallete-800 font-semibold hover:bg-pallete-800 hover:text-white hover:border-pallete-800" }    
                                `}
                                
                                disabled={isFormEmpty()}
                                onClick={()=>addDraft()}
                                title={isFormEmpty() ? "Παρακαλούμε τροποποιήστε κάποιο από τα πεδία πρώτα." : ""}
                            >
                                {isPending ? "Αποθήκευση..." : "Προσωρινή Αποθήκευση"}
                            </button>
                        </div>
                    }

                    {/* main content, the two page form */}
                        <div className='w-11/12 mx-auto flex flex-col flex-grow bg-ςηιτε rounded-λγ shadow-md shadow-gray-600 mb-3 '>
                            
                            {/* page1,2,3 here */}
                            {selectedPage==1 && <FormPage1 form={formState} returnTo={returnTo} setForm={setFormState} nextFn={handleNextPage}/>}
                            {selectedPage==2 && <FormPage2 form={formState} returnTo={returnTo} setForm={setFormState} nextFn={handleNextPage}/>}
                            {selectedPage==3 && <FormPage3/>}



                        </div>

                </div>
                <Footer/>
            </div>

        );
}

export default OfferForm;

OfferForm.propTypes = {
    action: PropTypes.string,
};
