import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import StoreForm from "../../../components/store/StoreForm";

import {
  getStoreById,
  updateStore,
  type CreateStoreInput,
} from "../../../services/store.service";

import type { Store } from "../../../types/store";

export default function StoreEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStore() {
      try {
        if (!id) return;

        const data = await getStoreById(Number(id));

        setStore(data);
      } catch (error) {
        console.error("Erro ao carregar sebo:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, [id]);

  async function handleUpdate(
    data: CreateStoreInput
  ) {
    try {
      if (!id) return;

      await updateStore(Number(id), data);

      navigate("/dashboard/stores");
    } catch (error) {
      console.error("Erro ao atualizar sebo:", error);
    }
  }

  if (loading) {
    return <p>Carregando sebo...</p>;
  }

  if (!store) {
    return <p>Sebo não encontrado.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Editar Sebo
      </h1>

      <StoreForm
        initialData={store}
        onSubmit={handleUpdate}
      />
    </div>
  );
}