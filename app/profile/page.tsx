import NavBar from "@app/components/NavBar";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent("/profile")}`);
    }

    let username = session?.user?.name || "";
    let email = session?.user?.email || "";

    return (
        <div className="flex flex-col min-h-screen max-w-[1080px] mx-auto m-16">
            <NavBar />

            <h1 className="text-3xl font-bold mt-3 mb-3">Profile</h1>
            <div className="border p-6 rounded shadow space-y-4 mt-3 mb-3">
                <div>
                    <p className="text-gray-600">Username</p>
                    <p className="text-xl font-medium">{username}</p>
                </div>
            </div>
            <div className="border p-6 rounded shadow space-y-4 mt-3 mb-3">
                <div>
                    <p className="text-gray-600">Email</p>
                    <p className="text-xl font-medium">{email}</p>
                </div>
            </div>
        </div>
    );
}
