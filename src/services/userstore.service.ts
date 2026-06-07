import { api } from "./api";
import type { UserStore } from "../types/userstore";

export async function getUserStores(
  userId: number): Promise<UserStore[]> {
  return api<UserStore[]>(`/userstore?user_id=${userId}`);
}