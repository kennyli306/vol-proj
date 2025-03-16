"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from '@app/utils';
import NavBar from '@app/components/NavBar';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

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

    return (
        <div className="flex flex-col min-h-screen max-w-[1080px] mx-auto m-16">
            <NavBar />
            <h1>SignUp</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button onClick={handleSignup}><b>Sign up</b></button>
            <p>
            Already have an account? <a href="/login"><b>Login</b></a>
            </p>
        </div>
    );
}