"use client"
import React, { useRef, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Footer from '@app/components/Footer';
import NavBar from '@app/components/NavBar';
import AddressField from '@app/components/AddressField';
import { getCookie } from '@app/utils';


export default function PostPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const username = getCookie("username")
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        fetch('/api/posts', {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
            }).then(() => {
                router.push('/search');
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className="flex flex-col min-h-screen max-w-[1080px] mx-auto m-16">
            <NavBar />
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/search">Search</Link>
                    </li>
                    <li>Add Post</li>
                </ul>
            </div>
            {/* Form for adding posts */}
            <main className="flex items-start justify-center w-full min-h-screen ">
                <form ref={formRef} onSubmit={handleSubmit} className="shadow-xl p-8 rounded-lg w-full max-w-2xl">
                    <input type="hidden" name="username" value={username || ''} />
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend pt-4">Title</legend>
                        <input name="title" type="text" className="input w-full" placeholder="Title" required />
                        <legend className="fieldset-legend">Organization</legend>
                        <input name="organization" type="text" className="input w-full" placeholder="Organization" required />
                        <legend className="fieldset-legend">Address</legend>
                        <AddressField />
                        <legend className="fieldset-legend">Description</legend>
                        <textarea name="description" className="textarea h-24 w-full" placeholder="Description" required></textarea>
                    </fieldset>

                    <div className="flex justify-center mt-4">
                        <button type="submit" className="btn btn-primary">Add Post</button>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
}
