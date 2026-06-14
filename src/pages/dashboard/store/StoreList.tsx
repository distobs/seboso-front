import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getStores, deleteStore } from "../../../services/store.service";
import type { Store } from "../../../types/store";
import {Pencil,Trash2,Store as StoreIcon,Plus,MapPin,AlertTriangle } from "lucide-react";

export default function StoresList() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado e referência para gerenciar o modal customizado de exclusão
  const [storeToDelete, setStoreToDelete] = useState<number | null>(null);
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    async function loadStores() {
      try {
        const data = await getStores();
        setStores(data);
      } catch (error) {
        console.error("Erro ao carregar sebos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStores();
  }, []);

  // Abre o modal de confirmação seguro
  function confirmDelete(id: number) {
    setStoreToDelete(id);
    deleteModalRef.current?.showModal();
  }

  // Fecha o modal limpando o estado de exclusão
  function closeModal() {
    deleteModalRef.current?.close();
    setStoreToDelete(null);
  }

  // Executa a exclusão de fato ao confirmar no modal
  async function handleDelete() {
    if (!storeToDelete) return;

    try {
      await deleteStore(storeToDelete);
      setStores((current) =>
        current.filter((store) => store.id !== storeToDelete),
      );
    } catch (error) {
      console.error("Erro ao deletar sebo:", error);
      alert(
        "Não foi possível excluir o sebo. Verifique se ele possui livros vinculados.",
      );
    } finally {
      closeModal();
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2 w-1/3">
            <div className="h-7 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-lg w-1/2 animate-pulse" />
          </div>
          <div className="h-10 bg-gray-200 rounded-xl w-32 animate-pulse" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden shadow-sm">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="p-5 flex justify-between items-center animate-pulse"
            >
              <div className="flex items-center gap-4 w-1/2">
                <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded-md w-2/3" />
                  <div className="h-3 bg-gray-200 rounded-md w-1/3" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-9 h-9 bg-gray-200 rounded-xl" />
                <div className="w-9 h-9 bg-gray-200 rounded-xl" />
              </div>
            </div>
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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Gerenciar Sebos
          </h1>
          <p className="text-xs font-medium text-gray-500 mt-0.5">
            {stores.length}{" "}
            {stores.length === 1 ? "sebo cadastrado" : "sebos cadastrados"} no
            ecossistema
          </p>
        </div>

        <Link
          to="/dashboard/stores/create"
          className="flex items-center gap-2 bg-[#C37351] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#A85F42] shadow-sm transition-colors"
        >
          <Plus size={16} strokeWidth={2.5} />
          Novo Sebo
        </Link>
      </div>

      {/* Listagem de Sebos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {stores.length === 0 ? (
          <div className="p-16 text-center text-gray-500 flex flex-col items-center justify-center max-w-sm mx-auto">
            <div className="p-4 bg-gray-50 rounded-2xl text-gray-300 mb-4 border border-gray-100">
              <StoreIcon size={32} />
            </div>
            <p className="font-bold text-gray-800 text-lg">
              Nenhum sebo cadastrado
            </p>
            <p className="text-sm text-gray-400 mt-1 mb-6 leading-relaxed">
              Você ainda não gerencia estabelecimentos. Crie seu primeiro ponto
              de venda agora mesmo.
            </p>
            <Link
              to="/dashboard/stores/create"
              className="inline-flex items-center gap-2 bg-orange-50 text-[#A85F42] px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-100 transition-colors"
            >
              <Plus size={14} strokeWidth={2.5} /> Cadastrar primeiro sebo
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {stores.map((store) => (
              <div
                key={store.id}
                className="flex justify-between items-center p-5 hover:bg-gray-50/50 transition-colors group"
              >
                {/* Identificação com ícone à esquerda */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 bg-orange-50/70 border border-orange-100 text-[#C37351] flex items-center justify-center rounded-xl shrink-0 group-hover:bg-[#C37351] group-hover:text-white transition-colors duration-300">
                    <StoreIcon size={18} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-gray-800 text-base truncate group-hover:text-[#C37351] transition-colors">
                      {store.name}
                    </h2>
                    <p className="text-xs font-semibold text-gray-400 mt-1 flex items-center gap-1">
                      <MapPin size={12} className="text-gray-300" />
                      {store.city} — {store.state}
                    </p>
                  </div>
                </div>

                {/* Bloco de Botões de Ação */}
                <div className="flex gap-2 shrink-0 ml-4">
                  <Link
                    to={`/dashboard/stores/${store.id}`}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all shadow-sm bg-white"
                    title="Acessar Vitrine / Dashboard Público"
                  >
                    <StoreIcon size={15} />
                  </Link>

                  <Link
                    to={`/dashboard/stores/${store.id}/edit`}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:border-[#C37351] hover:text-[#C37351] hover:bg-orange-50 transition-all shadow-sm bg-white"
                    title="Configurações do Sebo"
                  >
                    <Pencil size={15} />
                  </Link>

                  <button
                    onClick={() => confirmDelete(store.id)}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all shadow-sm bg-white"
                    title="Excluir Estabelecimento"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <dialog
        ref={deleteModalRef}
        onClose={closeModal}
        className="fixed inset-0 m-auto backdrop:bg-black/40 rounded-2xl border border-gray-100 p-6 shadow-xl max-w-sm w-full bg-white focus-visible:outline-none animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-red-50 text-red-500 rounded-2xl mb-4 border border-red-100">
            <AlertTriangle size={28} />
          </div>

          <h3 className="text-lg font-bold text-gray-900">
            Excluir estabelecimento?
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Esta ação é permanente. Todos os dados associados a este sebo serão
            removidos do catálogo de buscas públicas.
          </p>

          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-red-100"
            >
              Sim, Excluir
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
