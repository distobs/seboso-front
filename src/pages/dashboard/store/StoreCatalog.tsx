import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Pencil, Trash2, Plus, Package } from "lucide-react";
import { listCatalogByStore, removeFromCatalog } from "../../../services/book.service";
import type { CatalogItem } from "../../../types/catalog";

export default function StoreCatalog() {
  const { id } = useParams<{ id: string }>();

  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCatalog() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await listCatalogByStore(Number(id));
        setCatalog(data);
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCatalog();
  }, [id]);

  // Função para deletar um item do estoque
  async function handleDelete(bookId: number) {
    if (!id) return;

    const confirmed = window.confirm("Remover livro do catálogo?");
    if (!confirmed) return;

    try {
      await removeFromCatalog(Number(id), bookId);

      // Atualiza o estado local removendo o item deletado instantaneamente
      setCatalog((prev) => prev.filter((item) => item.book_id !== bookId));
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
        <div className="h-16 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Catálogo do Sebo</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {catalog.length} {catalog.length === 1 ? "livro cadastrado" : "livros cadastrados"}
          </p>
        </div>

        <Link
          to={`/dashboard/stores/${id}/catalog/create`}
          className="flex items-center gap-2 bg-[#C37351] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#A85F42] shadow-sm transition-colors"
        >
          <Plus size={18} />
          Adicionar Livro
        </Link>
      </div>

      {/* Lista do Estoque */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {catalog.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
            <Package size={28} className="text-gray-300 mb-2" />
            <p className="font-medium text-gray-700">Nenhum livro encontrado</p>
            <p className="text-xs text-gray-400 mt-0.5">Este sebo ainda não possui itens no estoque.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {catalog.map((item) => (
              <div
                key={item.book_id}
                className="flex justify-between items-center p-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <h2 className="font-semibold text-gray-900">
                    Livro <span className="font-mono text-gray-500 text-sm">#{item.book_id}</span>
                  </h2>
                  <p className="text-xs text-gray-500">
                    Quantidade: <span className="font-semibold text-gray-700">{item.quantity} un</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Preço: <span className="font-bold text-[#C37351]">R$ {item.price.toFixed(2)}</span>
                  </p>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/stores/${id}/catalog/${item.book_id}/edit`}
                    className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-[#C37351] hover:bg-orange-50 hover:border-transparent transition-all"
                    title="Editar item"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(item.book_id)}
                    className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-transparent transition-all"
                    title="Remover item"
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