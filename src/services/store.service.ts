import { api } from "./api";
import type { Store } from "../types/store";

export type CreateStoreInput = Omit<Store, "id" | "created_at" | "updated_at">;
export type UpdateStoreInput = Partial<CreateStoreInput>;

// GET /stores?page=<> & per_page=<>
export function getStores(page = 1, perPage = 10) {
  return api<Store[]>(`/stores?page=${page}&per_page=${perPage}`);
}

// GET /stores/{store_id} - Detalhes de um sebo específico
export function getStoreById(storeId: number) {
  return api<Store>(`/stores/${storeId}`);
}

// POST /stores/ - Cria um novo sebo
export function createStore(storeData: CreateStoreInput) {
  return api<void>("/stores/", {
    method: "POST",
    body: storeData,
  });
}

// PUT /stores/{sebo_id} - Atualiza os dados de um sebo específico
export function updateStore(storeId: number, storeData: UpdateStoreInput) {
  return api<void>(`/stores/${storeId}`, {
    method: "PUT",
    body: storeData,
  });
}

// DELETE /stores/{sebo_id} - Remove um sebo específico
export function deleteStore(storeId: number) {
  return api<void>(`/stores/${storeId}`, {
    method: "DELETE",
  });
}