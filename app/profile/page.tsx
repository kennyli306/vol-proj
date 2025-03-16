"use client";
import { useEffect, useState } from "react";
import { getCookie } from "@app/utils";
import { useRouter } from "next/navigation";
import NavBar from "@app/components/NavBar";

export default function ProfilePage() {
    const router = useRouter();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUsername = getCookie("username");
        if (!storedUsername) {
            router.push("/login");
        } else {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen max-w-[1080px] mx-auto m-16">
            <NavBar />
            <h1>Profile Page</h1>
            {username ? (
                <div>
                    <p><b>Username:</b> {username}</p>
                    <button onClick={() => {
                        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  // Remove cookie using outdated expire date
                        router.push("/login");
                    }}>
                        <b>Logout</b>
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
