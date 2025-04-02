"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from '@app/utils';
import NavBar from '@app/components/NavBar';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [returnTo, setReturnTo] = useState("/");

    const handleSignup = async () => {
        setErrorMessage("");
        try {
            // Input validation (you might want more complex validation in a real app)
            if (!username || !password) {
                setErrorMessage("Username and password are required");
                return;
            }
            // Make an API call to sign up the user
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to sign up");
                return;
            }

            // Assume the response contains user data or a token
            const data = await response.json();

            // Set a cookie and/or handle session management
            setCookie("username", data.username);
            // If there's a token, you might want to set it in a cookie or local storage
            // setCookie("token", data.token); 

            // Redirect to the desired page after successful sign-up
            const searchParams = new URLSearchParams(window.location.search);
            const returnTo = searchParams.get("returnTo") || "/";
            router.replace(returnTo);
        } catch (error) {
            console.error("Error signing up:", error);
            setErrorMessage("An unexpected error occurred");
        }
    };

    useEffect(() => {
                const searchParams = new URLSearchParams(window.location.search);
                setReturnTo(searchParams.get("returnTo") || "/")
                if (returnTo == "signup"){
                    setReturnTo("/")
                }
    }, [router]);
    
    return (
        <div className="flex flex-col min-h-screen max-w-[1080px] mx-auto m-16">
            <NavBar />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                    <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>
                    {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button 
                        onClick={handleSignup} 
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Sign up
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-gray-600">Already have an account? 
                            <a 
                                href={`/login?returnTo=${returnTo}`} 
                                className="text-blue-500 font-semibold hover:underline"
                            > Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}