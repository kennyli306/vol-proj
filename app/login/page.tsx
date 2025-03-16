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
            const searchParams = new URLSearchParams(window.location.search);
            const returnTo = searchParams.get("returnTo") || "/";
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
    }, [router]);
    
    return (
        <div className="flex flex-col min-h-screen max-w-[1080px] mx-auto m-16">
            <NavBar />
            <h1>Login</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button onClick={handleLogin}><b>Log in</b></button>
            <div>
                Not have an account? <a href={`/signup?returnTo=${encodeURIComponent(window.location.pathname)}`}><b>Sign up</b></a>
            </div>
        </div>
    );
}