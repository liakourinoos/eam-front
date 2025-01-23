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

export async function updateAge(id,newAge) {
    console.log(id,newAge)
    try {
        // Directly reference the document using the document ID
        const docRef = doc(db, "users", id); // `id` is the document ID

        // Update the 'bio' field in the document
        await updateDoc(docRef, {
            age: Number(newAge),
        });

        console.log(`Document with ID ${id} updated successfully.`);
    } catch (error) {
        console.error("Error updating document:", error);
    }
}

export async function updateExperience(id,newExperience) {
    console.log(id,newExperience)
    try {
        // Directly reference the document using the document ID
        const docRef = doc(db, "users", id); // `id` is the document ID

        // Update the 'bio' field in the document
        await updateDoc(docRef, {
            experience: Number(newExperience),
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
            type: 'draft',
            correctAMKA: data.correctAMKA
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



export async function fetchArchivedOffers(userId){
    const offers = [];
    try {
        // Query to find the user document based on UID field
        const q = query(collection(db, 'offers'),
            where('userId', '==', userId),
            where('archived', '==', true),
            where('type','==', 'final')
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
            status:data.status,
            applicationId:data.applicationId,
            
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

export async function fetchPaymentNotification(id){
    
    try {
        // fetch the whole document and gets its data
        const docRef = doc(db, 'notifications', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            console.error(`Notification with id ${id} not found.`);
            throw new Error(`Notification with id ${id} not found.`);
        }
        const notifData = docSnap.data();
        // fetch name, surname, id and image from users collection based on the senderId of the notifData object
        const senderDocRef = doc(db, 'users', notifData.senderId);
        const senderDocSnap = await getDoc(senderDocRef);
        let senderName = "", senderSurname = "", img = "",gender=""
        if (!senderDocSnap.exists()) {
            throw new Error(`User with id ${notifData.senderId} not found.`);
        }
        const senderData = senderDocSnap.data();
        senderName = senderData.name || "";
        senderSurname = senderData.surname || "";
        img = senderData.img || "";
        gender= senderData.gender || "";
        return {
            senderId:notifData.senderId,
            senderName,
            senderSurname,
            img,
            createdAt: notifData.createdAt,
            status:notifData.status,
            type:notifData.type,
            gender
        };

    }
    catch(error){
        console.log(error.message)
        return;
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


export async function fetchNotifications(userId){
    const now=Timestamp.now();
    const result=[]
    try {
        const q = query(collection(db, 'notifications'),
            where('receiverId', '==', userId),
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if ( data.exactDate <= now) 
                    result.push({ id: doc.id, ...data });
                
            });
            
        } else {
            console.error('No nannies found..');
        }
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


export async function fetchNotificationCount(userId){
    let count=0;
    const now=Timestamp.now();
    try{
        const q = query(collection(db, 'notifications'),
            where('receiverId', '==', userId),
            where('read', '==', false)
            
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if ( data.exactDate <= now)
                    count++;
            });
        } 
        else {
            // console.error('No new notifs found..');
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
        // first, get the contactRequest id to change its status and make it archived
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



export async function fetchParentContacts(nannyId) {
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


export async function fetchNannyContacts(parentId) {
    const result = [];
    try {
        // Create the query
        const q = query(
            collection(db, 'contactRequests'),
            where('senderId', '==', parentId)
            // where('status', '==', 'Εγκρίθηκε')
        );

        // Get documents matching the query
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            for (const dc of querySnapshot.docs) { 
                const docData = dc.data();
                // console.log(docData.senderId)

                // Fetch nanny data like name and surname
                const docRef1 = doc(db, 'users', docData.receiverId);
                const docSnap = await getDoc(docRef1);
                const userData=docSnap.data();
                console.log(userData)

                if (docSnap.exists()) {
                    result.push({
                        id: dc.id,
                        ...docData,
                        nannyName:userData.name,
                        nannySurname:userData.surname
                    });
                } else {
                    console.error('Parent data not found for senderId:', docData.receiverId);
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

export async function fetchCompletedParentPayments(parentId){
    const result = [];
    try{
        //fetch all payments for parentId
        const q = query(
            collection(db, 'payments'),
            where('parentId', '==', parentId),
            where('status', '==', 'accepted')
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            for (const dc of querySnapshot.docs) { 
                const docData = dc.data();
                // console.log(docData.senderId)

                // Fetch nanny data like name and surname
                const docRef1 = doc(db, 'users', docData.nannyId);
                const docSnap = await getDoc(docRef1);
                const userData=docSnap.data();
                console.log(userData)

                if (docSnap.exists()) {
                    result.push({
                        id: dc.id,
                        ...docData,
                        nannyName:userData.name,
                        nannySurname:userData.surname
                    });
                } else {
                    console.error('Parent data not found for senderId:', docData.nannyId);
                }
            }
        } else {
            console.error('No contacts found for nannyId:', nannyId);
        }
    }
    catch(error){
        console.log(error.message)
    }
    finally {
        console.log('Result:', result);
        return result;
    }
}


export async function fetchCompletedNannyPayments(nannyId) {
    const result = [];
    try {
        // Fetch all payments for nannyId with status 'accepted'
        const q = query(
            collection(db, 'payments'),
            where('nannyId', '==', nannyId),
            where('status', '==', 'accepted')
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            for (const dc of querySnapshot.docs) {
                const docData = dc.data();

                // Fetch parent data like name and surname
                const docRef1 = doc(db, 'users', docData.parentId);
                const docSnap = await getDoc(docRef1);
                const userData = docSnap.data();

                if (docSnap.exists()) {
                    result.push({
                        id: dc.id,
                        ...docData,
                        parentName: userData.name,
                        parentSurname: userData.surname
                    });
                } else {
                    console.error('Parent data not found for parentId:', docData.parentId);
                }
            }
        } else {
            console.error('No completed payments found for nannyId:', nannyId);
        }
    } catch (error) {
        console.error('Error fetching completed payments:', error.message);
    } finally {
        console.log('Result:', result);
        return result;
    }
}



export async function rejectApplication(notificationId){
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    console.log(formattedDate)
    const exactDate = Timestamp.now();
    try{
        // console.log("aaa"+notificationId)

        //fetch the notification 
        const docRef1 = doc(db, 'notifications', notificationId);
        console.log("Fetching document from applications with ID:", notificationId);
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



        if (!notifData.applicationId) {
            console.error("applicationId is missing in the notification data:", notifData);
            return;
        }
        // first, get the application id to change its status and make it archived
        const docRef2 = doc(db, 'applications',notifData.applicationId);
        console.log("Fetching document from contactRequests with ID:", notifData.applicationId);
        const docSnap2 = await getDoc(docRef2);
        const jobData=docSnap2.data();
        
        console.log("JobData:")
        console.log(jobData)
        
        // update the fields of the application
        await updateDoc(docRef2, {
            archived: true,
            status:"Απερρίφθη"
        });
        
        //send a new notification to the parent about the status of their application status


        // make the proper notification nanny to parent
        const notificationData = {
            senderId: notifData.receiverId,
            receiverId:  notifData.senderId,
            type: 'jobOffer',
            createdAt: formattedDate,
            applicationId:notifData.applicationId,
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

export async function acceptApplication(notificationId) {
    const exactDate = Timestamp.now();
    const today = new Date();
    const formattedTodayDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    // fetch all data for notification by that id
    //fetch the notification 
    const docRef1 = doc(db, 'notifications', notificationId);
    console.log("Fetching document from applications with ID:", notificationId);
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
        status: "accepted"
    });

    if (!notifData) console.log("ERASED!:")
    else console.log(notifData)
    console.log("Before check:", notifData.applicationId);
    if (!notifData.applicationId) {
        console.error("applicationId is missing in the notification data:", notifData);
        return;
    }
    // first, get the application id to change its status
    const docRef2 = doc(db, 'applications', notifData.applicationId);
    console.log("Fetching document from applications with ID:", notifData.applicationId);
    const docSnap2 = await getDoc(docRef2);
    const applicationData = docSnap2.data();

    console.log("applicationData:")
    console.log(applicationData)

    // update the fields of the application
    await updateDoc(docRef2, {
        // archived: true,
        status: "Εγκρίθηκε"
    });

    //send a new notification to the parent about the status of their application status


    // make the proper notification from nanny to parent
    let notificationData = {
        senderId: notifData.receiverId,
        receiverId: notifData.senderId,
        type: 'jobOffer',
        createdAt: formattedTodayDate,
        applicationId: notifData.applicationId,
        exactDate: exactDate,
        read: false,
        status: "accepted"
    };
    const notificationsCollection = collection(db, 'notifications');
    await addDoc(notificationsCollection, notificationData);  // Adds the document
    // Parse the startingDate string into day, month, year
    const [day, month, year] = applicationData?.startingDate.split('/').map(Number);
    const startingDate = new Date(year, month - 1, day); // Create a Date object (month is zero-based)
    const months = parseInt(applicationData?.months, 10); // Parse months string into an integer (base 10)

    // Fetch the current value of globalCouponCounter from the metadata collection
    const metadataRef = doc(db, 'metadata', 'globalCouponCounter'); // Replace 'GlobalCouponCounter' with the actual document ID
    const metadataSnap = await getDoc(metadataRef);

    if (!metadataSnap.exists()) {
        console.error("Global counter not found in metadata.");
        return;
    }

    // Get the current value of the global counter
    let globalCouponCounter = metadataSnap.data().value;

    // Get the nannyId using AMKA
    let q = query(collection(db, 'users'),
        where('AMKA', '==', applicationData.nannyAMKA));
    const querySnapshot1 = await getDocs(q); // Get documents matching the query
    let nannyId;
    if (!querySnapshot1.empty) {
        querySnapshot1.forEach((doc) => {
            nannyId = doc.id;
        });
    } else {
        console.error('No document found for AMKA:', applicationData.AMKA);
    }

    // Create a new payment object for each month
    const paymentsCollection = collection(db, 'payments');
    for (let i = 1; i <= months; i++) {
        const paymentDate = new Date(startingDate); // Clone the startingDate
        paymentDate.setMonth(paymentDate.getMonth() + i); // Increment the month by i

        // Format paymentDate as DD/MM/YYYY
        const formattedPayDate = `${String(paymentDate.getDate()).padStart(2, '0')}/${String(paymentDate.getMonth() + 1).padStart(2, '0')}/${paymentDate.getFullYear()}`;

        // Create paymentData with the current voucherCode
        const paymentData = {
            nannyId: nannyId,
            parentId: applicationData.userId,
            status: "unavailable",
            exactDate: Date.now(),
            payDate: formattedPayDate,
            voucherCode: globalCouponCounter,  // Assign the current voucherCode
        };

        // Add the payment object to the database
        await addDoc(paymentsCollection, paymentData);

        // Increment the global counter for the next payment
        globalCouponCounter++;
    }

    // Update the global counter in the metadata collection
    await updateDoc(metadataRef, {
        value: globalCouponCounter // Update with the final counter value
    });


    // // create a new document for the payments collection
    const [day1, month1, year1] = applicationData?.startingDate.split('/').map(Number); // Parse startingDate string into day, month, year
    const pDate = new Date(year1, month1 - 1, day1); // Create a Date object (month is zero-based)
    const months1 = parseInt(applicationData?.months, 10); // Parse months string into an integer (base 10)
    //end Date in utc
    pDate.setMonth(pDate.getMonth() + months1); // Add the number of months to the startingDate
    // Format pDate as DD/MM/YYYY
    const formattedPayDate = `${String(pDate.getDate()).padStart(2, '0')}/${String(pDate.getMonth() + 1).padStart(2, '0')}/${pDate.getFullYear()}`;

    // // Fetch the current value of globalCouponCounter from the metadata collection
    // const metadataRef = doc(db, 'metadata', 'globalCouponCounter'); // Replace 'GlobalCouponCounter' with the actual document ID
    // const metadataSnap = await getDoc(metadataRef);

    // if (!metadataSnap.exists()) {
    //     console.error("Global counter not found in metadata.");
    //     return;
    // }

    // // Get the current value of the global counter
    // let globalCouponCounter = metadataSnap.data().value;

    // // Use this counter value as the voucherCode
    // let voucherCode = globalCouponCounter;

    // // get the nanny id using AMKA
    // let q = query(collection(db, 'users'),
    //         where('AMKA', '==', applicationData.nannyAMKA));
    // const querySnapshot1 = await getDocs(q); // Get documents matching the query
    // let nannyId;
    // if (!querySnapshot1.empty) {
    //     querySnapshot1.forEach((doc) => {
    //     nannyId = doc.id;
    //     });
    // } else {
    //     console.error('No document found for AMKA:', applicationData.AMKA);
    // }

    // // Create paymentData with the voucherCode
    // const paymentData = {
    //     nannyId: nannyId,
    //     parentId: applicationData.userId,
    //     status: "unavailable",
    //     exactDate: Date.now(),
    //     payDate: formattedPayDate,
    //     voucherCode: voucherCode,  // Assign the current voucherCode
    // };

    // // Update the global counter in the metadata collection
    // await updateDoc(metadataRef, {
    //     value: globalCouponCounter + 1  // Increment the counter by 1
    // });


    // //add document
    // const paymentsCollection = collection(db, 'payments');
    // await addDoc(paymentsCollection, paymentData);  // Adds the document

    const [startDay, startMonth, startYear] = applicationData?.startingDate.split('/').map(Number); // Parse startingDate string into day, month, year

    const applicationStartingDate = new Date(startYear, startMonth - 1, startDay); // Create a Date object (month is zero-based)

    const applicationEndDate = new Date(startYear, startMonth - 1, startDay); // Create a Date object (month is zero-based)
    applicationEndDate.setMonth(applicationEndDate.getMonth() + months); // Add the number of months to the startingDate

    //archive all nanny's final offers that overlap with the agreed range

    //first, get all unarchived final offers by this nanny
    q = query(collection(db, 'offers'),
        where('userId', '==', nannyId),
        where('type', '==', 'final'),
        where('archived', '==', false)
    );
    const querySnapshot = await getDocs(q); // Get documents matching the query
    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc1) => {
            const offerData = doc1.data();
            const [day, month, year] = offerData?.startingDate.split('/').map(Number); // Parse startingDate string into day, month, year
            const offerEndDate = new Date(year, month - 1, day); // Create a Date object (month is zero-based)
            const months = parseInt(offerData?.months, 10); // Parse months string into an integer (base 10)
            // create the offerEndDate in UTC
            offerEndDate.setMonth(offerEndDate.getMonth() + months); // Add the number of months to the startingDate
            const offerStartDate = new Date(year, month - 1, day); // Create a Date object (month is zero-based)
            //check if the offer overlaps with the accepted job
            if ((applicationStartingDate <= offerStartDate && offerStartDate <= applicationEndDate) || (applicationStartingDate <= offerEndDate && offerEndDate <= applicationEndDate)) {
                //archive the offer
                const docRef = doc(db, 'offers', doc1.id);
                await updateDoc(docRef, { archived: true });
            }
        });
    } else {
        console.error('No active job found for userId:', nannyId);
    }

    //create two notifications for when the job is done to send to parent and nanny

    // from nanny to parent
    notificationData = {
        senderId: notifData.receiverId,
        receiverId: notifData.senderId,
        type: 'endOfJob',
        createdAt: formattedPayDate, //date should be the same as the day the payment becomes available
        applicationId: notifData.applicationId,
        exactDate: applicationEndDate,
        read: false,
        status: "pending"
    };
    // const notificationsCollection = collection(db, 'notifications');
    await addDoc(notificationsCollection, notificationData);  // Adds the document

    // from parent to nanny
    notificationData = {
        senderId: notifData.senderId,
        receiverId: notifData.receiverId,
        type: 'endOfJob',
        createdAt: formattedPayDate, //date should be the same as the day the payment becomes available
        applicationId: notifData.applicationId,
        exactDate: applicationEndDate,
        read: false,
        // status:"pending" //not needed for nanny, nothing to confirm
    };
    // const notificationsCollection = collection(db, 'notifications');
    await addDoc(notificationsCollection, notificationData);  // Adds the document






}



export async function fetchContactedNannies(parentId) {
    // console.log("called..")
    const result = []
    try {
        const q = query(collection(db, 'users'),
            where('role', '==', false)
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {
            for (const nannyDoc of querySnapshot.docs) {
                const nannyData = { id: nannyDoc.id, ...nannyDoc.data() };

                // Check if a contactRequest document exists with receiverId as nanny's id and senderId as parentId
                const contactQuery = query(collection(db, 'contactRequests'),
                    where('receiverId', '==', nannyData.id),
                    where('senderId', '==', parentId),
                    where('status', '==', 'Εγκρίθηκε')
                );
                const contactSnapshot = await getDocs(contactQuery);

                if (!contactSnapshot.empty) {
                    result.push(nannyData);
                }
            }
        } else {
            console.error('No nannies found..');
        }
    } catch (error) {
        console.error('Error fetching nannies');
    }

    // console.log("before exit...")
    return result;


}


export async function fetchParentPayments(userId){
    const result = [];
    try {
        const q = query(collection(db, 'payments'),
            where('parentId', '==', userId),
            where('status', 'in', ["unavailable","available","pending"])
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {
            for (const ndoc of querySnapshot.docs) {
                const paymentData = ndoc.data();
                const nannyDocRef = doc(db, 'users', paymentData.nannyId);
                const nannyDocSnap = await getDoc(nannyDocRef);
                let nannyName = "", nannySurname = "";
                if (nannyDocSnap.exists()) {
                    const nannyData = nannyDocSnap.data();
                    nannyName = nannyData.name || "";
                    nannySurname = nannyData.surname || "";
                } else {
                    console.error(`Nanny with id ${paymentData.nannyId} not found.`);
                }
                result.push({ id: ndoc.id, ...paymentData, nannyName, nannySurname });
            }
        } else {
            console.error('No payments found for parentId:', userId);
        }
    } catch (error) {
        console.error('Error fetching payments:', error);
    }

    console.log("payments:")
    console.log(result)
    return result;
}


// export async function fetchArchivedParentPayments(userId){
//     const result = [];
//     try {
//         const q = query(collection(db, 'payments'),
//             where('parentId', '==', userId),
//             where('status', '==', "accepted")
//         );
//         const querySnapshot = await getDocs(q); // Get documents matching the query
//         if (!querySnapshot.empty) {
//             for (const ndoc of querySnapshot.docs) {
//                 const paymentData = ndoc.data();
//                 const nannyDocRef = doc(db, 'users', paymentData.nannyId);
//                 const nannyDocSnap = await getDoc(nannyDocRef);
//                 let nannyName = "", nannySurname = "";
//                 if (nannyDocSnap.exists()) {
//                     const nannyData = nannyDocSnap.data();
//                     nannyName = nannyData.name || "";
//                     nannySurname = nannyData.surname || "";
//                 } else {
//                     console.error(`Nanny with id ${paymentData.nannyId} not found.`);
//                 }
//                 result.push({ id: ndoc.id, ...paymentData, nannyName, nannySurname });
//             }
//         } else {
//             console.error('No payments found for parentId:', userId);
//         }
//     } catch (error) {
//         console.error('Error fetching payments:', error);
//     }

//     console.log("payments:")
//     console.log(result)
//     return result;
// }


export async function updatePayment(paymentId){
    try {
        //fetch the payment
        const paymentRef = doc(db, 'payments', paymentId);
        const paymentSnap = await getDoc(paymentRef);
        if (!paymentSnap.exists()) {
            console.error(`No payment found with ID ${paymentId}`);
            return ; 
        } 
        const paymentData = paymentSnap.data();
        console.log(`Payment data for ID ${paymentId}:`, paymentData);

        //get todays date to add a field about when the voucher was sent to nanny
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

        // update the status field to "pending"
        await updateDoc(paymentRef, {
            status: "pending",
            sentAt:formattedDate
        });

    
        //create a new notification from parent to nanny for the payment
        
        const exactDate = Timestamp.now();
        const notificationData = {
            senderId: paymentData.parentId,
            receiverId: paymentData.nannyId,
            type: 'payment',
            createdAt: formattedDate,
            paymentId: paymentId,
            exactDate:exactDate,
            read:false,
            status:"pending"
        };

        const notificationsCollection = collection(db, 'notifications');
        await addDoc(notificationsCollection, notificationData);  // Adds the document

        console.log("added the notif!")


    } catch (error) {
        console.error("Error updating payment status:", error);
    }
}


export async function acceptPayment(id) {
    try {
        // fetch the notification by id
        const docRef = doc(db, 'notifications', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            console.error(`Notification with id ${id} not found.`);
            return;
        }
        const data = docSnap.data();
        // update status field to "accepted"
        await updateDoc(docRef, {
            status: "accepted"
        });

        //fetch the payment
        const paymentRef = doc(db, 'payments', data.paymentId);
        const paymentSnap = await getDoc(paymentRef);
        if (!paymentSnap.exists()) {
            console.error(`No payment found with ID ${data.paymentId}`);
            return;
        }
        const paymentData = paymentSnap.data();
        console.log(`Payment data for ID ${data.paymentId}:`, paymentData);


        // Update the status field to "accepted"
        await updateDoc(paymentRef, {
            status: "accepted"
        });


        //create a new notification from nanny to parent that the payment got accepted
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
        const exactDate = Timestamp.now();
        const notificationData = {
            receiverId: paymentData.parentId,
            senderId: paymentData.nannyId,
            type: 'payment',
            createdAt: formattedDate,
            paymentId: data.paymentId,
            exactDate:exactDate,
            read:false,
            status:"accepted"
        };

        const notificationsCollection = collection(db, 'notifications');
        await addDoc(notificationsCollection, notificationData);  // Adds the document

        console.log("added the notif!")

    }
    catch (error) {
        console.log(error.message)
    }
}


export async function archiveApplication(applicationId,status,notificationId){
    console.log(status)
    // update archived field to true
    try {
        const docRef = doc(db, 'applications', applicationId);
        await updateDoc(docRef, {
            archived: true,
        });
        // update notification status too
        const docRef2 = doc(db, 'notifications', notificationId);
        await updateDoc(docRef2, {
            status:status
        });
        // console.log("UNCOMMENT FUNCTIONALITY!")
    } catch (error) {
        console.error("Error archiving application:", error);
    }
}


export async function fetchEndJobNotification(notifId){
    try {
        // Fetch notification by id
        const docRef = doc(db, 'notifications', notifId);
        console.log("Fetching document from notifications with ID:", notifId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.error(`Document with id ${notifId} not found in notifications.`);
            throw new Error(`Document with id ${notifId} not found in notifications.`);
        }

        const data = docSnap.data();
        // console.log("Document data fetched from notifications:", data);

        // Verify senderId and applicationId
        if (!data.senderId || !data.applicationId) {
            console.error("Notification data is missing senderId or applicationId:", data);
            throw new Error("Missing senderId or applicationId in the notification data.");
        }

        const senderId = data.senderId;
        // console.log("Sender ID:", senderId);

        // Fetch sender's name and surname using document ID
        const senderDocRef = doc(db, 'users', senderId);
        const senderDocSnap = await getDoc(senderDocRef);
        let senderName = "", senderSurname = "", img = ""
        if (!senderDocSnap.exists()) {
            throw new Error("user NOT found!");
        }
        const senderData = senderDocSnap.data();
        senderName = senderData.name || "";
        senderSurname = senderData.surname || "";
        img = senderData.img


        //fetch application data using applicationId to get its status
        const appDocRef = doc(db, 'applications', data.applicationId);
        const appDocSnap = await getDoc(appDocRef);
        if (!appDocSnap.exists()) {
            throw new Error("application NOT found!");
        }
        const appData = appDocSnap.data();

        const res={
            id:docSnap.id,
            senderId,
            senderName,
            senderSurname,
            img,
            createdAt: data.createdAt,
            status:data.status,
            type:data.type,
            gender:senderData.gender,
            applicationId:data.applicationId,
            receiverId: data.receiverId,}
        
        console.log("EndOfJob notif:")
        console.log(res)
        return res
    }
    catch(error){
        console.log(error.message)
    }
}

export async function addReview(parentId, nannyId, rating, bio) {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    const exactDate = Timestamp.now();
    try {
        const reviewData = {
            parentId: parentId,
            nannyId: nannyId,
            rating: Number(rating),
            bio: bio,
            createdAt: formattedDate,
            exactDate: exactDate
        };

        const reviewsCollection = collection(db, 'parentReviews');
        await addDoc(reviewsCollection, reviewData);  // Adds the document

        // fetch nanny data with nannyId
        const docRef = doc(db, 'users', nannyId);
        const docSnap = await getDoc(docRef);
        const nannyData = docSnap.data();

        // Calculate the new average rating
        const newTotalRating = (Number(nannyData.rating) * Number(nannyData.ratingCount)) + Number(rating);
        const newRatingCount = Number(nannyData.ratingCount) + 1;
        const newAverage = (newTotalRating / newRatingCount).toFixed(2);

        //updateDoc
        await updateDoc(docRef, {
            rating: Number(newAverage),
            ratingCount: Number(newRatingCount)
        });

        return { success: true, message: 'Review added successfully' };

    } catch (error) {
        console.log(error.message);
        return { success: false, message: 'Review not added' };
    }
}


export async function fetchArchivedApplications(parentId){
    const result=[]
    try{
        // query all applications by parentId and status archived
        const q = query(collection(db, 'applications'),
                where('userId', '==', parentId),
                where('type', '==' , 'final'),
                where('archived', '==', true)
            );
            const querySnapshot = await getDocs(q); // Get documents matching the query
            if (!querySnapshot.empty) {
                
                querySnapshot.forEach((doc) => {
                    result.push({ id: doc.id, ...doc.data() });
                });
                
            } else {
                console.error('No document found for userId:', parentId);
            }

    }
    catch(error){
        console.log(error.message)
    }
    finally{
        console.log(result)
        return result
    }
}


export async function fetchNannyDeals(nannyId){
    const result=[]
    try{
        // fetch nanny data with nannyId
        const docRef = doc(db, 'users', nannyId);
        const docSnap = await getDoc(docRef);
        const nannyData= docSnap.data();

        // query all applications by nannyId and status archived
        const q = query(collection(db, 'applications'),
                where('nannyAMKA', '==', nannyData.AMKA),
                where('nannyName', '==', nannyData.name),
                where('nannySurname','==',nannyData.surname),
                where('type', '==' , 'final'),
                where('status' , 'in' , ['Εγκρίθηκε','Απερρίφθη'])
                // where('archived', '==', true)
            );
            const querySnapshot = await getDocs(q); // Get documents matching the query
            if (!querySnapshot.empty) {
                
                for (const applicationDoc of querySnapshot.docs) {
                    const applicationData = { id: applicationDoc.id, ...applicationDoc.data() };

                    // Fetch parent data using userId field of applicationDoc
                    const parentDocRef = doc(db, 'users', applicationData.userId);
                    const parentDocSnap = await getDoc(parentDocRef);
                    let parentData = {};
                    if (parentDocSnap.exists()) {
                        parentData = parentDocSnap.data();
                    } else {
                        console.error(`Parent with id ${applicationData.userId} not found.`);
                    }

                    result.push({ ...applicationData, parentData });
                }
                
            } else {
                console.error('No document found for nannyId:', nannyId);
            }

    }
    catch(error){
        console.log(error.message)
    }
    finally{
        console.log(result)
        return result
    }
}


export async function searchAvailableNannies(filter){
    const results=[]
    try{
        // fetch all available nannies, meaning all the nannies that have offers that are final and not archived
        const q = query(collection(db, 'offers'),
            where('type', '==' , 'final'),
            where('archived', '==', false)
        );
        const querySnapshot = await getDocs(q); // Get documents matching the query
        if (!querySnapshot.empty) {
            for (const dcmt of querySnapshot.docs) {
                const offerData = dcmt.data();
                // Fetch nanny data using userId field of offerData
                const nannyDocRef = doc(db, 'users', offerData.userId);
                const nannyDocSnap = await getDoc(nannyDocRef);
                let nannyData = {};
                if (!nannyDocSnap.exists()) {
                    throw new Error("nanny doesnt exist!");    
                } 
                nannyData = nannyDocSnap.data();
                let add=true;
                if (Object.keys(filter).length === 0) {
                    results.push({ ...offerData, ...nannyData });
                    continue;
                }
                //check if the offerData matches the filter
                if(filter.town && offerData.town!==filter.town){
                    add=false;
                }

                if (filter.location && filter.atMyHouse!=="") {
                    console.log("LOCATION & HOSTING")
                    const matches = offerData.rows.some(row => {
                        const locationMatch =  row.area === filter.location ;
                        const atMyHouseMatch = row.canHost === filter.atMyHouse ;
                        console.log("row.area: " + row.area + " ," + "filter.location: " + filter.location)
                        console.log("row.canHost: ")
                        console.log(row.canHost===true ?"YES":"NO") 
                        console.log("filter.atMyHouse: " )
                        console.log(filter.atMyHouse===true ?"YES":"NO")

                        return locationMatch && atMyHouseMatch;
                    });
                    if (!matches) {
                        add = false;
                    }
                }

                if(filter.timeType && offerData.timeType!==filter.timeType){
                    add=false;
                }
                if(filter.childAge && offerData.childAge!==filter.childAge){
                    add=false;
                }
                if(filter.experienceSlider>0 && filter.experienceSlider > Number(nannyData.experience) ){
                    add=false;
                }
                if(filter.gender && nannyData.gender!==filter.gender)
                    add=false

                if(filter.monthsSlider>0 &&  Number(filter.monthsSlider) > Number(offerData.months))
                    add=false
                
                

                // first, i must convert startingDate variables to UTC format.
                if(filter.selectedDate!==null){
                    const [startDay, startMonth, startYear] = offerData.startingDate.split('/').map(Number);
                    const offerStartDate = new Date(Date.UTC(startYear, startMonth - 1, startDay));

                    const filterStartDate = new Date(filter.selectedDate);

                    if (filterStartDate < offerStartDate) {
                        add = false;
                    }
                }

                if (add) {
                    // append to the results the nanny info and the offer info together
                    results.push({ ...offerData, ...nannyData });
                }
            }
            
        }
    }
    catch(error){
        console.log(error.message)
    }
    finally{
        console.log(results)
        return results
    }
}