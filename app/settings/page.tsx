"use client";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@app/utils";
import { useRouter } from "next/navigation";
import NavBar from "@app/components/NavBar";

export default function SettingsPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const storedUsername = getCookie("username");
        if (!storedUsername) {
            router.push("/login");
        } else {
            setUsername(storedUsername);
            setNewUsername(storedUsername);
        }
    }, []);

    const handleSave = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (newUsername === "") {
            setErrorMessage("Username cannot be empty");
            return;
        }

        if (newUsername === username && newPassword === "") {
            setErrorMessage("Nothing changed");
            return;
        }

        try {
            const response = await fetch("/api/settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oldUsername: username,
                    newUsername,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                setErrorMessage(data.message || "Update failed");
                return;
            }

            setCookie("username", newUsername);
            setUsername(newUsername);
            setNewPassword("");
            setSuccessMessage("Settings updated successfully");
        } catch (error) {
            console.error("Update error:", error);
            setErrorMessage("Internal error");
        }
    };

    return (
        <div className="flex flex-col min-h-screen max-w-[720px] mx-auto m-16">
            <NavBar />
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <div className="border p-6 rounded shadow space-y-6">
                <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="border p-2 rounded w-full mt-1"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="border p-2 rounded w-full mt-1"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border p-2 rounded w-full mt-1"
                    />
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-600">{successMessage}</p>}

                <button className="btn btn-primary" onClick={handleSave}>
                    Save Changes
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        router.push("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
