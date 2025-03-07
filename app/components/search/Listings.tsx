import React from 'react'
import Post from '@app/components/search/Post';

export default function Listings() {
    return (
        <div>
            <ul className="list rounded-box shadow-md min-h-screen mb-4">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Showing postings</li>

                <Post listId={1} postId={0} />

            </ul>
            <div className="join float-right">
                <button className="join-item btn btn-active">1</button>
                <button className="join-item btn">2</button>
                <button className="join-item btn btn-disabled">...</button>
            </div>
        </div>
    )
}
