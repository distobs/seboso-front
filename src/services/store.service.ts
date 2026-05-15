import type { Store } from "../types/store";
import { api } from "./api";

export function getStores(page = 1, perPage = 10) {
  return api<Store[]>(`/stores?page=${page}&per_page=${perPage}`);
}
