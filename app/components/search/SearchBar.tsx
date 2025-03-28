import React, { useRef } from 'react';
import Link from 'next/link';

interface SearchBarProps {
    setDistance: (distance: number | null) => void;
    setRefresh: (refresh: boolean) => void;
    refresh: boolean;
}

export default function SearchBar({ setDistance, setRefresh, refresh }: SearchBarProps) {
    const filterModalRef = useRef<HTMLDialogElement>(null);
    const distanceInputRef = useRef<HTMLInputElement>(null);

    function openModal(modal: HTMLDialogElement | null) {
        if (modal) {
            modal.showModal();
        }
    };

    function handleDistanceChange() {
        const distanceValue = distanceInputRef.current?.value;
        if (distanceValue) {
            setDistance(Number(distanceValue));
        } else {
            setDistance(null);
        }
    }

    function handleSearch() {
        setRefresh(!refresh);
    }

    return (
        <div className="max-w-[1080px]">
            <label className="input m-2">
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
            <button className="btn m-2" onClick={() => openModal(filterModalRef.current)}>Filters</button>
            <button className="btn btn-primary m-2" onClick={() => handleSearch()}>Search</button>
            <Link href="/search/posts" className="btn btn-secondary float-right">Add Postings</Link>

            {/* Modal for filters*/}
            <dialog ref={filterModalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend pt-4">Distance</legend>
                        <input
                            ref={distanceInputRef}
                            type="number"
                            className="input validator"
                            placeholder="Distance in miles"
                            min="1"
                            title="Must be positive"
                            onChange={handleDistanceChange}
                        />
                        <p className="validator-hint">Must be positive</p>
                    </fieldset>


                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}
