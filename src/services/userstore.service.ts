import { api } from "./api";
import type { UserStore } from "../types/userstore";

export type CreateUserStoreInput = UserStore;

// GET /userstore?user_id=<> - Lista todos os sebos associados a um usuário específico
export async function getUserStores(userId: number): Promise<UserStore[]> {
  return api<UserStore[]>(`/userstore?user_id=${userId}`);
}

// GET /userstore?store_id=<> - Lista todos os usuários associados a um sebo específico
export function getEmployeesByStore(storeId: number): Promise<UserStore[]> {
  return api<UserStore[]>(`/userstore?store_id=${storeId}`);
}

// GET /userstore?role=<> - Lista todas as associações de usuários a sebos filtrando por role
export function getAllUserStores(filters?: { role?: string; store_id?: number; user_id?: number }) {
  let url = "/userstore";
  if (filters) {
    const params = new URLSearchParams();
    if (filters.role) params.append("role", filters.role);
    if (filters.store_id) params.append("store_id", String(filters.store_id));
    if (filters.user_id) params.append("user_id", String(filters.user_id));
    
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
  }
  return api<UserStore[]>(url);
}

// POST /userstore - Associa um usuário a um sebo com uma role específica
export function associateUserToStore(data: CreateUserStoreInput) {
  return api<void>("/userstore", {
    method: "POST",
    body: data,
  });
}

// PUT /userstore - Atualiza a role de um usuário em um sebo específico
export function updateEmployeeRole(data: UserStore) {
  return api<void>("/userstore", {
    method: "PUT",
    body: data,
  });
}

// DELETE /userstore - Remove a associação de um usuário a um sebo
export function removeUserFromStore(storeId: number, userId: number, role: string) {
  return api<void>("/userstore", {
    method: "DELETE",
    body: { store_id: storeId, user_id: userId, role },
  });
}