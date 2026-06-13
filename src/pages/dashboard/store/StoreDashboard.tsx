import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { BookOpen, Users, Settings } from "lucide-react";

import { getStoreById } from "../../../services/store.service";

import type { Store } from "../../../types/store";

export default function StoreDashboard() {
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
        console.error(error);
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
    <div className="space-y-6">

      {/* Cabeçalho */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold">
          {store.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {store.city} - {store.state}
        </p>
      </div>

      {/* Informações */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">
          Informações
        </h2>

        <div className="space-y-2">
          <p>
            <strong>CNPJ:</strong> {store.cnpj}
          </p>

          <p>
            <strong>Endereço:</strong>{" "}
            {store.street}, {store.number}
          </p>

          <p>
            <strong>Bairro:</strong>{" "}
            {store.city_block}
          </p>

          <p>
            <strong>CEP:</strong> {store.cep}
          </p>
        </div>
      </div>

      {/* Módulos */}
      <div className="grid md:grid-cols-3 gap-4">

        <Link
          to={`/dashboard/stores/${store.id}/catalog`}
          className="
            bg-white
            shadow
            rounded-xl
            p-6
            hover:shadow-lg
            transition
          "
        >
          <BookOpen className="mb-3" />

          <h2 className="font-semibold">
            Catálogo
          </h2>

          <p className="text-sm text-gray-500">
            Gerenciar livros do sebo
          </p>
        </Link>

        <Link
          to={`/dashboard/stores/${store.id}/employees`}
          className="
            bg-white
            shadow
            rounded-xl
            p-6
            hover:shadow-lg
            transition
          "
        >
          <Users className="mb-3" />

          <h2 className="font-semibold">
            Funcionários
          </h2>

          <p className="text-sm text-gray-500">
            Gerenciar equipe
          </p>
        </Link>

        <Link
          to={`/dashboard/stores/${store.id}/settings`}
          className="
            bg-white
            shadow
            rounded-xl
            p-6
            hover:shadow-lg
            transition
          "
        >
          <Settings className="mb-3" />

          <h2 className="font-semibold">
            Configurações
          </h2>

          <p className="text-sm text-gray-500">
            Dados do estabelecimento
          </p>
        </Link>

      </div>
    </div>
  );
}