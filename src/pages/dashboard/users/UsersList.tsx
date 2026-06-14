import { useEffect, useState, useCallback } from "react";
import { Users, ShieldAlert } from "lucide-react";
import { getUsers, deleteUser } from "../../../services/user.service";
import type { User } from "../../../types/user";
import UserTable from "../../../components/user/UserTable"; // ◄ IMPORTADO AQUI

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getUsers(1, 50)
      .then((data) => isMounted && setUsers(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
      .finally(() => isMounted && setLoading(false));
    return () => { isMounted = false; };
  }, []);

  const handleDeleteUser = useCallback(async (userId: number, userName: string) => {
    if (!window.confirm(`Excluir permanentemente "${userName}"?`)) return;
    try {
      await deleteUser(userId);
      setUsers((current) => current.filter((user) => user.id !== userId));
    } catch (error) {
      alert("Não foi possível excluir o usuário. Erro: " + (error instanceof Error ? error.message : "Desconecido"));
    }
  }, []);

  if (loading) return <div className="animate-pulse p-2 h-64 bg-gray-50 rounded-2xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-gray-900">
        <Users size={24} className="text-[#C37351]" />
        <h1 className="text-2xl font-bold tracking-tight">Controle de Usuários</h1>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-xs">
        <ShieldAlert size={20} className="shrink-0" />
        <span><span className="font-bold">Área Admin:</span> Modificações globais de acessos.</span>
      </div>
      
      {/* Tabela de usuários */}
      <UserTable users={users} onDelete={handleDeleteUser} />
    </div>
  );
}