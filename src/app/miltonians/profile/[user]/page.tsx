import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getClerkUser } from "@/app/actions";

// ✅ Fix: Ensure correct type for `params`
// interface ProfilePageProps {
//   params: { user: string };
// }

// ✅ Fix: Ensure function signature aligns with Next.js expectations
// @ts-ignore
export default async function ProfilePage({ params }: { params: Record<string, string> }) {
  const user = params.user;
  console.log(user);

  // Fetch user profile
  const userProfile = await getClerkUser(user);
  if (!userProfile) {
    return <div>Getting user fetch failed</div>;
  }

  return (
    <div className="max-w-lg w-full sm:p-4">
      <Link href="/miltonians" className="inline-flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-800">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Miltonians
      </Link>

      <div className="space-y-4 mb-4 flex gap-2 items-center">
        <div className="z-10 size-12 flex justify-center items-center">
          <Image
            className="shrink-0 size-12 rounded-full"
            src={userProfile.imgUrl}
            width={38}
            height={38}
            alt="Avatar"
          />
        </div>
        <div className="w-full">
          <div className="flex justify-between w-full items-center">
            <h1 className="font-medium">{userProfile.firstName} {userProfile.lastName}</h1>
            <Link href={`../timeline/${user}`} className="text-xs border border-gray-500 px-4 py-2 rounded-lg">Timeline</Link>
          </div>
          <span className="block text-sm text-gray-500 dark:text-neutral-500">{userProfile.emailAddress}</span>
        </div>
      </div>
    </div>
  );
}

// ✅ Fix: Ensure `generateMetadata` follows Next.js rules
export async function generateMetadata({ params }: { params: Record<string, string> }): Promise<Metadata> {
  return {
    title: `Profile - ${params.user}`,
  };
}
