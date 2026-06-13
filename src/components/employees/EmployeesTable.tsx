import { Link } from "react-router-dom";
import { Edit2, Trash2, Shield, Briefcase, User } from "lucide-react";
import type { Employee } from "../../types/employee";

interface EmployeesTableProps {
  employees: Employee[];
  storeId: number;
  onRemove: (userId: number, role: 'owner' | 'worker') => void;
}

export default function EmployeesTable({ employees, storeId, onRemove }: EmployeesTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-6">Funcionário</th>
              <th className="py-4 px-6">ID de Usuário</th>
              <th className="py-4 px-6">Cargo / Permissão</th>
              <th className="py-4 px-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50/40 transition-colors group">
                {/* Nome e E-mail */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-xs transition-all">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{employee.name || "Sem Nome"}</p>
                      <p className="text-xs text-gray-400 font-medium">{employee.email}</p>
                    </div>
                  </div>
                </td>

                {/* ID do Usuário */}
                <td className="py-4 px-6 font-mono text-xs text-gray-500">
                  #{employee.id}
                </td>

                {/* Role / Cargo */}
                <td className="py-4 px-6">
                  {employee.role === "owner" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wide">
                      <Shield size={12} /> Proprietário
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                      <Briefcase size={12} /> Operador
                    </span>
                  )}
                </td>

                {/* Botões de Ação */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/dashboard/stores/${storeId}/employees/${employee.id}/edit`}
                      state={{ currentRole: employee.role }} // Passa o cargo atual no estado do router
                      className="p-2 text-gray-400 hover:text-[#C37351] hover:bg-orange-50 rounded-lg transition-colors"
                      title="Editar Cargo"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => onRemove(employee.id, employee.role)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover do Sebo"
                    >
                      <Trash2 size={16} />
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