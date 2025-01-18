import { collection, addDoc,deleteDoc ,getDocs,query, where,doc,orderBy, updateDoc,getDoc,runTransaction,Timestamp,writeBatch} from "firebase/firestore";
import { db,auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updateEmail,updatePassword } from "firebase/auth";



// Function to update the user's email without email verification
export async function updateUserEmail(password,newEmail) {
    const user = auth.currentUser;
    
    if (!user) {
        console.error("No user is signed in.");
        return;
    }

    // Reauthenticate the user (important for email updates)
    const credential = EmailAuthProvider.credential(user.email, password); // Use the current password
    try {
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, newEmail);
        console.log("Email updated successfully to:", newEmail);
    } catch (error) {
        console.error("Error updating email:", error.message);
    }
}

  // Function to update the user's password without verification
export async function updateUserPassword(password,newPassword) {
    const user = auth.currentUser;
    
    if (!user) {
        console.error("No user is signed in.");
        return;
    }

    // Reauthenticate the user (important for password updates)
    const credential = EmailAuthProvider.credential(user.email, password); // Use the current password
    try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        console.log("Password updated successfully!");
    } catch (error) {
        console.error("Error updating password:", error.message);
    }
}


export async function fetchUser(id) {
    const res = [];
    console.log(id)
        try {
             // Get the document reference based on the user id
            const docRef = doc(db, "users", id);
            // Fetch the document snapshot
            const docSnap = await getDoc(docRef);
            // Check if the document exists
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            else{
                console.error('No document found for userId:', id);
            }
        }
        catch(error){
                console.error('Error fetching user data: ', error);
        }
        
        console.log(res)
        return res;
        
}

export async function updateBio(id,newBio) {
    console.log(id,newBio)
    try {
        // Directly reference the document using the document ID
        const docRef = doc(db, "users", id); // `id` is the document ID

        // Update the 'bio' field in the document
        await updateDoc(docRef, {
            bio: newBio,
        });

        console.log(`Document with ID ${id} updated successfully.`);
    } catch (error) {
        console.error("Error updating document:", error);
    }
}


export async function updatePic(id,newImg) {
    console.log(id,newImg)
    try {
        // Directly reference the document using the document ID
        const docRef = doc(db, "users", id); // `id` is the document ID

        // Update the 'bio' field in the document
        await updateDoc(docRef, {
            img: newImg,
        });

        console.log(`Document with ID ${id} updated successfully.`);
    } catch (error) {
        console.error("Error updating document:", error);
    }
}





export async function updateSchedule(id,schedule){
    try {
        // Directly reference the document using the document ID
        const docRef = doc(db, "users", id); // `id` is the document ID

        // Update the 'bio' field in the document
        await updateDoc(docRef, {
            availabilityMatrix: schedule,
        });

        console.log(`Document with ID ${id} updated successfully.`);
    } catch (error) {
        console.error("Error updating document:", error);
    }
}

export async function fetchNannies(){
    // console.log("called..")
    const result=[]
    try {
        const q = query(collection(db, 'users'),
            where('role', '==', false)
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
            
        } else {
            console.error('No nannies found..');
        }
    }catch(error){
        console.error('Error fetching nannies');
    }

    console.log("before exit...")
    return result;

}


export async function updateSkills(id,skills){
    try {
        // Directly reference the document using the document ID
        const docRef = doc(db, "users", id); // `id` is the document ID

        // Update the 'bio' field in the document
        await updateDoc(docRef, {
            skills: skills,
        });

        console.log(`Document with ID ${id} updated successfully.`);
    } catch (error) {
        console.error("Error updating document:", error);
    }
}


export async function updateNumber(id,newNumber) {
    // console.log(id,newBio)
    try {
        // Directly reference the document using the document ID
        const docRef = doc(db, "users", id); // `id` is the document ID

        // Update the 'bio' field in the document
        await updateDoc(docRef, {
            number: newNumber,
        });

        console.log(`Document with ID ${id} updated successfully.`);
    } catch (error) {
        console.error("Error updating document:", error);
    }
}

export async function updateSkype(id,newSkype) {
    // console.log(id,newBio)
    try {
        // Directly reference the document using the document ID
        const docRef = doc(db, "users", id); // `id` is the document ID

        // Update the 'bio' field in the document
        await updateDoc(docRef, {
            skype: newSkype,
        });

        console.log(`Document with ID ${id} updated successfully.`);
    } catch (error) {
        console.error("Error updating document:", error);
    }
}


