import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";

import { 
  listCatalogByStore, 
  addToCatalog, 
  updateCatalog, 
  removeFromCatalog 
} from "../../../services/book.service";

import type { CatalogItem, UpdateCatalogInput, AddToCatalogInput } from "../../../types/catalog";

import CatalogTable from "../../../components/catalog/CatalogTable";
import CatalogForm from "../../../components/catalog/CatalogForm";

export default function StoreCatalog() {
  const { id } = useParams<{ id: string }>();
  const storeId = Number(id);

  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  async function fetchCatalogData() {
    if (!storeId) return;
    try {
      const data = await listCatalogByStore(storeId);
      setCatalog(data);
    } catch (error) {
      console.error("Erro ao carregar catálogo:", error);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      if (!storeId) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        if (isMounted) setLoading(true);
        const data = await listCatalogByStore(storeId);
        
        if (isMounted) {
          setCatalog(data);
        }
      } catch (error) {
        console.error("Erro no efeito de carga do catálogo:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initialize();

    return () => {
      isMounted = false;
    };
  }, [storeId]);

  async function handleFormSubmit(payload: CatalogItem | UpdateCatalogInput | AddToCatalogInput) {
    try {
      setSubmitting(true);

      const data = payload as Record<string, unknown>;
      const rawBookId = Number(data.book_id ?? data.bookId);

      if (!editingItem) {
        const bookAlreadyExists = catalog.some(item => Number(item.book_id) === rawBookId);
        
        if (bookAlreadyExists) {
          alert(`O livro de ID #${rawBookId} já está cadastrado no seu acervo. Use a opção de editar para alterar o preço ou a quantidade.`);
          setSubmitting(false);
          return;
        }
      }

      const rawQuantity = data.quantity;
      const rawPrice = data.price;
      const rawState = data.state ?? data.description ?? data.status;

      if (!rawBookId || rawQuantity === undefined || rawPrice === undefined) {
        throw new Error("Campos obrigatórios (book_id, quantity, price) estão ausentes ou inválidos.");
      }

      const formattedPayload = {
        store_id: Number(storeId),
        book_id: rawBookId,
        quantity: Number(rawQuantity),
        price: Number(rawPrice), // Envia o valor exato do input (ex: 12)
        state: String(rawState || "").trim(),
      };

      if (editingItem) {
        await updateCatalog(formattedPayload);
      } else {
        await addToCatalog(formattedPayload);
      }
      
      setEditingItem(null);
      setIsFormOpen(false);
      
      await fetchCatalogData();
    } catch (error) {
      console.error("Erro detalhado na submissão:", error);
      alert("Não foi possível salvar o livro no catálogo. Verifique se os dados estão corretos.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(targetStoreId: number, bookId: number) {
    const confirmed = window.confirm("Tem certeza que deseja remover este exemplar do seu acervo?");
    if (!confirmed) return;

    try {
      await removeFromCatalog(targetStoreId, bookId);
      setCatalog((prev) => prev.filter((item) => !(item.store_id === targetStoreId && item.book_id === bookId)));
    } catch (error) {
      console.error("Erro ao remover item:", error);
      alert("Não foi possível excluir o item do catálogo.");
    }
  }

  function handleEditClick(item: CatalogItem) {
      const rawData = item as CatalogItem & { description?: string };

      const normalizedItem: CatalogItem = {
        ...item,
        price: item.price,
        state: item.state || rawData.description || ""
      };
      
      setEditingItem(normalizedItem);
      setIsFormOpen(true);
    }

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse p-6">
        <div className="h-8 bg-gray-200 rounded-xl w-1/4" />
        <div className="h-48 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {isFormOpen && (
            <button
              onClick={() => { setIsFormOpen(false); setEditingItem(null); }}
              className="p-2 bg-white border border-gray-200 text-gray-500 rounded-xl hover:text-gray-700 transition-all"
              title="Voltar para a listagem"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {isFormOpen ? (editingItem ? "Editar Oferta" : "Nova Oferta") : "Gerenciar Acervo local"}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">
              {isFormOpen 
                ? "Preencha as informações físicas do exemplar comercializado" 
                : `${catalog.length} ${catalog.length === 1 ? "título vinculado" : "títulos vinculados"} no estoque`}
            </p>
          </div>
        </div>

        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 bg-[#C37351] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#A85F42] active:scale-[0.98] shadow-xs transition-all"
          >
            <Plus size={16} />
            Vincular Livro
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="max-w-4xl">
          <CatalogForm 
            storeId={storeId}
            initialData={editingItem || undefined}
            onSubmit={handleFormSubmit}
            submitting={submitting}
          />
        </div>
      ) : (
        <CatalogTable 
          items={catalog}
          onEdit={handleEditClick}
          onRemove={handleDelete}
          showStoreColumn={false}
        />
      )}
    </div>
  );
}
