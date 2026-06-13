import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStores, deleteStore } from "../../../services/store.service";
import type { Store } from "../../../types/store";
import { Pencil, Trash2, Store as StoreIcon } from "lucide-react";

export default function StoresList() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

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

  async function handleDelete(storeId: number) {
    const confirmed = window.confirm(
      "Deseja realmente excluir este sebo?"
    );

    if (!confirmed) return;

    try {
      await deleteStore(storeId);

      setStores((current) =>
        current.filter((store) => store.id !== storeId)
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadStores();
  }, []);

  if (loading) {
    return <p>Carregando sebos...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Gerenciar Sebos
        </h1>

        <Link
          to="/dashboard/stores/create"
          className="
            bg-[#C37351]
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-[#A85F42]
          "
        >
          Novo Sebo
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {stores.length === 0 ? (
          <p className="p-4 text-gray-500">
            Nenhum sebo encontrado.
          </p>
        ) : (
          stores.map((store) => (
            <div
              key={store.id}
              className="
                flex
                justify-between
                items-center
                p-4
                border-b
                border-gray-100
              "
            >
              <div>
                <h2 className="font-semibold">
                  {store.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {store.city} - {store.state}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/dashboard/stores/${store.id}`}
                  className="
                    flex items-center justify-center
                    w-9 h-9
                    rounded-lg
                    border border-gray-200
                    hover:border-blue-500
                    hover:text-blue-500
                  "
                  title="Dashboard do Sebo"
                >
                  <StoreIcon size={16} />
                </Link>

                <Link
                  to={`/dashboard/stores/${store.id}/edit`}
                  className="
                    flex items-center justify-center
                    w-9 h-9
                    rounded-lg
                    border border-gray-200
                    hover:border-[#C37351]
                    hover:text-[#C37351]
                  "
                  title="Editar"
                >
                  <Pencil size={16} />
                </Link>

                <button
                  onClick={() => handleDelete(store.id)}
                  className="
                    flex items-center justify-center
                    w-9 h-9
                    rounded-lg
                    border border-gray-200
                    hover:border-red-500
                    hover:text-red-600
                  "
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}