export async function registerUser(userData) {
    const auth = getAuth();

    try {
        // Step 1: Create a new user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        const user = userCredential.user;

        // Step 2: Use a Firestore transaction to assign the global counter value
        const counterDocRef = doc(db, "metadata", "globalCounter");
        const usersCollectionRef = collection(db, "users");

        const newData = await runTransaction(db, async (transaction) => {
            const counterDoc = await transaction.get(counterDocRef);

            if (!counterDoc.exists()) {
                throw new Error("Global counter document does not exist.");
            }

            // Get the current counter value and increment it
            const currentCounter = counterDoc.data().value;
            const updatedCounter = currentCounter + 1;

            // Update the global counter in the metadata collection
            transaction.update(counterDocRef, { value: updatedCounter });

            // Create the new user data with the counter value
            const userDataWithCounter = {
                uid: user.uid, // Authenticated user's UID
                email: userData.email, // Authenticated user's email
                AMKA: currentCounter.toString(), // Assign the current counter value
                ...userData, // Other data passed to the function
            };

            // Add the new user to the users collection
            const userDocRef = doc(usersCollectionRef);
            transaction.set(userDocRef, userDataWithCounter);

            return userDataWithCounter;
        });

        console.log("User registered and added to Firestore with counter:", newData);
        return newData; // Return the user data for further use
    } catch (error) {
        console.error("Error registering user:", error.message);
        throw error; // Re-throw to handle in calling code
    }
}


export async function fetchAllFinalApplications(userId){
    const applications = [];
        try {
            // Query to find the user document based on UID field
            const q = query(collection(db, 'applications'),
                where('userId', '==', userId),
                where('status', 'in', ['Εγκρίθηκε', 'Εκκρεμεί']), //or
                where('type', '==' , 'final'),
                where('archived', '==', false),
                orderBy('exactDate', 'desc') // Sort by most recent
            );
            const querySnapshot = await getDocs(q); // Get documents matching the query
            if (!querySnapshot.empty) {
                
                querySnapshot.forEach((doc) => {
                    applications.push({ id: doc.id, ...doc.data() });
                });
                
            } else {
                console.error('No document found for userId:', userId);
            }
        }catch(error){
            console.error('Error fetching user data: ', error);
        }
        console.log(applications)
        return applications;
        
    
    

}



export async function fetchAllDraftApplications(userId){
    const applications = [];
        try {
            // Query to find the user document based on UID field
            const q = query(collection(db, 'applications'),
                where('userId', '==', userId),
                // where('status', 'in', ['Εγκρίθηκε', 'Εκκρεμεί']), //or
                where('type', '==' , 'draft')
            );
            const querySnapshot = await getDocs(q); // Get documents matching the query
            if (!querySnapshot.empty) {
                
                querySnapshot.forEach((doc) => {
                    applications.push({ id: doc.id, ...doc.data() });
                });
                
            } else {
                console.error('No document found for userId:', userId);
            }
        }catch(error){
            console.error('Error fetching user data: ', error);
        }
        finally{
            console.log(applications)
            return applications;
        }
    
    

}

export async function fetchApplication(id){
    console.log(id)
    try {
        // Get the document reference based on the user id
        const docRef = doc(db, "applications", id);
        // Fetch the document snapshot
        const docSnap = await getDoc(docRef);
        // Check if the document exists
        if (docSnap.exists()) {
            // Return the data as an object
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('Application not found');
        }
    } catch (error) {
        console.error("Error fetching final application:", error);
        throw error; // Propagate the error so the calling component can handle it
    }
}

