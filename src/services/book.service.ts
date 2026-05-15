import type { Book } from "../types/book";
import { api } from "./api";

export function getBooks(page = 1, perPage = 10) {
  return api<Book[]>(`/books?page=${page}&per_page=${perPage}`);
}
