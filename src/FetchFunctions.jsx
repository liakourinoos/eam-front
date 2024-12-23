const apiUrl = import.meta.env.VITE_API_URL; // Should be 'http://127.0.0.1:8000/api' or similar


export const Login = async (email, password) => {
    console.log("url:" + apiUrl)
    // try {
    //     const response = await fetch(`${apiUrl}/login/`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ email, password }),
    //     });
    //     const res = await response.json();
    //     console.log(res);
    //     return res;
    // } catch (error) {
    //     console.error('Error during login:', error);
    //     throw error;
    // }
}