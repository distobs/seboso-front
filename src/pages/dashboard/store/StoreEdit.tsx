import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import StoreForm from "../../../components/store/StoreForm";

import {
  getStoreById,
  updateStore,
  type CreateStoreInput,
} from "../../../services/store.service";

import type { Store } from "../../../types/store";
import { Store as StoreIcon } from "lucide-react";

export default function StoreEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    async function loadStore() {
      if (!id) {
        return;
      }

      try {
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

  async function handleUpdate(data: CreateStoreInput) {
    try {
      if (!id) return;

      await updateStore(Number(id), data);
      navigate("/dashboard/stores");
    } catch (error) {
      console.error("Erro ao atualizar sebo:", error);
      alert(
        "Ocorreu um erro ao tentar salvar as alterações do estabelecimento.",
      );
    }
  }

  // Renderizações condicionais para estados de carregamento e erro
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 bg-gray-200 rounded-lg w-1/4" />
          <div className="h-4 bg-gray-200 rounded-lg w-1/3" />
        </div>
        <div className="h-48 bg-gray-100 rounded-2xl w-full" />
        <div className="h-64 bg-gray-100 rounded-2xl w-full" />
      </div>
    );
  }

  // Se o store não for encontrado, mostramos uma mensagem amigável e um botão para voltar
  if (!store) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <StoreIcon className="mx-auto text-gray-300 mb-3" size={40} />
        <h2 className="text-xl font-bold text-gray-800">Sebo não encontrado</h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">
          O estabelecimento que você está tentando editar não foi localizado no
          sistema.
        </p>
        <button
          onClick={() => navigate("/dashboard/stores")}
          className="px-4 py-2 bg-[#C37351] hover:bg-[#A85F42] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
        >
          Voltar para gerenciamento
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full px-4 lg:px-8 space-y-6">
      {/* Título unificado e limpo */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Editar Sebo
        </h1>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          Modifique as informações cadastrais e de localização de{" "}
          <span className="font-bold text-gray-700">{store.name}</span>
        </p>
      </div>

      <StoreForm initialData={store} onSubmit={handleUpdate} />
    </div>
  );
}
