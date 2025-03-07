"use client";
import React from 'react'

export default function SearchBar() {
    function openModal(modal_name: string) {
        const modal = document.getElementById(modal_name) as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

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
            <button className="btn" onClick={() => openModal('filter_modal')}>Filters</button>
            <button className="btn btn-primary float-right" onClick={() => openModal('add_post_modal')}>Add Postings</button>

            {/* Modal for filters*/}
            <dialog id="filter_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Modal for adding posts*/}
            <dialog id="add_post_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Posts</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}
