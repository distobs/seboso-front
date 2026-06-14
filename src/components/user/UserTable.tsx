import { Link } from "react-router-dom";
import { UserCog, Trash2 } from "lucide-react";
import type { User } from "../../types/user";

interface UserTableProps {
  users: User[];
  onDelete: (id: number, name: string) => void;
}

// Função utilitária rápida para gerar as iniciais do avatar
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

export default function UserTable({ users, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
        <div className="bg-gray-50 p-3 rounded-full text-gray-400 mb-3">
          <UserCog size={28} />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">Base vazia</h3>
        <p className="text-xs text-gray-400 mt-1 max-w-xs">
          Nenhum usuário foi cadastrado ou encontrado no sistema até o momento.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider select-none">
              <th className="px-6 py-4 w-20">ID</th>
              <th className="px-6 py-4">Usuário</th>
              <th className="px-6 py-4">Credenciais</th>
              <th className="px-6 py-4 w-32">Status</th>
              <th className="px-6 py-4 w-40">Nível de Conta</th>
              <th className="px-6 py-4 w-24 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/40 transition-colors group">
                
                {/* ID Formatado */}
                <td className="px-6 py-4.5">
                  <span className="inline-flex items-center px-2 py-0.5 font-mono text-[11px] font-medium text-gray-400 bg-gray-50 border border-gray-100 rounded-md">
                    #{String(user.id).padStart(3, "0")}
                  </span>
                </td>

                {/* Usuário com Avatar */}
                <td className="px-6 py-4.5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-9 w-9 rounded-xl font-bold text-xs bg-orange-50 text-[#C37351] border border-orange-100/60 shrink-0 select-none">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block group-hover:text-[#C37351] transition-colors">
                        {user.name}
                      </span>
                      {user.cell_number && (
                        <span className="text-xs text-gray-400 block font-medium mt-0.5">
                          {user.cell_number}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Credenciais (E-mail e Login) */}
                <td className="px-6 py-4.5">
                  <div className="text-gray-700 font-medium">{user.email}</div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5">@{user.login}</div>
                </td>

                {/* Status customizado com Ponto Indicador */}
                <td className="px-6 py-4.5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    user.is_activated 
                      ? "bg-emerald-50/60 text-emerald-700 border-emerald-100" 
                      : "bg-rose-50/60 text-rose-700 border-rose-100"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${user.is_activated ? "bg-emerald-500" : "bg-rose-500"}`}>
                      {user.is_activated && <span className="absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping opacity-75" />}
                    </span>
                    {user.is_activated ? "Ativo" : "Bloqueado"}
                  </span>
                </td>

                {/* Tipo de Conta */}
                <td className="px-6 py-4.5">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide border ${
                    user.is_admin 
                      ? "bg-purple-50 text-purple-700 border-purple-100" 
                      : "bg-gray-50 text-gray-500 border-gray-200/60"
                  }`}>
                    {user.is_admin ? "ADMIN GLOBAL" : "USUÁRIO"}
                  </span>
                </td>

                {/* Ações com botões mais modernos */}
                <td className="px-6 py-4.5 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/dashboard/users/${user.id}/edit`}
                      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-[#C37351] hover:bg-orange-50 rounded-xl border border-transparent hover:border-orange-100 transition-all"
                      title="Configurar Acessos"
                    >
                      <UserCog size={17} />
                    </Link>
                    <button
                      onClick={() => onDelete(user.id, user.name)}
                      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition-all"
                      title="Excluir Permanentemente"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}