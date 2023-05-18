import Link from "next/link";
import { useSession, signOut, signIn } from 'next-auth/react';

const Navbar = () => {
    const { data: session, status } = useSession();

    return (
        <nav className="py-2 px-10 bg-neutral-100 font-semibold text-gray-700 border-b-1 border-gray-300 shadow-sm sticky top-0">
            <div className="flex justify-between items-center p-2 px-5">
                <div className="text-xl">
                    <Link href="/">SportEvents</Link>
                </div>
                <ul>
                    <li className="inline-block px-3">
                        <Link href='/'>Home</Link>
                    </li>
                    <li className="inline-block px-3">
                        <Link href='/events'>Events</Link>
                    </li>
                    {status === "unauthenticated" &&
                        <li className="inline-block px-3">
                            <button onClick={() => signIn()}>Sign in</button>
                        </li>
                    }
                    {status === "authenticated" &&
                        <li className="inline-block px-3">
                            <span className="mr-3">Signed in as {session.user?.name}</span>
                            <button onClick={() => signOut()}>Sign out</button>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;