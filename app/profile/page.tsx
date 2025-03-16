"use client";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@app/utils";
import { useRouter } from "next/navigation";
import NavBar from "@app/components/NavBar";

export default function ProfilePage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const storedUsername = getCookie("username");
        if (!storedUsername) {
            router.push("/login");
        } else {
            setUsername(storedUsername);
            setNewUsername(storedUsername);
        }
        setLoading(false);
    }, []);

    const handleUpdateUsername = async () => {
        if (!newUsername) {
            setErrorMessage("Username cannot be empty!");
            return;
        }

        try {
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ oldUsername: username, newUsername }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to update username");
                return;
            }

            setCookie("username", newUsername);
            setUsername(newUsername);
            setErrorMessage("");
            alert("Username updated successfully!");
        } catch (error) {
            console.error("Error updating username:", error);
            setErrorMessage("An unexpected error occurred");
        }
    };

    return (
        <div className="flex flex-col min-h-screen max-w-[1080px] mx-auto m-16">
            <NavBar />
            <h1>Profile Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p><b>Current Username:</b> {username}</p>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <button className="btn btn-primary" onClick={handleUpdateUsername}>
                        Update Username
                    </button>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button className="btn btn-primary" onClick={() => {
                        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        router.push("/login");
                    }}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
