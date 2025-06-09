import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"
import { fetchSignIn, type SignInDto, type User } from "@/services/auth.service";
import { useUserContext } from "./userContext";

interface token {
  user:User
  exp: number;
  iat: number;
}

export default function SyncUserWithBackend() {
  const { user } = useUser();
  const { setUser } = useUserContext()

  const handleFecthSignIn = async (signInDto: SignInDto) => {
    try {
      const result = await fetchSignIn(signInDto);
      const token = result.access_token
      const decoded:token = jwtDecode(token)
      setUser(decoded.user)
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      const email = user.primaryEmailAddress?.emailAddress;
      const signInDto: SignInDto = {
        email: email || "",
      };
      handleFecthSignIn(signInDto);
    }
  }, [user]);

  return null;
}