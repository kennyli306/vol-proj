import React from 'react'
import Link from 'next/link';

export default function SearchHero() {

    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Find/Post Opportunities</h1>
                    <p className="py-6">
                        Find volunteer opportunities near you, or post your own.
                    </p>
                    <Link href="/search" className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    )
}

