import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

import { getEmployeesByStore, removeUserFromStore } from "../../../services/userstore.service";
import type { UserStore } from "../../../types/userstore";
import type { Employee } from "../../../types/employee"; 
import EmployeesTable from "../../../components/employees/EmployeesTable";

export default function EmployeesList() {
  const { id } = useParams();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // 
  useEffect(() => {
    let isMounted = true;

    async function executeFetch() {
      if (!id) return;
      try {
        const data: UserStore[] = await getEmployeesByStore(Number(id));
        
        if (isMounted) {
          const mappedEmployees: Employee[] = data.map((item) => ({
            id: item.user_id,
            role: item.role as "owner" | "worker",
            name: `Usuário #${item.user_id}`,
            email: "Vínculo ativo no sebo"
          }));

          setEmployees(mappedEmployees);
        }
      } catch (error) {
        console.error("Erro ao carregar funcionários:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    executeFetch();

    return () => {
      isMounted = false;
    };
  }, [id]); 

  // 
  const handleDelete = useCallback(async (userId: number, role: "owner" | "worker") => {
    const confirmed = window.confirm("Deseja remover este funcionário?");
    if (!confirmed) return;

    try {
      if (!id) return;

      await removeUserFromStore(
        Number(id),
        userId,
        role
      );

      setEmployees((current) =>
        current.filter((item) => !(item.id === userId && item.role === role))
      );
    } catch (error) {
      console.error("Erro ao remover funcionário:", error);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full space-y-4 animate-pulse p-2">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-100 rounded-xl w-40" />
          <div className="h-10 bg-gray-100 rounded-xl w-44" />
        </div>
        <div className="h-64 bg-gray-50 rounded-2xl w-full border border-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Funcionários
        </h1>

        <Link
          to={`/dashboard/stores/${id}/employees/create`}
          className="bg-[#C37351] text-white px-4 py-2.5 text-sm font-bold rounded-xl hover:bg-[#A85F42] transition-colors shadow-xs"
        >
          Adicionar Funcionário
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <EmployeesTable
          employees={employees}
          storeId={Number(id)}
          onRemove={handleDelete}
        />
      </div>
    </div>
  );
}