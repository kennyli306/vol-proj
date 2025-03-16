"use client"

import React, { useEffect, useState} from "react";
import Link from 'next/link';
import { isUserLoggedIn } from '@app/utils';
export default function SearchHero() {

    const [destination, setDestination] = useState("/login");
    useEffect(() => {
      // This code will only run on the client side
        setDestination(isUserLoggedIn() ? "/search" : "/login");
    }, []);
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Find/Post Opportunities</h1>
                    <p className="py-6">
                        Find volunteer opportunities near you, or post your own.
                    </p>
                    <Link href={destination} className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    )
}