export async function addFinalApplication( data ) {
    console.log(data)
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    console.log(formattedDate)
    const exactDate = Timestamp.now();
    let docRef;
    try {
        const applicationsCollection = collection(db, 'applications');

        // Prepare the application data
        const applicationData = {
            nannyName: data.name,
            nannySurname: data.surname,
            startingDate: data.startingDate,  // Keep it as a string or convert to timestamp
            months: data.months,
            address: data.address,
            schedule: data.schedule,          // Store the schedule as an array or an object
            status: 'Εκκρεμεί',               // Default status
            nannyAMKA: data.AMKA,
            userId: data.userId,
            finalizedAt:formattedDate,
            exactDate : exactDate,
            type:'final',
            archived:false
        };

        //first, check if there are any applications with that id that have type "draft" to update them. else, we create the draft from the beginning
        if(data.id){
            //replace it with the actual data below
            docRef = doc(db, 'applications', data.id);
            await updateDoc(docRef, applicationData); 
        }
        else{
            // create the document
            docRef = await addDoc(applicationsCollection, applicationData);
        }


        //find the nannyId by quering in users using data.AMKA
        const q = query(collection(db, 'users'),
            where('AMKA', '==', data.AMKA)
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        let nannyId = ""
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                nannyId = doc.id;
            });
        }

        // make the proper notification from parent to nanny
        const notificationData = {
            senderId: data.userId,
            receiverId: nannyId,
            type: 'jobOffer',
            createdAt: formattedDate,
            applicationId:docRef.id,
            exactDate:exactDate,
            read:false,
            status:"pending"
        };

        const notificationsCollection = collection(db, 'notifications');
        await addDoc(notificationsCollection, notificationData);  // Adds the document
    
        return { success: true, message: 'Application created successfully' };
    } catch (error) {
        console.error('Error adding application:', error);  // Catch and log any errors
        return { success: false, message: 'Error creating application' };
    }
}


export async function addDraftApplication(data){
    console.log(data)
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    console.log(formattedDate)
    const exactDate = Timestamp.now();
    try {
        // Prepare the application data
        const applicationData = {
            nannyName: data.name || "",
            nannySurname: data.surname || "",
            startingDate: data.startingDate || "",  // Ensure it's either a string or timestamp
            months: data.months || "",
            address: data.address || "",
            schedule: data.schedule || [],         // Default empty array if not provided
            status: 'Εκκρεμεί',                   // Default status
            nannyAMKA: data.AMKA || "",
            userId: data.userId || "",
            finalizedAt: formattedDate,
            exactDate : exactDate,
            archived:false,
            type: 'draft'
        };

        //first, check if there are any applications with that id that have type "draft" to update them
        if (data.id) {
            // Check if document exists before updating
            const docRef = doc(db, 'applications', data.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Update existing document
                await updateDoc(docRef, applicationData);
                return { success: true, message: 'Draft application updated successfully' };
            } else {
                // Handle missing document
                return { success: false, message: `No draft application found with ID: ${data.id}` };
            }
        } else {
            // Add a new draft application
            const applicationsCollection = collection(db, 'applications');
            const newDocRef = await addDoc(applicationsCollection, applicationData);
            return { success: true, message: 'New draft application created successfully', id: newDocRef.id };
        }
    
    } catch (error) {
        console.error('Error adding application:', error);  // Catch and log any errors
        return { success: false, message: 'Error creating application' };
    }
}

