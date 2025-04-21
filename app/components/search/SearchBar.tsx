import React, { useRef } from 'react';
import Link from 'next/link';

interface SearchBarProps {
    setForm: React.Dispatch<React.SetStateAction<{
        searchTerm: string;
        distance: string;
        city: string;
        county: string;
        state: string;
    }>>;
    form: {
        searchTerm: string;
        distance: string;
        city: string;
        county: string;
        state: string;
    };
    setRefresh: (refresh: boolean) => void;
    refresh: boolean;
}

export default function SearchBar({ setForm, form, setRefresh, refresh }: SearchBarProps) {
    const filterModalRef = useRef<HTMLDialogElement>(null);

    function openModal(modal: HTMLDialogElement | null) {
        if (modal) {
            modal.showModal();
        }
    };

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
                <input
                    type="search"
                    className="grow"
                    placeholder="Search"
                    value={form.searchTerm}
                    onChange={(e) => setForm((prevForm) => ({ ...prevForm, searchTerm: e.target.value }))}
                />
            </label>
            <button className="btn m-2" onClick={() => openModal(filterModalRef.current)}>Filters</button>
            <button className="btn btn-primary m-2" onClick={() => handleSearch()}>Search</button>
            <Link href="/search/posts" className="btn btn-secondary float-right">Add Postings</Link>

            {/* Modal for filters*/}
            <dialog ref={filterModalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <fieldset className="fieldset pb-8">
                        <legend className="fieldset-legend pt-4">Distance</legend>
                        <input
                            type="number"
                            className="input validator"
                            placeholder="Distance in miles"
                            min="1"
                            title="Must be positive"
                            value={form.distance}
                            onChange={(e) => setForm((prevForm) => ({ ...prevForm, distance: e.target.value }))}
                        />
                        <p className="validator-hint">Must be positive</p>

                        <legend className="fieldset-legend">City</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="City"
                            value={form.city}
                            onChange={(e) => setForm((prevForm) => ({ ...prevForm, city: e.target.value }))}
                        />
                        <legend className="fieldset-legend">County</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="County"
                            value={form.county}
                            onChange={(e) => setForm((prevForm) => ({ ...prevForm, county: e.target.value }))}
                        />
                        <legend className="fieldset-legend">State</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="State"
                            value={form.state}
                            onChange={(e) => setForm((prevForm) => ({ ...prevForm, state: e.target.value }))}
                        />
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
