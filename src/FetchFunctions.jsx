import { collection,getFirestore, addDoc ,getDocs,query, where,doc, updateDoc} from "firebase/firestore";
import { db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth } from "../firebase";
import { getAuth } from "firebase/auth";

export async function fetchUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return users; // Return the structured array of user data
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Throw the error so it can be caught by the calling component
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