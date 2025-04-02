"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from '@app/utils';
import NavBar from '@app/components/NavBar';
import { isUserLoggedIn } from '@app/utils';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [returnTo, setReturnTo] = useState("/");
    
    const handleLogin = async () => {
        setErrorMessage("");
        // Validate input
        if (!username || !password) {
            setErrorMessage("Both username and password are required.");
            return;
        }

        try {
            // Execute the login request
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Login failed.");
                return;
            }

            // Handle successful login
            const data = await response.json();
            setCookie("username", data.username);
            setCookie("token", data.token); // Assuming the server returns a token

            // Redirect to the returnTo page or home
            router.replace(returnTo);

        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An unexpected error occurred.");
        }
    };

    
    useEffect(() => {
            if (isUserLoggedIn()) {
                router.replace("/"); // redirect to the home page
            }
            const searchParams = new URLSearchParams(window.location.search);
            setReturnTo(searchParams.get("returnTo") || "/")
            if (returnTo == "login"){
                setReturnTo("/")
            }
    }, [router]);
    
    return (
        <div className="flex flex-col min-h-screen max-w-[1080px] mx-auto m-16">
            <NavBar />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                    <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
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
                        onClick={handleLogin} 
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Log in
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-gray-600">Not have an account? 
                            <a 
                                href={`/signup?returnTo=${encodeURIComponent(returnTo)}`} 
                                className="text-blue-500 font-semibold hover:underline"
                            > Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}