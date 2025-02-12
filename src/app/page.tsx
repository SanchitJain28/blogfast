import Image from "next/image";
import { signIn } from "@/auth"
import { auth } from "../auth"
import { signOut } from "@/auth"
import Link from "next/link";

export default async function Home() {
  const session = await auth()
  if (session) {
    return <div className="">
      <h1>You habe been signed in chigga</h1>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Signout with google</button>

      </form>
    </div>
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button type="submit">Signin with Google</button>
        <Link href={"login"}>Sign Up</Link>
      </form>
    </div>
  );
}
