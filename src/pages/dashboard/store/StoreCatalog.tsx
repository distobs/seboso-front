import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Pencil, Trash2, Plus } from "lucide-react";

import {
  listCatalogByStore,
  removeFromCatalog,
} from "../../../services/book.service";

import type { CatalogItem } from "../../../types/catalog";

export default function StoreCatalog() {
  const { id } = useParams();

  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCatalog();
  }, [id]);

  async function loadCatalog() {
    try {
      if (!id) return;

      const data = await listCatalogByStore(Number(id));

      setCatalog(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(bookId: number) {
    if (!id) return;

    const confirmed = window.confirm(
      "Remover livro do catálogo?"
    );

    if (!confirmed) return;

    try {
      await removeFromCatalog(
        Number(id),
        bookId
      );

      setCatalog((prev) =>
        prev.filter(
          (item) => item.book_id !== bookId
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <p>Carregando catálogo...</p>;
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Catálogo do Sebo
          </h1>

          <p className="text-gray-500">
            {catalog.length} livros cadastrados
          </p>
        </div>

        <Link
          to={`/dashboard/stores/${id}/catalog/create`}
          className="
            flex items-center gap-2
            bg-[#C37351]
            text-white
            px-4 py-2
            rounded-lg
            hover:bg-[#A85F42]
          "
        >
          <Plus size={18} />
          Adicionar Livro
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {catalog.length === 0 ? (
          <p className="p-4 text-gray-500">
            Nenhum livro encontrado.
          </p>
        ) : (
          catalog.map((item) => (
            <div
              key={item.book_id}
              className="
                flex justify-between
                items-center
                p-4
                border-b
              "
            >
              <div>
                <h2 className="font-semibold">
                  Livro #{item.book_id}
                </h2>

                <p className="text-sm text-gray-500">
                  Quantidade: {item.quantity}
                </p>

                <p className="text-sm text-gray-500">
                  R$ {item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-2">

                <Link
                  to={`/dashboard/stores/${id}/catalog/${item.book_id}/edit`}
                  className="
                    p-2 rounded-lg
                    border border-gray-200
                    hover:text-[#C37351]
                  "
                >
                  <Pencil size={18} />
                </Link>

                <button
                  onClick={() =>
                    handleDelete(item.book_id)
                  }
                  className="
                    p-2 rounded-lg
                    border border-gray-200
                    hover:text-red-600
                  "
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}