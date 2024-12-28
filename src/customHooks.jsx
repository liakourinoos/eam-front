import { useState, useEffect, useContext, createContext } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this is the correct path to your Firebase config

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null); // For storing user data
    const [loading, setLoading] = useState(true); // For loading state
    const auth = getAuth();

    // When the app loads, check if the user is already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Query to find the user document based on UID field
                    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
                    const querySnapshot = await getDocs(q); // Get documents matching the query
                    if (!querySnapshot.empty) {
                        const docSnap = querySnapshot.docs[0]; // Get the first matched document
                        setUserData({ ...docSnap.data(), uid: user.uid,id:docSnap.id }); // Set user data from Firestore
                    } else {
                        console.error('No document found for UID:', user.uid);
                    }
                }catch(error){
                    console.error('Error fetching user data: ', error);
                }
            }else{
                setUserData(null); // No user logged in
            }
            setLoading(false); // Set loading to false once the user is checked
        });
        return unsubscribe; // Cleanup the listener on component unmount
    }, [auth]);


    // Login function
    const login = async (email, password) => {
        console.log(email,password)
        setLoading(true); 
        try {
            // Firebase sign-in
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            const user = userCredential.user; // Extract the user object
            
            // Query Firestore for user data
            const q = query(collection(db, 'users'), where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                const userData = { ...docSnap.data() , id: docSnap.id}; // Enrich user data
                
                return userData; // Return the enriched user data
            } else {
                console.error("No user document found for uid:", user.uid);
                throw new Error("User data not found in Firestore.");
            }

        } catch (error) {
            console.error("Error in login function:", error.message);
            throw error; // Re-throw to handle it in `handleLogin`
        } finally {
            setLoading(false); // Reset loading state
        }
    };


    // Logout function
    const logout = async () => {
        setLoading(true); // Set loading to true while logging out
        try {
            await signOut(auth);
            setUserData(null); // Clear user data on logout
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setLoading(false); // Set loading to false after logout
        }
    };
    
    // Function to fetch the user data from Firestore, for the authentication ONLY
    const fetchUserDataByUID = async (uid) => {
        try {
            const q = query(collection(db, 'users'), where('uid', '==', uid));
            const querySnapshot = await getDocs(q); // Get documents matching the query

            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0]; // Get the first matched document
                // setUserData({ ...docSnap.data(), uid: user.uid }); // Set user data from Firestore
                return {  ...docSnap.data(),id: docSnap.id, };
            } else {
                console.error('No document found for UID:', uid);
            }
        } catch (error) {
            console.error('Error fetching user data: ', error);
        }
    };

    const refetch = async () => {
        if (auth.currentUser) {
            console.log(auth.currentUser.uid)
            const userData = await fetchUserDataByUID(auth.currentUser.uid);
            setUserData(userData); // Re-fetch the current user data
        }
    };

    const value = {
        userData,
        setUserData,
        loading,
        login,
        logout,
        refetch
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Always render children, manage loading state independently */}
            {children}
        </AuthContext.Provider>
    );
    
};
