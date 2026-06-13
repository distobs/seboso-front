import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getStoreById } from "../../../services/store.service";

import type { Store } from "../../../types/store";

export default function StoreDetails() {
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
        console.error("Erro ao carregar sebo:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, [id]);

  if (loading) {
    return <p>Carregando sebo...</p>;
  }

  if (!store) {
    return <p>Sebo não encontrado.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Cabeçalho */}
      <section className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold">
          {store.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {store.city} - {store.state}
        </p>
      </section>

      {/* Informações */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Informações do Sebo
        </h2>

        <div className="space-y-2">

          <p>
            <strong>Rua:</strong> {store.street}
          </p>

          <p>
            <strong>Número:</strong> {store.number}
          </p>

          <p>
            <strong>Bairro:</strong> {store.city_block}
          </p>

          <p>
            <strong>CEP:</strong> {store.cep}
          </p>

          <p>
            <strong>Cidade:</strong> {store.city}
          </p>

          <p>
            <strong>Estado:</strong> {store.state}
          </p>

          <p>
            <strong>CNPJ:</strong> {store.cnpj}
          </p>

        </div>
      </section>

      {/* Ações */}
      <section className="flex gap-3">

        <Link
          to={`/stores/${store.id}/catalog`}
          className="
            px-5
            py-2
            rounded-lg
            bg-[#C37351]
            text-white
            hover:bg-[#A85F42]
          "
        >
          Ver Catálogo
        </Link>

      </section>

    </div>
  );
}