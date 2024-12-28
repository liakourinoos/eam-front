import { collection, addDoc,deleteDoc ,getDocs,query, where,doc, updateDoc,getDoc} from "firebase/firestore";
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
    console.log("called..")
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

        // Step 2: Add user details to Firestore, including the UID from Auth
        const newData = {
            uid: user.uid, // Authenticated user's UID
            email: userData.email, // Authenticated user's email
            ...userData, // Other data passed to the function
            
        };

        await addDoc(collection(db, "users"), newData);

        console.log("User registered and added to Firestore:", newData);

        // return newData; // Return the user data for further use
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
                where('type', '==' , 'final')
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

export async function fetchFinalApplication(id){
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

export async function fetchDraftApplication(id){
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
    try {
        //first, check if there are any applications with that id that have type "draft" to remove them
        if(data.id){
            //remove the document with that id and replace it with the actual data below
            const docRef = doc(db, 'applications', data.id);

            // Delete the document
            await deleteDoc(docRef);

        }

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
            type:'final'
        };

        const applicationsCollection = collection(db, 'applications');
        await addDoc(applicationsCollection, applicationData);  // Adds the document
    
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