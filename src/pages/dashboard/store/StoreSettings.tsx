import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StoreForm from "../../../components/store/StoreForm";

import {
  getStoreById,
  updateStore,
} from "../../../services/store.service";

import type { Store } from "../../../types/store";

export default function StoreSettings() {
  const { id } = useParams();

  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStore() {
      try {
        if (!id) return;

        const data = await getStoreById(Number(id));

        setStore(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, [id]);

  async function handleUpdate(data: any) {
    try {
      if (!id) return;

      await updateStore(Number(id), data);

      alert("Sebo atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar sebo.");
    }
  }

  if (loading) {
    return <p>Carregando configurações...</p>;
  }

  if (!store) {
    return <p>Sebo não encontrado.</p>;
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Configurações do Sebo
        </h1>

        <p className="text-gray-500">
          Atualize os dados do estabelecimento.
        </p>
      </div>

      <StoreForm
        initialData={store}
        onSubmit={handleUpdate}
      />

    </div>
  );
}