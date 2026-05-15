import type { Store } from "../types/store";
import type { Book } from "../types/book";

const API_URL = import.meta.env.VITE_API_URL;

// Opções para requisições à API
type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string;
};

// Função genérica para fazer requisições à API
async function api<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {

  // Configurações padrão para a requisição
  const {
    method = "GET",
    body,
    token,
  } = options;

  // Configura os headers, incluindo o token de autenticação se fornecido
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  // Faz a requisição à API
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    }
  );

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }


  // Se a resposta não for OK, lança um erro com a mensagem da API ou uma mensagem genérica
  if (!response.ok) {

    throw new Error(
      data?.message ||
      "Erro na comunicação com servidor"
    );

  }

  return data;
}

// Função para buscar a lista de sebos, com paginação
export function getStores(
  page = 1,
  perPage = 10
) {
  return api<Store[]>(
    `/stores?page=${page}&per_page=${perPage}`
  );

}

// Função para buscar a lista de livros, com paginação
export function getBooks(
  page = 1,
  perPage = 10
) {
  return api<Book[]>(
    `/books?page=${page}&per_page=${perPage}`
  );
}