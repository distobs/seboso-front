import { api } from "./api";
import type { Book } from "../types/book";
import type { CatalogItem } from "../types/catalog";

export type CreateBookInput = Omit<Book, "id" | "created_at" | "updated_at">;
export type UpdateBookInput = Partial<CreateBookInput>;

export type AddToCatalogInput = CatalogItem;
export type UpdateCatalogInput = Partial<CatalogItem> & { store_id: number; book_id: number };

// CRUD GLOBAL DE LIVROS

export function getBooks(page = 1, perPage = 10) {
  return api<Book[]>(`/books?page=${page}&per_page=${perPage}`);
}

export function getBookById(bookId: number) {
  return api<Book>(`/books/${bookId}`);
}

export function createBook(bookData: CreateBookInput) {
  return api<void>("/books", {
    method: "POST",
    body: bookData,
  });
}

export function updateBook(bookId: number, bookData: UpdateBookInput) {
  return api<void>(`/books/${bookId}`, {
    method: "PUT",
    body: bookData,
  });
}

export function deleteBook(bookId: number) {
  return api<void>(`/books/${bookId}`, {
    method: "DELETE",
  });
}

// GERENCIAMENTO DE CATÁLOGO (LIVROS EM SEBOS)

export function listAllCatalog() {
  return api<CatalogItem[]>("/catalog");
}

export function listCatalogByStore(storeId: number) {
  return api<CatalogItem[]>(`/catalog/${storeId}`);
}

// POST /catalog - Envia o preço original sem alterações
export function addToCatalog(catalogData: AddToCatalogInput) {
  const backendPayload = {
    store_id: catalogData.store_id,
    book_id: catalogData.book_id,
    price: catalogData.price,
    quantity: catalogData.quantity,
    description: catalogData.state || "",
  };

  return api<void>("/catalog", {
    method: "POST",
    body: backendPayload,
  });
}

// PUT /catalog - Envia o preço original sem alterações via corpo e os IDs via Query String
export function updateCatalog(catalogData: UpdateCatalogInput) {
  const backendPayload = {
    price: catalogData.price,
    quantity: catalogData.quantity,
    description: catalogData.state || "",
  };

  return api<void>(`/catalog?store_id=${catalogData.store_id}&book_id=${catalogData.book_id}`, {
    method: "PUT",
    body: backendPayload,
  });
}

// DELETE /catalog - Remove um livro usando Query String
export function removeFromCatalog(storeId: number, bookId: number) {
  return api<void>(`/catalog?store_id=${storeId}&book_id=${bookId}`, {
    method: "DELETE",
  });
}