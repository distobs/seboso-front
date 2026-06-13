import { useNavigate, useParams } from "react-router-dom";

import EmployeeForm from "../../../components/employees/EmployeeForm";

import { associateUserToStore } from "../../../services/userstore.service";

export default function EmployeeCreate() {
  const navigate = useNavigate();

  const { id } = useParams();

  async function handleCreate(data: {
    user_id: number;
    role: string;
  }) {
    try {
      if (!id) return;

      await associateUserToStore({
        user_id: data.user_id,
        store_id: Number(id),
        role: data.role,
      });

      navigate(
        `/dashboard/stores/${id}/employees`
      );
    } catch (error) {
      console.error(
        "Erro ao adicionar funcionário:",
        error
      );
    }
  }

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Adicionar Funcionário
      </h1>

      <EmployeeForm
        onSubmit={handleCreate}
      />

    </div>
  );
}