import { api } from "./api";
import type { User } from "../types/user";

export type UpdateUserInput = Partial<Omit<User, "id" | "created_at" | "updated_at">>;

// GET /users?page=<> & per_page=<> - Lista paginada de usuários (Admin)
export function getUsers(page = 1, perPage = 10) {
  return api<User[]>(`/users?page=${page}&per_page=${perPage}`);
}

// GET /users/{user_id} - Detalhes de um usuário específico
export function getUserById(userId: number) {
  return api<User>(`/users/${userId}`);
}

// PUT /users/{user_id} - Atualiza os dados de um usuário específico
export function updateUser(userId: number, userData: UpdateUserInput) {
  return api<void>(`/users/${userId}`, {
    method: "PUT",
    body: userData,
  });
}

// DELETE /users/{user_id} - Remove um usuário específico
export function deleteUser(userId: number) {
  return api<void>(`/users/${userId}`, {
    method: "DELETE",
  });
}