const API_URL = import.meta.env.VITE_API_URL;

// Opções para requisições à API
type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string;
};

// Função genérica para fazer requisições à API
export async function api<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  // Configurações padrão para a requisição
  const { method = "GET", body, token } = options;

  // Configura os headers, incluindo o token de autenticação se fornecido
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Faz a requisição à API
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  // Se a resposta não for OK, lança um erro com a mensagem da API ou uma mensagem genérica
  if (!response.ok) {
    throw new Error(data?.message || "Erro na comunicação com servidor");
  }

  return data;
}