export async function fetchAllFinalOffers(userId){
    const offers = [];
    try {
        // Query to find the user document based on UID field
        const q = query(collection(db, 'offers'),
            where('userId', '==', userId),
            where('type', '==' , 'final'),
            where('archived', '==', false)
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {                
            querySnapshot.forEach((doc) => {
                offers.push({ id: doc.id, ...doc.data() });
            });                
        } else {
            console.error('No document found for userId:', userId);
        }
    }catch(error){
        console.error('Error fetching user data: ', error);
    }
    finally{
        console.log(offers)
        return offers;
    }
}



export async function fetchAllDraftOffers(userId){
    const offers = [];
    try {
        // Query to find the user document based on UID field
        const q = query(collection(db, 'offers'),
            where('userId', '==', userId),
            where('type', '==' , 'draft'),
            where('archived', '==', false)
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {                
            querySnapshot.forEach((doc) => {
                offers.push({ id: doc.id, ...doc.data() });
            });                
        } else {
            console.error('No document found for userId:', userId);
        }
    }catch(error){
        console.error('Error fetching user data: ', error);
    }
    finally{
        console.log(offers)
        return offers;
    }
}

export async function addFinalOffer( data ) {
    console.log(data)
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    console.log(formattedDate)
    const exactDate = Timestamp.now();
    const applicationData = {
        town:data.town,
        rows:data.rows,
        startingDate: data.startingDate,  // Keep it as a string or convert to timestamp
        months: data.months,
        userId: data.userId,
        finalizedAt:formattedDate,
        type:'final',
        archived:false,
        childAge: data.childAge || "null",
        exactDate:exactDate,
        timeType:data.timeType
    };

    try {
        //first, check if there are any offers with that id that have type "draft" to update them
        if(data.id){
            //remove the document with that id and replace it with the actual data below
            const docRef = doc(db, 'offers', data.id);

            //update the document
            await updateDoc(docRef, applicationData);

        }
        //else, create the document
        const applicationsCollection = collection(db, 'offers');
        await addDoc(applicationsCollection, applicationData);  // Adds the document
    
        return { success: true, message: 'Offer created successfully' };
    } catch (error) {
        console.error('Error adding application:', error);  // Catch and log any errors
        return { success: false, message: 'Error creating Offer' };
    }
}


export async function archiveOffer(id){
    console.log(id)
    try {
        const docRef = doc(db, 'offers', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Update existing document
            await updateDoc(docRef, { archived: true });
            return { success: true, message: 'Offer archived successfully' };
        } else {
            // Handle missing document
            return { success: false, message: `No offer found with ID: ${id}` };
        }
    } catch (error) {
        console.error('Error archiving offer:', error.message);
        return { success: false, message: 'Error archiving offer' };
    }
}


export async function fetchOffer(id){
    console.log(id)
    try {
        // Get the document reference based on the user id
        const docRef = doc(db, "offers", id);
        // Fetch the document snapshot
        const docSnap = await getDoc(docRef);
        // Check if the document exists
        if (docSnap.exists()) {
            // Return the data as an object
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('Application not found');
        }
    } catch (error) {
        console.error("Error fetching final application:", error);
        throw error; // Propagate the error so the calling component can handle it
    }
}

export async function addDraftOffer(data){
    console.log(data)
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    console.log(formattedDate)
    const exactDate = Timestamp.now();
    // Prepare the application data

    const applicationData = {
        town:data.town,
        rows:data.rows,
        startingDate: data.startingDate,  // Keep it as a string or convert to timestamp
        months: data.months,
        userId: data.userId,
        finalizedAt:formattedDate,
        type:'draft',
        archived:false,
        exactDate : exactDate,
        timeType:data.timeType,

        childAge: data.childAge || "null",
    };
    try {
        

        //first, check if there are any applications with that id that have type "draft" to update them
        if (data.id){
            // Check if document exists before updating
            const docRef = doc(db, 'offers', data.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Update existing document
                await updateDoc(docRef, applicationData);
                return { success: true, message: 'Draft application updated successfully' };
            } else {
                // Handle missing document
                return { success: false, message: `No draft application found with ID: ${data.id}` };
            }
        } else { // Add a new draft offer
            
            const offersCollection = collection(db, 'offers');
            const newDocRef = await addDoc(offersCollection, applicationData);
            return { success: true, message: 'New draft application created successfully', id: newDocRef.id };
        }
    
    } catch (error) {
        console.error('Error adding application:', error);  // Catch and log any errors
        return { success: false, message: 'Error creating application' };
    }
}



export async function updateUserInfo(id,field,data){
    try {
        // Directly reference the document using the document ID
        const docRef = doc(db, "users", id); // `id` is the document ID

        await updateDoc(docRef, {
            [field]: data,
        });

        console.log(`Document with ID ${id} updated successfully.`);
    } catch (error) {
        console.error("Error updating document:", error);
    }
}

export async function fetchNotifications(userId){
    // console.log("called..")
    const result=[]
    try {
        const q = query(collection(db, 'notifications'),
            where('receiverId', '==', userId)
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
            
        } else {
            console.error('No nannies found..');
        }

    //     // fetch contact requests too
    //     const q1 = query(collection(db, 'contactRequests'),
    //         where('receiverId', '==', userId)
    //     );
    //     const querySnapshot1 = await getDocs(q1); // Get documents matching the query
    //     if (!querySnapshot1.empty) {
    //         querySnapshot1.forEach((doc) => {
    //             result.push({ id: doc.id, ...doc.data() });
    //         });
            
    //     // console.log(result)
    //     } else {
    //         console.error('No nannies found..');
    //     }
    }catch(error){
        console.error('Error fetching nannies');
    }

    // Sort the result array by 'exactDate' in descending order (latest first)
    result.sort((a, b) => {
        // Ensure 'exactDate' is a valid Timestamp and compare the time
        const dateA = a.exactDate instanceof Date ? a.exactDate : a.exactDate.toDate();
        const dateB = b.exactDate instanceof Date ? b.exactDate : b.exactDate.toDate();
        return dateB - dateA; // Sorting in descending order (latest first)
    });
    
    console.log(result)

    return result;
}


export async function fetchJobNotification(id) {
    try {
        // Fetch notification by id
        const docRef = doc(db, 'notifications', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            console.error(`Notification with id ${id} not found.`);
            throw new Error(`Notification with id ${id} not found.`);
        }
        const data = docSnap.data();

        // Verify senderId and applicationId
        if (!data.senderId || !data.applicationId) {
            throw new Error("Missing senderId or applicationId in the notification data.");
        }
        const senderId=data.senderId;
        // Fetch sender's name and surname using document ID
        const senderDocRef = doc(db, 'users', data.senderId);
        const senderDocSnap = await getDoc(senderDocRef);
        let senderName = "", senderSurname = "",img="",gender="";
        if (senderDocSnap.exists()) {
            const senderData = senderDocSnap.data();
            senderName = senderData.name || "";
            senderSurname = senderData.surname || "";
            img=senderData.img || "";
            gender=senderData.gender || "";
            
        } else {
            console.error(`User with id ${data.senderId} not found.`);
        }

        // Fetch application details using document ID
        const appDocRef = doc(db, 'applications', data.applicationId);
        const appDocSnap = await getDoc(appDocRef);
        let schedule = [], startingDate = "", months = "", address = "",finalizedAt="";
        if (appDocSnap.exists()) {
            const appData = appDocSnap.data();
            schedule = appData.schedule || [];
            startingDate = appData.startingDate || "";
            months = appData.months || "";
            address = appData.address || "";
            finalizedAt=appData.finalizedAt || "";
        } else {
            console.error(`Application with id ${data.applicationId} not found.`);
        }

        // Return structured data
        return {
            senderId,
            senderName,
            senderSurname,
            img,
            gender,
            finalizedAt,
            schedule,
            startingDate,
            months,
            address,
            status:data.status
        };

    } catch (error) {
        console.error("Fetching failed:", error);
        throw error;
    }
}
export async function fetchContactRequestNotification(id) {
    try {
        // Fetch notification by id
        const docRef = doc(db, 'notifications', id);
        console.log("Fetching document from contactRequests with ID:", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.error(`Document with id ${id} not found in contactRequests.`);
            throw new Error(`Document with id ${id} not found in contactRequests.`);
        }

        const data = docSnap.data();
        // console.log("Document data fetched from contactRequests:", data);

        // Verify senderId and applicationId
        if (!data.senderId ) {
            console.error("Notification data is missing senderId or applicationId:", data);
            throw new Error("Missing senderId or applicationId in the notification data.");
        }

        const senderId = data.senderId;
        // console.log("Sender ID:", senderId);

        // Fetch sender's name and surname using document ID
        const senderDocRef = doc(db, 'users', senderId);
        const senderDocSnap = await getDoc(senderDocRef);
        let senderName = "", senderSurname = "", img = "", gender = "";

        if (senderDocSnap.exists()) {
            const senderData = senderDocSnap.data();
            // console.log("Sender document data:", senderData);

            senderName = senderData.name || "";
            senderSurname = senderData.surname || "";
            img = senderData.img || "";
            gender = senderData.gender || "";
        } else {
            console.error(`User with id ${senderId} not found in users collection.`);
        }
        // Return structured data
        return {
            senderId,
            senderName,
            senderSurname,
            img,
            gender,
            createdAt: data.createdAt,
            status:data.status

        };
    } catch (error) {
        console.error("Fetching failed:", error);
        throw error;
    }
}


export async function addContactRequest(data){
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    console.log(data)
    const exactDate = Timestamp.now();
    try{
        const contactData = {
            senderId: data.senderId,
            receiverId: data.receiverId,
            status: "pending",
            createdAt: formattedDate,
            contactType: data.contactType,
            contactInfo: data.contactInfo,
            type:"contactRequest",
            exactDate:exactDate,
        };

        const contactsCollection = collection(db, 'contactRequests');
        const docRef= await addDoc(contactsCollection, contactData);  // Adds the document

        // make the proper notification from parent to nanny
        const notificationData = {
            senderId: data.senderId,
            receiverId: data.receiverId,
            type: 'contactRequest',
            createdAt: formattedDate,
            contactRequestId:docRef.id,
            exactDate:exactDate,
            read:false,
            status:"pending"
        };

        const notificationsCollection = collection(db, 'notifications');
        await addDoc(notificationsCollection, notificationData);  // Adds the document

        return { success: true, message: 'Contact request sent successfully' };

    }
    catch(error){

    }
}


// epistrefei ta reviews pou ekanan oi goneis gia tin ntanta
export async function fetchNannyReviews(nannyId){
    
    // console.log("id:"+nannyId)
    const results=[];
    try{
        const reviewRes=[];
        // fetch all reviews for that user
        const q = query(collection(db, 'parentReviews'),
            where('nannyId', '==', nannyId)
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                reviewRes.push({ id: doc.id, ...doc.data() });
            });
            
        } else {
            console.error('No nannies found..');
        }

        //get details of each parent
        for(let i=0;i<reviewRes.length;i++){
            const parentDocRef = doc(db, 'users', reviewRes[i].parentId);
            const parentDocSnap = await getDoc(parentDocRef);
            let personName = "", personSurname = "",img="";
            if (parentDocSnap.exists()) {
                const parentData = parentDocSnap.data();
                personName = parentData.name || "";
                personSurname = parentData.surname || "";
                img=parentData.img || "";
                results.push({ id: reviewRes[i].id, ...reviewRes[i],personName,personSurname,img });
            } else {
                console.error(`User with id ${reviewRes[i].personId} not found.`);
            }
        }


    }
    catch(error){
        // console.log(error.message)
        throw new error
    }
    console.log(results)

    return results;

}



