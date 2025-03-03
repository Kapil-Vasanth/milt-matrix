"use client"; // Required for client-side component

import { useActionState } from "react";
import { createClerkUser } from "@/app/actions"; // Adjust the import path if needed
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function CreateUserForm() {
  // ✅ Remove useState, useActionState handles the submission state
  const [state, formAction] = useActionState(createClerkUser, { message: "" });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="border border-gray-500 px-3 py-2 rounded hover:bg-gray-100 text-xs font-semibold">Add Miltonian</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a New User</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details to create a new user.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* ✅ Form using Server Action */}
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="emailAddress" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="emailAddress"
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <button type="submit">
              Create User
            </button>
          </AlertDialogFooter>
        </form>

        {/* ✅ Show success/error message */}
        {state.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
