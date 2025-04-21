"use client"
import React, { useEffect } from 'react'
import Post from '@app/components/search/Post';

interface ListingsProps {
    distance: number | null;
    refresh: boolean;
}

export default function Listings({ distance, refresh }: ListingsProps) {
    const [posts, setPosts] = React.useState<number[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [startIndex, setStartIndex] = React.useState<number>(0);
    const [totalPosts, setTotalPosts] = React.useState<number>(0);
    const [postsLoaded, setPostsLoaded] = React.useState<boolean>(false);

    const fetchPosts = async () => {
        let staleRequest = false;
        const url = `/api/posts?distance=${distance || 0}&page=${page}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            if (!staleRequest) {
                const postIds = data.paginatedPosts.map((post: { id: number }) => post.id);
                setPosts(postIds);
                setPage(data.page);
                setTotalPages(data.totalPages);
                setStartIndex(data.startIndex);
                setTotalPosts(data.totalPosts);
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
    }, [refresh, page]);

    const handlePostDelete = (deletedPostId: number) => {
        setPosts(currentPosts => currentPosts.filter(id => id !== deletedPostId));
    };

    return (
        <div>
            <ul className="list rounded-box shadow-md min-h-screen mb-4">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">{totalPosts} found</li>
                {
                    postsLoaded ? posts.map((postId, index) => (
                        <Post key={index} listId={index + 1 + startIndex} postId={postId} onDelete={handlePostDelete} />
                    )) : <li className="list-row flex justify-center items-center">
                        <span className="loading loading-spinner loading-xl"></span>
                    </li>
                }
            </ul>
            <div className="join float-right">
                {Array.from({ length: totalPages }, (_, index) => (
                    <input
                        key={index}
                        className="join-item btn btn-square"
                        type="radio"
                        name="options"
                        aria-label={`${index + 1}`}
                        checked={page === index + 1}
                        onChange={() => setPage(index + 1)}
                    />
                ))}
            </div>
        </div>
    )
}
