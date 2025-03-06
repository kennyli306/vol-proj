import Link from 'next/link';
import React from 'react'

export default function SearchSection() {

    return (
        <Link href="/search">
            <div className="card image-full shadow-sm w-96 mx-auto pt-10">
                <figure>
                    <img
                        src="/ann_arbor.png"
                        alt="Shoes" />
                </figure>
                <div className="card-body flex justify-center items-center">
                    <h2 className="card-title">Find/Post Opportunities</h2>
                    <p className="card-description"> Find volunteer opportunities near you, or post your own. </p>
                </div>
            </div>
        </ Link>
    );
}

