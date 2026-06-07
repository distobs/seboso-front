import { api } from "./api"; 
import type { LoginData, SignupData } from "../types/auth"; 

// Define a resposta esperada do endpoint de login
type LoginResponse = {
  success: boolean;
  message?: string;
};

// Função para realizar o login do usuário
export async function loginUser(
  data: LoginData
) {

  return api<LoginResponse>(
    "/users/login",
    {
      method: "POST",
      body: data,
    }
  );

}

// Função para realizar o cadastro do usuário
export async function signupUser(
  data: SignupData
) {

  return api(
    "/users",
    {
      method: "POST",
      body: data,
    }
  );

}