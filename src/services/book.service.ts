import { api } from "./api";
import type { Book } from "../types/book";
import type { CatalogItem } from "../types/catalog";

export type CreateBookInput = Omit<Book, "id" | "created_at" | "updated_at">;
export type UpdateBookInput = Partial<CreateBookInput>;

export type AddToCatalogInput = CatalogItem;
export type UpdateCatalogInput = Partial<CatalogItem> & { store_id: number; book_id: number };

// CRUD GLOBAL DE LIVROS

// GET /books?page=<> & per_page=<> - Lista paginada de livros (Admin)
export function getBooks(page = 1, perPage = 10) {
  return api<Book[]>(`/books?page=${page}&per_page=${perPage}`);
}

// GET /books/{book_id} - Detalhes de um livro específico
export function getBookById(bookId: number) {
  return api<Book>(`/books/${bookId}`);
}

// POST /books/ - Cria um novo livro
export function createBook(bookData: CreateBookInput) {
  return api<void>("/books/", {
    method: "POST",
    body: bookData,
  });
}

// PUT /books/{book_id} - Atualiza os dados de um livro específico
export function updateBook(bookId: number, bookData: UpdateBookInput) {
  return api<void>(`/books/${bookId}`, {
    method: "PUT",
    body: bookData,
  });
}

// DELETE /books/{book_id} - Remove um livro específico
export function deleteBook(bookId: number) {
  return api<void>(`/books/${bookId}`, {
    method: "DELETE",
  });
}

// GERENCIMANETO DE CATÁLOGO (LIVROS EM SEBOS)

// GET /catalog - Lista todos os livros em todos os sebos (Admin)
export function listAllCatalog() {
  return api<CatalogItem[]>("/catalog");
}

// GET /catalog/{store_id} - Lista livros de um sebo específico
export function listCatalogByStore(storeId: number) {
  return api<CatalogItem[]>(`/catalog/${storeId}`);
}

// POST /catalog - Adiciona um livro a um sebo específico, enviando store_id e book_id no corpo JSON
export function addToCatalog(catalogData: AddToCatalogInput) {
  return api<void>("/catalog", {
    method: "POST",
    body: catalogData,
  });
}

// PUT /catalog - Atualiza a disponibilidade de um livro em um sebo específico, enviando store_id e book_id no corpo JSON
export function updateCatalog(catalogData: UpdateCatalogInput) {
  return api<void>("/catalog", {
    method: "PUT",
    body: catalogData,
  });
}

// DELETE /catalog - Remove um livro de um sebo específico, enviando store_id e book_id no corpo JSON
export function removeFromCatalog(storeId: number, bookId: number) {
  return api<void>("/catalog", {
    method: "DELETE",
    body: { store_id: storeId, book_id: bookId },
  });
}