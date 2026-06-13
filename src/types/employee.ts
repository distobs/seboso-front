export interface Employee {
  id: number; // ID do Usuário
  name: string;
  email: string;
  role: 'owner' | 'worker';
}

export interface AssociateEmployeeInput {
  user_id: number;
  store_id: number;
  role: 'owner' | 'worker';
}