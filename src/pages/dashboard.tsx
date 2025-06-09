import { useUserContext } from "@/hooks/userContext";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "@/components/auth/login";

export default function Dashboard() {
    const { user, logout } = useUserContext();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const locationUrl = location.pathname;

    return (
        <div className="w-full min-h-dvh grid grid-cols-1 grid-rows-[auto_1fr_auto]">
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

            <header className="border-b flex justify-end items-center p-4 gap-4 h-10">
                <section>
                    <SignedOut>
                        <div className="bg-primary px-4 py-1 rounded-2xl">
                            <SignInButton mode="modal" />
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </section>

                <section className="flex items-center gap-4 md:text-sm text-[10px]">
                    {!user && (
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="bg-black rounded-4xl text-white font-semibold p-1.5 px-4 hover:opacity-90 transition-all duration-300"
                        >
                            Iniciar Sesión
                        </button>
                    )}
                    {user && (
                        <a
                            onClick={logout}
                            href={locationUrl}
                            className="bg-white border border-zinc-600 rounded-4xl text-black font-semibold p-1 px-4 md:p-1.5 md:px-4 hover:opacity-90 transition-all duration-300 w-fit"
                        >
                            Cerrar Sesión
                        </a>
                    )}
                </section>
            </header>

            <main className="flex items-center justify-center bg-secondary">
                <Link to={'projects'} className="bg-primary px-4 py-2 rounded-2xl">
                    Go to Projects
                </Link>
            </main>

            <footer />
        </div>
    );
}
