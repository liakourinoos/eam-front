import { RenderHeaderNavbar } from '../../../../global_assets/global_functions.jsx';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../customHooks.jsx';
import Footer from '../../../generic components/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import RenewFormPage1 from './RenewFormPage1.jsx';
import RenewFormPage2 from './RenewFormPage2.jsx';
import RenewFormPage3 from './RenewFormPage3.jsx';
import { useParams } from 'react-router-dom';
import { fetchApplication, addDraftApplication } from '../../../FetchFunctions.jsx';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

function RenewApplicationForm() {
    const action = "Δημιουργία Νέου Συμφωνητικού";
    const nav = useNavigate();
    const { id } = useParams();



    const { userData, loading } = useAuth();
    // form should either start with this or be fetched from the server
    const [formState, setFormState] = useState({
        name: "",
        surname: "",
        AMKA: "",
        address: "",
        schedule: [],
        startingDate: "",
        months: "",
        hasAccepted: false,
        hasSigned: false,
        correctAMKA: false,
        cantEdit: false
    });



    const { data, isLoading } = useQuery({
        queryFn: () => fetchApplication(id),
        queryKey: ['renewApplication', id],
        retry: false,
        // enabled:action==="Προβολή Συμφωνητικού" || action==="Επεξεργασία Συμφωνητικού" && !!id
    })

    const { mutateAsync: addDraft, isPending } = useMutation({
        mutationFn: () => addDraftApplication({ ...formState, userId: userData.id }),
        retry: false,
        onSuccess: () => nav("/parentapplications")
    })


    useEffect(() => {
        if (!isLoading && data) {
            setFormState({
                ...formState,
                name: data?.nannyName ?? "",
                surname: data?.nannySurname ?? "",
                AMKA: data?.nannyAMKA ?? "",
                address: data?.address ?? "",
                schedule: data?.schedule ?? [],
                startingDate: "",
                months: "",
                id: null, //tha ftiaksoume new application
                correctAMKA: true  //true, afou pairnoume etoimo to on/mo kai amka apo tin final
            });
        }
    }, [data, isLoading, action]);

    const [selectedPage, setSelectedPage] = useState(1);
    const handleNextPage = (num = 1) => setSelectedPage(sp => sp + num);

    // {!isLoading && console.log(data)}

    if (isLoading || loading)
        return (
            <div className='w-full h-screen bg-white flex items-center justify-center text-3xl font-medium'>
                <span className='text-3xl font-bold'>Φόρτωση...</span>
            </div>
        )

    if ((action === "Δημιουργία Νέου Συμφωνητικού" && !isLoading && data))
        return (
            <div className='w-full min-h-screen flex flex-col bg-white'>
                {RenderHeaderNavbar(userData, 2)}

                {/* main page */}
                <div className='flex flex-col bg-white flex-grow'>

                    {/* breadcrumbs */}
                    <div className="breadcrumbs  pl-5 text-md">
                        <ul>
                            <li><Link to={`/parentapplications`}>Συμφωνητικά</Link></li>
                            <li><p className='font-semibold'>{action}</p></li>
                        </ul>
                    </div>

                    <p className='my-5 mx-auto text-3xl font-medium'>{action}</p>
                    {action !== "Προβολή Συμφωνητικού" && selectedPage !== 3 &&

                        <div className='w-11/12  mx-auto'>
                            <button
                                className={`border-2 font-medium w-48 border-gray-500 text-md px-2 h-16 rounded-md my-3 
                                    ${(formState.name === "" && formState.surname === "" && formState.AMKA === "" && formState.address === ""
                                        && formState.schedule.length === 0 && formState.startingDate === "" && formState.months === "" && !formState.hasAccepted && !formState.hasSigned)
                                        ? "cursor-not-allowed bg-gray-200" : "cursor-pointer bg-white"}
                                `}

                                onClick={() => addDraft()}
                                title={formState.name === "" || formState.surname === "" || formState.AMKA === "" || formState.address === "" || formState.schedule.length === 0 || formState.startingDate === "" || formState.months === "" || !formState.hasAccepted || !formState.hasSigned ? "Συμπληρώστε κάποιο από τα πεδία πρώτα." : ""}
                                disabled={isPending || (
                                    formState.name === "" && formState.surname === "" && formState.AMKA === "" && formState.address === "" && formState.schedule.length === 0 && formState.startingDate === "" && formState.months === "" && !formState.hasAccepted && !formState.hasSigned)
                                }
                            >
                                {isPending ? "Αποθήκευση..." : "Προσωρινή Αποθήκευση"}
                            </button>
                        </div>
                    }


                    {/* main content, the two page form */}
                    <div className='w-11/12 mx-auto flex flex-col flex-grow bg-white rounded-lg shadow-md shadow-gray-600 mb-3 '>
                        {/* page1,2,3 here */}
                        {selectedPage == 1 && <RenewFormPage1 myId={userData?.id} form={formState} setForm={setFormState} nextFn={handleNextPage} />}
                        {selectedPage == 2 && <RenewFormPage2 form={formState} setForm={setFormState} nextFn={handleNextPage} />}
                        {selectedPage == 3 && <RenewFormPage3 />}



                    </div>

                </div>
                <Footer />
            </div>

        );
}

export default RenewApplicationForm;
