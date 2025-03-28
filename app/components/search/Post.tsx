"use client"
import React, { useEffect } from 'react'
import { getCookie } from '@app/utils';
interface PostProps {
    listId: number;
    postId: number;
    onDelete: (postId: number) => void;
}

export default function Post({ listId, postId, onDelete }: PostProps) {
    const [title, setTitle] = React.useState<string>("");
    const [organization, setOrganization] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");
    const [postLoaded, setPostLoaded] = React.useState<boolean>(false);

    useEffect(() => {
        let staleRequest = false;
        const url = `/api/posts/${postId}`;
        fetch(url)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                if (staleRequest) {
                    return
                }
                setTitle(data.title);
                setOrganization(data.organization);
                setDescription(data.description);
                setAddress(data.address);
                setPostLoaded(true);
            })
            .catch((error) => console.log(error));

        return () => {
            staleRequest = true;
        };
    }, [postId]);

    if (!postLoaded) {
        return (
            <li className="list-row flex justify-center items-center">
                <span className="loading loading-spinner loading-xl"></span>
            </li>
        )
    }
    const handleDelete = () => {
        fetch(`/api/posts/${postId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                onDelete(postId);
            })
            .catch((error) => console.log("Error deleting post:", error));
    };

    const currentUsername = getCookie("username");

    return (
        <li className="list-row">
            <div className="text-6xl font-thin opacity-30 tabular-nums">{listId}</div>
            <div >
                <div className="text-3xl line-clamp-1">{title}</div>
                <div className="text-m uppercase font-semibold opacity-80 line-clamp-1">{organization}</div>
                <div className="text-l uppercase font-semibold opacity-60 line-clamp-1">{address}</div>
            </div>
            <p className="list-col-wrap text-xl line-clamp-2">{description}</p>
            <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <g strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </g>
                </svg>
            </button>

            <button onClick={handleDelete} className="btn btn-warning">
                Delete
            </button>
        </li>
    )
}
