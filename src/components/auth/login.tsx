// components/LoginModal.tsx
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useUserContext } from "@/hooks/userContext";
import { fetchLoginGoogle } from "@/services/auth.service";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useUserContext();

    const handleLoginGoogle = async (response: any) => {
        try {
            const data = await fetchLoginGoogle(response);
            login(data.access_token);
            onClose(); 
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-lg font-bold"
                >
                    ✕
                </button>
                <h1 className="font-bold text-3xl text-center mb-2">Bienvenidos</h1>
                <p className="text-center mb-4">Inicia sesión para continuar</p>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={() => {
                    }}
                >
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg p-2"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg p-2"
                    />
                    <button
                        type="submit"
                        className="bg-black text-white rounded-xl font-semibold py-2 hover:opacity-90"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <p className="text-center mt-2 text-sm text-gray-600">
                    ¿No tienes cuenta?{" "}
                    <a href="/auth/register" className="text-black font-semibold">
                        Regístrate
                    </a>
                </p>
                <div className="mt-4 flex justify-center">
                    <GoogleLogin
                        onSuccess={handleLoginGoogle}
                        onError={() => console.log("Login Failed")}
                    />
                </div>
            </div>
        </div>
    );
}
