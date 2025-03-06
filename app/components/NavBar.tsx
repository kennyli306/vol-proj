import { useState } from "react";
import Image from "next/image";

export default function NavBar() {


    return (
        <div className="navbar shadow-md">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl" href="/">Vol Project</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <Image className="w-10 rounded-full" src="/default_pfp.png" width={250} height={250} alt="Profile Image" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between" >
                                Profile
                                <span className="badge bg-error text-error-content">TODO</span>
                            </a>
                        </li>
                        <li>
                            <a className="justify-between">
                                Settings
                                <span className="badge bg-error text-error-content">TODO</span>
                            </a>
                        </li>
                        <li>
                            <a className="justify-between">
                                Logout
                                <span className="badge bg-error text-error-content">TODO</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

