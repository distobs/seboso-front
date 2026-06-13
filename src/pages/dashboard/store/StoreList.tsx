import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStores, deleteStore } from "../../../services/store.service";
import type { Store } from "../../../types/store";
import { Pencil, Trash2, Store as StoreIcon, Plus } from "lucide-react";

export default function StoresList() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStores() {
      try {
        setLoading(true);
        const data = await getStores();
        setStores(data);
      } catch (error) {
        console.error("Erro ao carregar sebos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStores();
  }, []); // Executa apenas uma vez, na montagem do componente

  // Função para deletar um sebo
  async function handleDelete(storeId: number) {
    const confirmed = window.confirm("Deseja realmente excluir este sebo?");
    if (!confirmed) return;

    try {
      await deleteStore(storeId);

      // Atualiza o estado removendo o item deletado instantaneamente sem recarregar a página
      setStores((current) => current.filter((store) => store.id !== storeId));
    } catch (error) {
      console.error("Erro ao deletar sebo:", error);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
        <div className="space-y-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciar Sebos</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {stores.length} {stores.length === 1 ? "sebo cadastrado" : "sebos cadastrados"} no sistema
          </p>
        </div>

        <Link
          to="/dashboard/stores/create"
          className="flex items-center gap-2 bg-[#C37351] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#A85F42] shadow-sm transition-colors"
        >
          <Plus size={16} />
          Novo Sebo
        </Link>
      </div>

      {/* Listagem de Sebos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {stores.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
            <StoreIcon size={28} className="text-gray-300 mb-2" />
            <p className="font-medium text-gray-700">Nenhum sebo encontrado</p>
            <p className="text-xs text-gray-400 mt-0.5">Não há estabelecimentos registrados até o momento.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {stores.map((store) => (
              <div
                key={store.id}
                className="flex justify-between items-center p-4 hover:bg-gray-50/50 transition-colors"
              >
                <div>
                  <h2 className="font-semibold text-gray-900">{store.name}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {store.city} - {store.state}
                  </p>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/stores/${store.id}`}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all"
                    title="Dashboard do Sebo"
                  >
                    <StoreIcon size={16} />
                  </Link>

                  <Link
                    to={`/dashboard/stores/${store.id}/edit`}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:border-[#C37351] hover:text-[#C37351] hover:bg-orange-50 transition-all"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(store.id)}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}