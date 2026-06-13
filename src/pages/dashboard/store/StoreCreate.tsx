import { useNavigate } from "react-router-dom";

import StoreForm from "../../../components/store/StoreForm";

import { createStore } from "../../../services/store.service";
import type { CreateStoreInput } from "../../../services/store.service";

export default function StoreCreate() {
  const navigate = useNavigate();

  async function handleCreate(data: CreateStoreInput) {
    try {
      await createStore(data);

      navigate("/dashboard/stores");
    } catch (error) {
      console.error("Erro ao criar sebo:", error);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Novo Sebo
      </h1>

      <StoreForm onSubmit={handleCreate} />
    </div>
  );
}