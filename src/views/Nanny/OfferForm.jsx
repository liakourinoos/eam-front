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

function OfferForm({action="Δημιουργία Νέας Αγγελίας"}){
    const nav=useNavigate();
    
    const {id} = useParams();

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
        onSuccess:()=>nav("/nannyoffers")
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
                hasAccepted: isView,
                hasSigned: isView,
                cantEdit: isView,
                id: isEdit ? data?.id : null,
            });
        }
    }, [data, isLoading, action]);

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
            <div className='w-full h-screen flex flex-col bg-pallete-50'>
                {RenderHeaderNavbar(userData,1)}
                
                {/* main page */}
                <div className='flex flex-col bg-pallete-50 flex-grow'>

                    {/* breadcrumbs */}
                    <div className="breadcrumbs  pl-5 text-md">
                        <ul>
                            <li><Link to='/nannyoffers'>Αγγελίες</Link></li>
                            <li><Link className='font-medium'>{action}</Link></li>
                        </ul>
                    </div>
                    
                    <p className='my-5 mx-auto text-3xl font-medium'>{action}</p>
                    {action!=="Προβολή Αγγελίας" && 
                        <div className='w-11/12  mx-auto'>
                            <button 
                                className={`border-2 font-medium w-48 border-gray-500 text-md px-2 h-16 rounded-md my-3  `}
                                

                                onClick={()=>addDraft()}
                                // title={formState.name==="" || formState.surname==="" || formState.AMKA==="" || formState.address==="" || formState.schedule.length===0 || formState.startingDate==="" || formState.months==="" || !formState.hasAccepted || !formState.hasSigned ? "Συμπληρώστε κάποιο από τα πεδία πρώτα." : ""}
                                // disabled={isPending || (
                                //         formState.name==="" && formState.surname==="" && formState.AMKA==="" && formState.address==="" && formState.schedule.length===0 && formState.startingDate==="" && formState.months==="" && !formState.hasAccepted && !formState.hasSigned)
                                // }
                            >
                                {isPending ? "Αποθήκευση..." : "Προσωρινή Αποθήκευση"}
                            </button>
                        </div>
                    }

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

export default OfferForm;

OfferForm.propTypes = {
    action: PropTypes.string,
};
