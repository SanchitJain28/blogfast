import Link from "next/link";
import { createClient } from "./utils/supabase/server";
import SignOutButton from "./components/signOut/page";

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    return <h1>Sorry an error happened</h1>
  }
  const user = data.user
  if (user) {
    return <div className="p-20">
      <h1 className="text-white text-xl text-center font-mono">Hey Welcome to the fuuckin home page you habe been signed in</h1>
      {/* <SignOutButton/> */}
    </div>
  }
  return (
    <div className="p-20">
      <h1 className="text-white text-xl text-center font-mono">Hey Welcome to the fuuckin home page</h1>
      <Link href={"login"} className="mx-4 text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">Login</Link>
      <Link href={"signup"} className=" mx-4 text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">SignUp </Link>
    </div>
  );
}
