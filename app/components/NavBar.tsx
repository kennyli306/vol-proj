"use client"
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const router = useRouter();

    const { data: session } = useSession();
    const image = session?.user?.image || "/default_pfp.png";

    return (
        <div className="navbar shadow-md mt-4 mb-4">
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" href="/">Vol Project</Link>
            </div>
            <div className="flex-none">
                {session ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <Image className="w-10 rounded-full" src={image} width={250} height={250} alt="Profile Image" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link className="justify-between" href="/profile">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button className="justify-between" onClick={() => signOut({ callbackUrl: "/" })}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button
                        className="btn btn-primary"
                        onClick={() => router.push("/api/auth/signin")}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}

