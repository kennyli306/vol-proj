import React, { useRef } from 'react';
import Link from 'next/link';

interface SearchBarProps {
    setForm: React.Dispatch<React.SetStateAction<{ searchTerm: string; distance: number | null }>>;
    setRefresh: (refresh: boolean) => void;
    refresh: boolean;
}

export default function SearchBar({ setForm, setRefresh, refresh }: SearchBarProps) {
    const filterModalRef = useRef<HTMLDialogElement>(null);
    const searchTermRef = useRef<HTMLInputElement>(null);
    const distanceInputRef = useRef<HTMLInputElement>(null);

    function openModal(modal: HTMLDialogElement | null) {
        if (modal) {
            modal.showModal();
        }
    };

    function handleSearchTermChange() {
        const searchTermValue = searchTermRef.current?.value;
        setForm((prevForm) => ({
            ...prevForm,
            searchTerm: searchTermValue || '',
        }));
    }
    function handleDistanceChange() {
        const distanceValue = distanceInputRef.current?.value;
        setForm((prevForm) => ({
            ...prevForm,
            distance: distanceValue ? Number(distanceValue) : null,
        }));
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
                <input ref={searchTermRef} type="search" className="grow" placeholder="Search"
                onChange={handleSearchTermChange} />
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
                            min="0"
                            title="Can't be negative"
                            onChange={handleDistanceChange}
                        />
                        <p className="validator-hint">Can't be negative</p>
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
