"use client"
import { getClerkUser, updateClerkUser } from "@/app/actions";
import { useActionState, useEffect, useState } from "react";
import { useParams } from "next/navigation";

function EditUserPage() {
    const [user, setUser] = useState<{ id: string; firstName: string | null; lastName: string | null; publicMetadata?: { role?: string } } | null>(null);
    const { userId } = useParams();
    const [state, formAction] = useActionState(updateClerkUser, { message: "" });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("Fetching user...");
                if(userId === undefined || Array.isArray(userId)) {
                    return;
                }
                const result = await getClerkUser(userId);
                if (result) {
                    setUser(result);
                } else {
                    console.error("User not found");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [userId]);

    if(!user) {
        return <div>User not loaded</div>;
    }

    return (
        <div className='max-w-lg w-full sm:p-4'>
            {state.message}
        <h2 className='text-xl font-semibold'>Edit User {user?.firstName}</h2>
        <form action={formAction} className="flex flex-col gap-4 mt-4">
            <input type="hidden" name="userId" value={user.id} />
            <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    defaultValue={user.firstName ?? ''}
                    className="mt-1 p-2 border rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    defaultValue={user.lastName ?? ''}
                    className="mt-1 p-2 border rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password" className="text-sm font-medium">New Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 border rounded-md"
                    placeholder="Enter new password"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="role" className="text-sm font-medium">Role</label>
                <select
                    id="role"
                    name="role"
                    defaultValue={(user.publicMetadata as { role?: string })?.role ?? 'user'}
                    className="mt-1 p-2 border rounded-md"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                </select>
            </div>
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Update User
            </button>
        </form>
    </div>
    );
}

export default EditUserPage;


