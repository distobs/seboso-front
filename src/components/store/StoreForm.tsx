import { useState } from "react";
import FormField from "../ui/FormField";
import type { CreateStoreInput } from "../../services/store.service";

interface StoreFormProps {
  initialData?: Partial<CreateStoreInput>;

  onSubmit: (
    data: CreateStoreInput
  ) => Promise<void>;
}

export default function StoreForm({
  initialData,
  onSubmit,
}: StoreFormProps) {

  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    cnpj: initialData?.cnpj ?? "",

    street: initialData?.street ?? "",
    number: initialData?.number?.toString() ?? "",

    city: initialData?.city ?? "",
    state: initialData?.state ?? "",

    city_block: initialData?.city_block ?? "",
    cep: initialData?.cep ?? "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
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
      ...formData,

      number: Number(formData.number),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Dados do Sebo */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Informações do Sebo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <FormField
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <FormField
            label="CNPJ"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
          />

        </div>
      </section>

      {/* Endereço */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Endereço
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <FormField
            label="Rua"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />

          <FormField
            label="Número"
            name="number"
            type="number"
            value={formData.number}
            onChange={handleChange}
          />

          <FormField
            label="Bairro"
            name="city_block"
            value={formData.city_block}
            onChange={handleChange}
          />

          <FormField
            label="CEP"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
          />

          <FormField
            label="Cidade"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <FormField
            label="Estado"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />

        </div>
      </section>

      {/* Botões */}
      <div className="flex justify-end gap-3">

        <button
          type="button"
          className="
            px-5
            py-2
            rounded-lg
            border
            border-gray-300
          "
        >
          Cancelar
        </button>

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
          Salvar Sebo
        </button>

      </div>
    </form>
  );
}