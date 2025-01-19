import Link from "next/link";
import Image from "next/image";

export default async function ProfilePage({ params }: { params: { user: string } }) {
  const { user } = await params;

  return (
    <div className="max-w-lg w-full">
    <div className="space-y-4 mb-4 flex gap-2 items-center">
        <div className="z-10 size-12 flex justify-center items-center">
            <Image
              className="shrink-0 size-12 rounded-full"
              src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
              alt="Avatar"
            />
        </div>
        <div className="w-full">
            <div className="flex justify-between w-full items-center">
                <h1 className="font-medium">{user.charAt(0).toUpperCase() + user.slice(1)}</h1>
                <Link href={`${user}/tree`} className="text-xs border border-gray-500 px-4 py-2 rounded-lg">Family Tree</Link>
            </div>
            <span className="block text-sm text-gray-500 dark:text-neutral-500">durai@gmail.com</span>
        </div>
    </div>
    <div className="pb-4 border-b-2">
    <h1 className="text-sm text-gray-500">Director Chairman</h1>
      <h2 className="font-semibold">Mission Statement</h2>
      <p className="text-sm text-gray-500 dark:text-neutral-500 italic">{`"Let the world be better place because I came Here"`}</p>
    </div>

    <div className="py-4">
        <h2 className="font-semibold p-2">Recent Events</h2>
    {/* <!-- Card --> */}
    <a className="group relative block rounded-xl focus:outline-none" href="#">
      <div className="shrink-0 relative rounded-xl overflow-hidden w-full h-[350px] before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-gray-900/70">
        <Image className="size-full absolute top-0 start-0 object-cover" src="https://images.unsplash.com/photo-1669828230990-9b8583a877ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Blog Image" />
      </div>

      <div className="absolute top-0 inset-x-0 z-10">
        <div className="p-4 flex flex-col h-full sm:p-6">
          {/* <!-- Avatar --> */}
          <div className="flex items-center">
            <div className="shrink-0">
              <Image className="size-[46px] border-2 border-white rounded-full" src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
            </div>
            <div className="ms-2.5 sm:ms-4">
              <h4 className="font-semibold text-white">
                Durai
              </h4>
              <p className="text-xs text-white/80">
                Aug 01, 2021
              </p>
            </div>
          </div>
          {/* <!-- End Avatar --> */}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="flex flex-col h-full p-4 sm:p-6">
          <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
            True Faith in God
          </h3>
          <p className="mt-2 text-white/80">
            Speech on Alumni
          </p>
        </div>
      </div>
    </a>
    {/* <!-- End Card --> */}

    </div>
    
  </div>
  );
}
