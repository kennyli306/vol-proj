"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@app/utils";

export default function NavBar() {
    const router = useRouter();

    const handleLogout = () => {
      // Remove authentication cookies
      deleteCookie("username");
      // Redirect to home page
      router.replace("/");
    };

    return (
        <div className="navbar shadow-md mt-4 mb-4">
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" href="/">Vol Project</Link>
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
                            <a className="justify-between" onClick={handleLogout}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