// epistrefei ta reviews pou ekanan oi gones se ntantades
export async function fetchParentReviews(parentId){
    // console.log(parentId);
    
    // fetch reviews from parents
    const results=[];
    
    try{
        const reviewRes=[];
        // fetch all reviews for that user
        const q = query(collection(db, 'parentReviews'),
            where('parentId', '==', parentId)
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                reviewRes.push({ id: doc.id, ...doc.data() });
            });
            
        } else {
            console.error('No nannies found..');
        }
        // console.log("reviews: ")
        // console.log(reviewRes)

        //fetch the nanny info from the reviews through the 'users' collection
        for(let i=0;i<reviewRes.length;i++){
            const nannyDocRef = doc(db, 'users', reviewRes[i].nannyId);
            const nannyDocSnap = await getDoc(nannyDocRef);
            let personName = "", personSurname = "",img="";
            if (nannyDocSnap.exists()) {
                const nannyData = nannyDocSnap.data();
                personName = nannyData.name || "";
                personSurname = nannyData.surname || "";
                img=nannyData.img || "";
                results.push({ id: reviewRes[i].id, ...reviewRes[i],personName,personSurname,img });
            } else {
                console.error(`User with id ${reviewRes[i].personId} not found.`);
            }
        }
    }
    catch(error){
        throw new error
    }
    console.log(results)
    return results;




}


