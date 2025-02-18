'use client'

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { createClerkUser } from "@/app/actions"


const initialState = {
    message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}



export function CreateUserForm() {
    // useActionState is available with React 19 (Next.js App Router)
    const [state, formAction] = useActionState(createClerkUser, initialState);
    
    return (
      // <form action={formAction}>
      // <label htmlFor="todo">Enter Task</label>
      // <input type="text" id="todo" name="todo" required />
      // <SubmitButton />
      // <p aria-live="polite" className="sr-only" role="status">
      //   {state?.message}
      // </p>
      // </form>

      <div
        id="hs-slide-down-animation-modal"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        aria-labelledby="hs-slide-down-animation-modal-label"
      >
        
        <div className="hs-overlay-animation-target hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <form action={formAction}>
          <p className="text-red-500 p-4">{state?.message}</p>
              <div className="p-4 overflow-y-auto space-y-3">
                <div className=" space-y-3">
                  <label className="block " htmlFor="firstName">First Name</label>
                  <input
                  id="firstName"
                    type="text"
                    name="firstName"
                    className="py-3 px-4 block w-full border border-gray-200  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="john doe"
                  />
                </div>
                <div className=" space-y-3">
                  <label className="block " htmlFor="lastName">Last Name</label>
                  <input
                  id="lastName"
                    type="text"
                    name="lastName"
                    className="py-3 px-4 block w-full border border-gray-200  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="john doe"
                  />
                </div>
                <div className=" space-y-3">
                  <label className="block " htmlFor="emailAddress">Email</label>
                  <input
                  id="emailAddress"
                    type="text"
                    name="emailAddress"
                    className="py-3 px-4 block w-full border border-gray-200  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="john doe"
                  />
                </div>
                <div className=" space-y-3">
                  <label className="block " htmlFor="password">Password</label>
                  <input
                  id="password"
                    type="text"
                    name="password"
                    className="py-3 px-4 block w-full border border-gray-200  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="john doe"
                  />
                </div>
                
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-slide-down-animation-modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  
                >
                  Create User
                </button>
              </div>
        </form>
      </div>
      </div></div>
    );
}