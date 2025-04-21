"use client"
import React from 'react'
import Link from 'next/link';
import Footer from '@app/components/Footer';
import NavBar from '@app/components/NavBar';
import SearchBar from '@app/components/search/SearchBar';
import Listings from '@app/components/search/Listings';

export default function SearchPage() {
    const [form, setForm] = React.useState<{ searchTerm: string; distance: number | null }>({
        searchTerm: '',
        distance: null,
    });
    const [refresh, setRefresh] = React.useState<boolean>(false);

    return (
        <div className="flex flex-col min-h-screen max-w-[1080px] mx-auto m-16">
            <NavBar />
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>Search</li>
                </ul>
            </div>
            <SearchBar setForm={setForm} setRefresh={setRefresh} refresh={refresh} />
            <Listings form={form} refresh={refresh} />
            <Footer />
        </div>
    );
}
