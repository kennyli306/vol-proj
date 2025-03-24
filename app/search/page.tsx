"use client"
import React, { useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Footer from '@app/components/Footer';
import NavBar from '@app/components/NavBar';
import SearchBar from '@app/components/search/SearchBar';
import Listings from '@app/components/search/Listings';
import { isUserLoggedIn } from '@app/utils';
import LocationField from '@app/components/LocationField';


export default function SearchPage() {
    const [refresh, setRefresh] = React.useState<boolean>(false);
    const [authChecked, setAuthChecked] = React.useState<boolean>(false);
    const handleRefresh = () => {
        setRefresh((prev: boolean) => !prev);
    };
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoggedIn()) {
            // Check if the user is not logged in
            router.replace(`/login?returnTo=${encodeURIComponent(window.location.pathname)}`); // Redirect to login page
        } else {
            setAuthChecked(true)
        }
    }, [router]);

    if (!authChecked) {
        return null
    }
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
            <SearchBar refreshPage={handleRefresh} />
            <Listings refresh={refresh} />
            <Footer />
        </div>
    );
}
