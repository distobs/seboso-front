import { api } from "./api";
// Importa os tipos de usuário do arquivo central de tipos
import type { User, CreateUserInput, UpdateUserInput } from "../types/user";

// GET /users?page=<> & per_page=<> - Lista paginada de usuários (Admin)
export function getUsers(page = 1, perPage = 10) {
  return api<User[]>(`/users?page=${page}&per_page=${perPage}`);
}

// GET /users/{user_id} - Detalhes de um usuário específico
export function getUserById(userId: number) {
  return api<User>(`/users/${userId}`);
}

// POST /users/ - Cria um novo usuário globalmente (caso precise no futuro)
export function createUser(userData: CreateUserInput) {
  return api<User>("/users", {
    method: "POST",
    body: userData,
  });
}

// PUT /users/{user_id} - Atualiza os dados de um usuário específico
export function updateUser(userId: number, userData: UpdateUserInput) {
  return api<void>(`/users/${userId}`, {
    method: "PUT",
    body: userData, // Passa o objeto contendo o password obrigatório e demais dados
  });
}

// DELETE /users/{user_id} - Remove um usuário específico
export function deleteUser(userId: number) {
  return api<void>(`/users/${userId}`, {
    method: "DELETE",
  });
}