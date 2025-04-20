"use client"
import React, { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react';
interface PostProps {
    listId: number;
    postId: number;
    onDelete: (postId: number) => void;
}

export default function Post({ listId, postId, onDelete }: PostProps) {
    const { data: session, status } = useSession();
    const [email, setEmail] = React.useState<string>("");
    const [title, setTitle] = React.useState<string>("");
    const [organization, setOrganization] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");
    const [postLoaded, setPostLoaded] = React.useState<boolean>(false);
    const [ownerEmail, setOwnerEmail] = React.useState<string>("")

    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (status !== "loading") {
            setEmail(session?.user?.email || "");
        }
    }, [status]);

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
                setOwnerEmail(data.owner_email);
                setPostLoaded(true);
            })
            .catch((error) => console.log(error));
        return () => {
            staleRequest = true;
        };
    }, [postId]);

    if (!postLoaded) {
        return (
            <li className="container mx-auto px-4">
                <div className="list-row skeleton h-32 w-full my-4"></div>
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

    const showModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    return (
        <li className="list-row">
            <div className="text-6xl font-thin opacity-30 tabular-nums">{listId}</div>
            <div >
                <div className="text-3xl line-clamp-1">{title}</div>
                <div className="text-m uppercase font-semibold opacity-80 line-clamp-1">{organization}</div>
                <div className="text-l uppercase font-semibold opacity-60 line-clamp-1">{address}</div>
                <p className="list-col-wrap text-xl line-clamp-2">{description}</p>
            </div>
            {
                (ownerEmail == email) && (
                    <button onClick={handleDelete} className="btn btn-warning">
                        Delete
                    </button>
                )

            }
            <button className="btn btn-accent" onClick={() => showModal()}>Contact</button>
            <dialog ref={modalRef} id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl">Email</h3>
                    <p className="text-lg">{ownerEmail}</p>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </li >
    )
}
