import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoreForm from "../../../components/store/StoreForm";
import { getStoreById, updateStore } from "../../../services/store.service";
import type { Store } from "../../../types/store";
// 🟢 IMPORTANTE: Certifique-se de importar o tipo correto do seu arquivo de tipos, 
// o caminho abaixo é um exemplo, ajuste para onde o seu CreateStoreInput estiver guardado.
import type { CreateStoreInput } from "../../../types/store"; 

export default function StoreSettings() {
  const { id } = useParams<{ id: string }>();

  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStore() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
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

  // 🟢 CORREÇÃO: Alterado o tipo de 'Store' para 'CreateStoreInput' para bater com o StoreForm
  async function handleUpdate(formData: CreateStoreInput) {
    try {
      if (!id) return;

      // Enviamos apenas os dados do formulário para o serviço de atualização
      await updateStore(Number(id), formData);
      alert("Sebo atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar sebo.");
    }
  }

  if (loading) {
    return <p className="text-gray-500 animate-pulse">Carregando configurações...</p>;
  }

  if (!store) {
    return (
      <div className="bg-white p-6 rounded-xl border text-center text-gray-500 shadow-sm">
        Sebo não encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Configurações do Sebo
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Atualize os dados do estabelecimento.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <StoreForm
          initialData={store}
          onSubmit={handleUpdate} // 🟢 Agora o TypeScript aceitará sem erros!
        />
      </div>
    </div>
  );
}