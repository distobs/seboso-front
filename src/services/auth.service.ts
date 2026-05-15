import type { User } from "../types/user";
import { api } from "./api";

export type LoginCredentials = {
  login: string;
  password: string;
};

export type SignupInput = Pick<
  User,
  "name" | "login" | "email" | "password" | "cell_number"
>;

export function login(credentials: LoginCredentials) {
  return api<User>("/auth/login", {
    method: "POST",
    body: credentials,
  });
}

export function signup(payload: SignupInput) {
  return api<User>("/auth/signup", {
    method: "POST",
    body: payload,
  });
}