export async function fetchNotificationCount(userId){
    let count=0;
    try{
        const q = query(collection(db, 'notifications'),
            where('receiverId', '==', userId),
            where('read', '==', false)
            
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                count++;
            });
        } 
        else {
            // console.error('No nannies found..');
        }
    }
    catch(error){
        console.log(error.message)
    }
    // console.log(count)
    return count;
}

export async function readNotifications(userId) {
    try {
        const q = query(
            collection(db, 'notifications'),
            where('receiverId', '==', userId),
            where('read', '==', false)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const batch = writeBatch(db); // Use a batch for efficiency
            querySnapshot.forEach((docSnapshot) => {
                const docRef = docSnapshot.ref; // Use the snapshot's ref directly
                batch.update(docRef, { read: true }); // Batch update
            });
            await batch.commit(); // Commit all updates
        } else {
            console.error('No unread notifications found.');
        }
    } catch (error) {
        console.error('Error updating notifications:', error.message);
    }
}



export async function rejectContact(notificationId){
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    console.log(formattedDate)
    const exactDate = Timestamp.now();
    try{
        // console.log("aaa"+notificationId)

        //fetch the notification 
        const docRef1 = doc(db, 'notifications', notificationId);
        console.log("Fetching document from contactRequests with ID:", notificationId);
        const docSnap = await getDoc(docRef1);
        // Get the fields of the notification
        if (!docSnap.exists()) {
            console.error(`Notification document with ID ${notificationId} does not exist.`);
            return;
        }
        const notifData = docSnap.data();
        
        console.log("notifData:")
        console.log(notifData)

        // update the status of the notification
        await updateDoc(docRef1, {
            status:"rejected"
        });



        if (!notifData.
            contactRequestId) {
            console.error("applicationId is missing in the notification data:", notifData);
            return;
        }
        // first, get the application id to change its status and make it archived
        const docRef2 = doc(db, 'contactRequests',notifData.contactRequestId);
        console.log("Fetching document from contactRequests with ID:", notifData.contactRequestId);
        const docSnap2 = await getDoc(docRef2);
        const contactData=docSnap2.data();
        
        console.log("RequestData:")
        console.log(contactData)
        
        // update the fields of the application
        await updateDoc(docRef2, {
            archived: true,
            status:"Απερρίφθη"
        });
        
        //send a new notification to the parent about the status of their contact request


        // make the proper notification nanny to parent
        const notificationData = {
            senderId: notifData.receiverId,
            receiverId:  notifData.senderId,
            type: 'contactRequest',
            createdAt: formattedDate,
            contactRequestId:notifData.contactRequestId,
            exactDate:exactDate,
            read:false,
            status:"rejected"
        };
        const notificationsCollection = collection(db, 'notifications');
        await addDoc(notificationsCollection, notificationData);  // Adds the document
    
    }
    catch(error){
        console.log(error.message)
        
        
    }
}



