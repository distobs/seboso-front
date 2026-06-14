// O que o servidor retorna em rotas GET /users ou GET /users/{id}
export interface User {
  id: number;
  name: string;
  email: string;
  login: string;
  cell_number: string | null;
  is_admin: boolean;
  is_activated: boolean;
  created_at: string;
  updated_at: string;
}

// O que o POST /users/ exige no corpo da requisição (JSON)
export interface CreateUserInput {
  name: string; 
  email: string;
  login: string;
  password: string;
  cell_number?: string | null;
}

// O que o PUT /users/{id} aceita/exige no corpo da requisição (JSON)
export interface UpdateUserInput {
  name?: string;
  email?: string;
  login?: string;
  password: string; 
  cell_number?: string | null;
  is_activated?: boolean;
}