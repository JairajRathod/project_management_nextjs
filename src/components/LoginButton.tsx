"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <div>
        <p>Welcome {session.user?.name}</p>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center justify-center gap-3 w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm text-black font-medium shadow-sm hover:bg-gray-50 transition"
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>
  );
}
