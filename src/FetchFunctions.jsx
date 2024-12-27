import { collection,getFirestore, addDoc ,getDocs,query, where,doc, updateDoc,getDoc} from "firebase/firestore";
import { db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth } from "../firebase";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updateEmail,updatePassword,sendEmailVerification } from "firebase/auth";

    export  async function updateUserEmailWithBetterErrorHandling(currentPassword, newEmail) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            console.error("No user is signed in.");
            return { success: false, message: "No user is signed in." };
        }
    
        try {
          // Re-authenticate the user
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

          // Try to update the email
            await updateEmail(user, newEmail);
            console.log("Email updated successfully.");
            return { success: true, message: "Email updated successfully." };

        } catch (error) {
          // Handle specific errors
            if (error.code === 'auth/requires-recent-login') {
                console.error("Re-authentication required.");
                return { success: false, message: "Please reauthenticate and try again." };
            } else if (error.code === 'auth/operation-not-allowed') {
                console.error("Operation not allowed. Check your Firebase settings.");
                return { success: false, message: "Operation not allowed. Please check your Firebase project settings." };
            } else {
                console.error("Error updating email:", error.message);
                return { success: false, message: error.message };
            }
        }
}

export async function updateUserPassword(currentPassword, newPassword) {
        const auth = getAuth();
        const user = auth.currentUser;
    
        // if (!user) {
        // console.error("No user is signed in.");
        // return { success: false, message: "No user is signed in." };
        // }
    
        try {
        // Re-authenticate the user with their current password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
    
        // Update the user's password
        await updatePassword(user, newPassword);
        console.log("Password updated successfully.");
        return { success: true, message: "Password updated successfully." };
        } catch (error) {
        console.error("Error updating password:", error.message);
        return { success: false, message: error.message };
        }
}



export async function fetchUser(id) {
    try {
        // Get the document reference based on the user id
        const docRef = doc(db, "users", id);
        
        // Fetch the document snapshot
        const docSnap = await getDoc(docRef);

        // Check if the document exists
        if (docSnap.exists()) {
            // Return the user data as an object
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Propagate the error so the calling component can handle it
    }
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