import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="w-full min-h-dvh grid grid-cols-1 grid-rows-[auto_1fr_auto]">
            <header className="border-b flex justify-end items-center p-4 gap-4 h-10">
                <SignedOut>
                    <div className="bg-primary px-4 py-1 rounded-2xl">
                        <SignInButton mode="modal" />
                    </div>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>
            <main className="flex items-center justify-center bg-secondary">
                <Link to={'projects'}
                    className="bg-primary px-4 py-2 rounded-2xl">
                    Go to Projects
                </Link>
            </main>
            <footer>

            </footer>
        </div>
    )
}