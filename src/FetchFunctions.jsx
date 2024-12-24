import { collection, addDoc ,getDocs} from "firebase/firestore";
import { db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";



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

// Log In Existing User
export async function logInUser(email, password) {
    console.log(email,password);  //ok!
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Returns the user object
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

// export async function addUser() {
//     const user={
//         name:"nasos",
//         surname:"fykas",
//         email:"fykoulinos@gmail.com",
//         password:"2",
//         number:"0004567891",
//         AMKA:"0987654321",
//         gender:false,
//         role:false,
//         bio:"naso's bio.",
//         newUser:true
//     }
        
    
//     try {
//         const docRef = await addDoc(collection(db, "users"), user);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (error) {
//         console.error("Error adding user: ", error);
//         throw error;
//     }
// }