export async function acceptContact(notificationId){
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    console.log(formattedDate)
    const exactDate = Timestamp.now();
    try{
        // console.log("aaa"+notificationId)

        //fetch the notification 
        const docRef1 = doc(db, 'notifications', notificationId);
        console.log("Fetching document from contactRequests with ID:", notificationId);
        const docSnap = await getDoc(docRef1);
        // Get the fields of the notification
        if (!docSnap.exists()) {
            console.error(`Notification document with ID ${notificationId} does not exist.`);
            return;
        }
        const notifData = docSnap.data();
        
        console.log("notifData:")
        console.log(notifData)

        

        await updateDoc(docRef1, {
            status:"accepted"
        });

        if (!notifData.
            contactRequestId) {
            console.error("applicationId is missing in the notification data:", notifData);
            return;
        }
        // first, get the application id to change its status and make it archived
        const docRef2 = doc(db, 'contactRequests',notifData.contactRequestId);
        console.log("Fetching document from contactRequests with ID:", notifData.contactRequestId);
        const docSnap2 = await getDoc(docRef2);
        const contactData=docSnap2.data();
        
        console.log("RequestData:")
        console.log(contactData)
        
        // update the fields of the application
        await updateDoc(docRef2, {
            archived: true,
            status:"Εγκρίθηκε"
        });
        
        //send a new notification to the parent about the status of their contact request


        // make the proper notification nanny to parent
        const notificationData = {
            senderId: notifData.receiverId,
            receiverId:  notifData.senderId,
            type: 'contactRequest',
            createdAt: formattedDate,
            contactRequestId:notifData.contactRequestId,
            exactDate:exactDate,
            read:false,
            status:"accepted"
        };
        const notificationsCollection = collection(db, 'notifications');
        await addDoc(notificationsCollection, notificationData);  // Adds the document
    
    }
    catch(error){
        console.log(error.message)
        
        
    }
}


export async function fetchContacts(nannyId) {
    const result = [];
    try {
        // Create the query
        const q = query(
            collection(db, 'contactRequests'),
            where('receiverId', '==', nannyId),
            where('status', '==', 'Εγκρίθηκε')
        );

        // Get documents matching the query
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            for (const dc of querySnapshot.docs) { 
                const docData = dc.data();
                // console.log(docData.senderId)

                // Fetch parent data like name and surname
                const docRef1 = doc(db, 'users', docData.senderId);
                const docSnap = await getDoc(docRef1);
                const userData=docSnap.data();
                // console.log(userData)

                if (docSnap.exists()) {
                    result.push({
                        id: dc.id,
                        ...docData,
                        parentName:userData.name,
                        parentSurname:userData.surname
                    });
                } else {
                    console.error('Parent data not found for senderId:', docData.senderId);
                }
            }
        } else {
            console.error('No contacts found for nannyId:', nannyId);
        }
    } catch (error) {
        console.error('Error fetching contacts:', error.message);
    } finally {
        console.log('Result:', result);
        return result;
    }
}
