import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getStoreById } from "../../../services/store.service";
import { getBookById } from "../../../services/book.service";
import { listCatalogByStore } from "../../../services/book.service";

import type { Store } from "../../../types/store";
import type { CatalogItem } from "../../../types/catalog";
import type { Book } from "../../../types/book";

import StoreInfoCard from "../../../components/store/StoreInfoCard";
import BookCard from "../../../components/ui/BookCard"; // Importado o componente unificado
import {
  BookOpen,
  ArrowLeft,
  Store as StoreIcon,
} from "lucide-react";

// Tipo local estendido para acoplar os detalhes do livro que vão chegar da API externa
interface CatalogItemWithBook extends CatalogItem {
  bookDetails?: Book;
}

export default function StoreDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [store, setStore] = useState<Store | null>(null);
  const [catalog, setCatalog] = useState<CatalogItemWithBook[]>([]);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    async function loadData() {
      if (!id) {
        return;
      }

      try {
        // Busca os dados do sebo e do catálogo em paralelo para otimizar o tempo de carregamento
        const [storeData, catalogData] = await Promise.all([
          getStoreById(Number(id)),
          listCatalogByStore(Number(id)),
        ]);

        // Para cada item do catálogo, buscamos os detalhes do livro correspondente.
        const booksPromises = catalogData.map((item) =>
          getBookById(item.book_id)
            .then((bookData) => ({ ...item, bookDetails: bookData }))
            .catch((err) => {
              console.error(`Erro ao buscar livro ${item.book_id}:`, err);
              return { ...item, bookDetails: undefined }; // Caso um livro falhe, o app não quebra
            }),
        );

        // Aguarda a resolução de todos os detalhes dos livros em paralelo
        const catalogWithBooks = await Promise.all(booksPromises);

        setStore(storeData);
        setCatalog(catalogWithBooks);
      } catch (error) {
        console.error("Erro ao carregar o catálogo do sebo:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full px-8 py-8 animate-pulse">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          <div className="h-96 bg-gray-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded-2xl" />
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="h-72 bg-gray-200 rounded-2xl" />
              <div className="h-72 bg-gray-200 rounded-2xl" />
              <div className="h-72 bg-gray-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-2xl border shadow-sm">
        <StoreIcon className="mx-auto text-gray-300 mb-3" size={40} />
        <h2 className="text-xl font-bold text-gray-800">Sebo não encontrado</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-[#C37351] font-semibold underline cursor-pointer"
        >
          Voltar para a página anterior
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50/50 to-white pb-16">
      {/* Banner Superior */}
      <div className="bg-[#C37351]/10 border-b border-[#C37351]/5 py-4">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#A85F42] hover:text-[#C37351] bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md cursor-pointer"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 mt-6">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start">
          {/* Coluna da Esquerda: Dados do Sebo */}
          <div className="sticky top-6">
            <StoreInfoCard store={store} booksCount={catalog.length} />
          </div>

          {/* Coluna da Direita: Catálogo Expandido */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-50 text-[#C37351] rounded-xl">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Catálogo Disponível
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Explore os acervos e exemplares físicos
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                {catalog.length}{" "}
                {catalog.length === 1
                  ? "livro encontrado"
                  : "livros encontrados"}
              </span>
            </div>

            {catalog.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
                <BookOpen className="mx-auto text-gray-300 mb-3" size={32} />
                <h3 className="font-semibold text-gray-800">
                  Acervo em atualização
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {catalog.map((item) => {
                  // Constrói um objeto do tipo Book seguro caso a API paralela falhe ou atrase
                  const fallbackBook: Book = item.bookDetails ?? {
                    id: item.book_id,
                    title: `Livro #${item.book_id}`,
                    author: "Autor não informado",
                    description: null,
                    published_at: null,
                    isbn_10_code: null,
                    isbn_13_code: null,
                    cover_type: null,
                    cover_url: null,
                    edition: null,
                    language: null,
                    genre: null,
                    publisher: null,
                    pages: null,
                    dimensions: null,
                    created_at: "",
                    updated_at: "",
                  };

                  return (
                    <BookCard
                      key={`${item.store_id}-${item.book_id}`}
                      book={fallbackBook}
                      catalogPrice={item.price} // Removeu a divisão / 100 antiga daqui
                      catalogQuantity={item.quantity}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}