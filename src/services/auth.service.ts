import { api } from ".";

export interface SignInDto {
  email: string;
}

export interface User{
  id:string
  email:string
  name:string
}

export const fetchSignIn = async (signInDto: SignInDto) => {
  const response = await fetch(`${api}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signInDto),
  });

  const result = await response.json();
  return result
};