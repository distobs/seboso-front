import { useState } from "react";

import FormField from "../ui/FormField";

type EmployeeFormData = {
  user_id: number;
  role: string;
};

type EmployeeFormProps = {
  initialData?: EmployeeFormData;

  onSubmit: (
    data: EmployeeFormData
  ) => Promise<void>;
};

export default function EmployeeForm({
  initialData,
  onSubmit,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    user_id: initialData?.user_id ?? 0,
    role: initialData?.role ?? "worker",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await onSubmit({
      user_id: Number(formData.user_id),
      role: formData.role,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Dados do Funcionário
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <FormField
            label="ID do Usuário"
            name="user_id"
            type="number"
            value={String(formData.user_id)}
            onChange={handleChange}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Cargo
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="
                border
                border-gray-300
                rounded-lg
                px-3
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-[#C37351]
              "
            >
              <option value="worker">
                Funcionário
              </option>

              <option value="owner">
                Proprietário
              </option>
            </select>
          </div>

        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="
            px-5
            py-2
            rounded-lg
            bg-[#C37351]
            text-white
            hover:bg-[#A85F42]
          "
        >
          Salvar
        </button>
      </div>
    </form>
  );
}