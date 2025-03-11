"use client"
import React, { useEffect } from 'react'
import Post from '@app/components/search/Post';

interface ListingsProps {
    refresh: boolean;
}

export default function Listings({ refresh }: ListingsProps) {
    const [posts, setPosts] = React.useState<number[]>([]);
    const [postsLoaded, setPostsLoaded] = React.useState<boolean>(false);

    const fetchPosts = async () => {
        let staleRequest = false;
        const url = `/api/posts/`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            if (!staleRequest) {
                const postIds = data.map((post: { id: number }) => post.id);
                setPosts(postIds);
                setPostsLoaded(true);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }

        return () => {
            staleRequest = true;
        };
    };

    useEffect(() => {
        fetchPosts();
    }, [refresh]);

    const handlePostDelete = (deletedPostId: number) => {
        setPosts(currentPosts => currentPosts.filter(id => id !== deletedPostId));
    };

    return (
        <div>
            <ul className="list rounded-box shadow-md min-h-screen mb-4">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Showing postings</li>
                {
                    postsLoaded ? posts.map((postId, index) => (
                        <Post key={index} listId={index + 1} postId={postId} onDelete={handlePostDelete}/>
                    )) : <li className="list-row flex justify-center items-center">
                        <span className="loading loading-spinner loading-xl"></span>
                    </li>
                }
            </ul>
            <div className="join float-right">
                <button className="join-item btn btn-active">1</button>
                <button className="join-item btn">2</button>
                <button className="join-item btn btn-disabled">...</button>
            </div>
        </div>
    )
}
