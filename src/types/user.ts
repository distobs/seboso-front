
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
