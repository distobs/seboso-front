import { api } from "./api"; // Importa a função api para fazer as requisições HTTP para a API de autenticação, permitindo realizar login e cadastro de usuários
import type { LoginData, SignupData } from "../types/auth"; // Importa os tipos LoginData e SignupData para tipar as funções de login e cadastro, garantindo que os dados enviados para a API estejam no formato correto

type LoginResponse = {
  success: boolean;
  message?: string;
};

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