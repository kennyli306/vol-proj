"use client";
import { useEffect, useState } from "react";
import { getCookie } from "@app/utils";
import { useRouter } from "next/navigation";
import NavBar from "@app/components/NavBar";

export default function ProfilePage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const storedUsername = getCookie("username");
        if (!storedUsername) {
            router.push("/login");
        } else {
            setUsername(storedUsername);
            fetchPosts(storedUsername);
        }
    }, []);

    const fetchPosts = async (username: string) => {
        try {
            const res = await fetch(`/api/posts?username=${username}`);
            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts || []);
            } else {
                console.error("Failed to load posts");
            }
        } catch (err) {
            console.error("Error loading posts:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="m-16">Loading...</p>;

    return (
        <div className="flex flex-col min-h-screen max-w-[720px] mx-auto m-16">
            <NavBar />
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <div className="border p-6 rounded shadow space-y-4">
                <div>
                    <p className="text-gray-600">Username</p>
                    <p className="text-xl font-medium">{username}</p>
                </div>

                {/* Beijie: Maybe add posts to the profile */}
                {/* <div>
                    <p className="text-gray-600">Your Posts</p>
                    {posts.length === 0 ? (
                        <p className="text-gray-500">No posts yet.</p>
                    ) : (
                        <ul className="list-disc list-inside space-y-2">
                            {posts.map((post: any, index) => (
                                <li key={index}>
                                    <p className="font-semibold">{post.title}</p>
                                    <p className="text-sm text-gray-600">{post.location} @ {post.organization}</p>
                                    <p className="text-sm text-gray-700">{post.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div> */}
            </div>
        </div>
    );
}
