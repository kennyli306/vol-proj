"use client"
import { getCookie } from '@app/utils';
import React, { useRef } from 'react';
import Link from 'next/link';

interface SearchBarProps {
    refreshPage: () => void;
}

export default function SearchBar({ refreshPage }: SearchBarProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const addPostModalRef = useRef<HTMLDialogElement>(null);
    const filterModalRef = useRef<HTMLDialogElement>(null);

    function openModal(modal: HTMLDialogElement | null) {
        if (modal) {
            modal.showModal();
        }
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = getCookie("username");
        if (!username) {
            console.error("User is not logged in");
            return;
        }
        formData.append("username", username);

        fetch('/api/posts', {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                if (addPostModalRef.current) {
                    addPostModalRef.current.close();
                }
                if (formRef.current) {
                    formRef.current.reset(); // Reset the form
                }
                refreshPage();
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className="max-w-[1080px]">
            <label className="input m-4">
                <svg className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <g strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" placeholder="Search" />
            </label>
            <button className="btn" onClick={() => openModal(filterModalRef.current)}>Filters</button>
            <Link href="/search/posts" className="btn btn-primary float-right">Add Postings</Link>

            {/* Modal for filters*/}
            <dialog ref={filterModalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}
