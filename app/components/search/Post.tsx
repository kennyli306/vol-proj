import React from 'react'

interface PostProps {
    listId: number;
    postId: number;
}

export default function Post({listId, postId }: PostProps) {
    return (
        <li className="list-row">
            <div className="text-6xl font-thin opacity-30 tabular-nums">{listId}</div>
            <div>
                <div className="text-3xl">Post Title</div>
                <div className="text-m uppercase font-semibold opacity-80">Organization</div>
                <div className="text-l uppercase font-semibold opacity-60">Location</div>
            </div>
            <p className="list-col-wrap text-xl">
                Description
            </p>
            <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>
        </li>
    )
}
