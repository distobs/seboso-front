import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
  BookOpen,
  Users,
  Settings,
  MapPin,
  Landmark,
  ArrowLeft,
  Building2,
} from "lucide-react";

import { getStoreById } from "../../../services/store.service";
import type { Store } from "../../../types/store";

export default function StoreDashboard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    async function loadStore() {
      try {
        if (!id) return;
        const data = await getStoreById(Number(id));
        setStore(data);
      } catch (error) {
        console.error("Erro ao carregar painel do sebo:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, [id]);

  // Renderizações condicionais para estados de carregamento e erro
  if (loading) {
    return (
      <div className="w-full max-w-full px-4 lg:px-8 space-y-6 animate-pulse">
        <div className="h-32 bg-gray-100 rounded-2xl w-full" />
        <div className="h-44 bg-gray-100 rounded-2xl w-full" />
        <div className="grid md:grid-cols-3 gap-4">
          <div className="h-32 bg-gray-50 rounded-2xl" />
          <div className="h-32 bg-gray-50 rounded-2xl" />
          <div className="h-32 bg-gray-50 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Se o sebo não for encontrado, mostramos uma mensagem amigável e um botão para voltar
  if (!store) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <Building2 className="mx-auto text-gray-300 mb-3" size={40} />
        <h2 className="text-xl font-bold text-gray-800">
          Estabelecimento não localizado
        </h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">
          Não encontramos o sebo solicitado na base de dados ativa do painel.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-[#C37351] hover:bg-[#A85F42] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full px-4 lg:px-8 space-y-6">
      {/* Botão sutil de retorno ao topo do painel se aplicável */}
      <button
        onClick={() => navigate("/dashboard")}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
      >
        <ArrowLeft size={14} /> Voltar para visão geral
      </button>

      {/* 1. Header do Sebo (Cartão Principal) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-orange-50 text-[#C37351] rounded-xl">
              <Building2 size={20} />
            </span>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {store.name}
            </h1>
          </div>
          <p className="text-sm font-medium text-gray-400 flex items-center gap-1.5 pl-11">
            <MapPin size={14} className="text-gray-300" />
            {store.city} — {store.state}
          </p>
        </div>

        <div className="text-xs font-mono bg-gray-50 text-gray-500 px-3 py-2 rounded-xl border border-gray-100 md:self-center self-start pl-4">
          <span className="font-sans font-bold text-gray-400 block uppercase tracking-wide text-[9px] mb-0.5">
            Identificador CNPJ
          </span>
          {store.cnpj || "Isento / Não Informado"}
        </div>
      </div>

      {/* 2. Grid de Localização e Infraestrutura */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Landmark size={16} className="text-gray-400" />
          Endereço Fiscal e Operacional
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/60">
            <span className="text-[10px] font-bold text-gray-400 uppercase block tracking-wider">
              Logradouro / Número
            </span>
            <p
              className="text-sm font-semibold text-gray-700 mt-1 truncate"
              title={`${store.street}, ${store.number}`}
            >
              {store.street || "—"}, {store.number || "S/N"}
            </p>
          </div>

          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/60">
            <span className="text-[10px] font-bold text-gray-400 uppercase block tracking-wider">
              Bairro / Região
            </span>
            <p className="text-sm font-semibold text-gray-700 mt-1 truncate">
              {store.city_block || "—"}
            </p>
          </div>

          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/60">
            <span className="text-[10px] font-bold text-gray-400 uppercase block tracking-wider">
              Código Postal (CEP)
            </span>
            <p className="text-sm font-mono font-semibold text-gray-700 mt-1">
              {store.cep || "—"}
            </p>
          </div>

          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/60">
            <span className="text-[10px] font-bold text-gray-400 uppercase block tracking-wider">
              Localidade
            </span>
            <p className="text-sm font-semibold text-gray-700 mt-1 truncate">
              {store.city} / {store.state}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Atalhos Rápidos de Gerenciamento (Módulos) */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
          Acesso aos Módulos Internos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Módulo: Catálogo */}
          <Link
            to={`/dashboard/stores/${store.id}/catalog`}
            className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-xs hover:border-[#C37351] hover:shadow-md hover:shadow-orange-50/40 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#C37351] mb-4 group-hover:bg-[#C37351] group-hover:text-white transition-colors">
              <BookOpen size={18} />
            </div>
            <h3 className="font-bold text-gray-800 text-base group-hover:text-[#C37351] transition-colors">
              Catálogo de Livros
            </h3>
            <p className="text-xs font-medium text-gray-400 mt-1">
              Gerencie os acervos disponíveis, altere preços e adicione novos
              exemplares físicos.
            </p>
          </Link>

          {/* Módulo: Funcionários */}
          <Link
            to={`/dashboard/stores/${store.id}/employees`}
            className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-xs hover:border-[#C37351] hover:shadow-md hover:shadow-orange-50/40 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#C37351] mb-4 group-hover:bg-[#C37351] group-hover:text-white transition-colors">
              <Users size={18} />
            </div>
            <h3 className="font-bold text-gray-800 text-base group-hover:text-[#C37351] transition-colors">
              Funcionários e Equipe
            </h3>
            <p className="text-xs font-medium text-gray-400 mt-1">
              Controle permissões de acesso ao caixa, adicione colaboradores ou
              gerencie administradores.
            </p>
          </Link>

          {/* Módulo: Configurações */}
          <Link
            to={`/dashboard/stores/${store.id}/settings`}
            className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-xs hover:border-[#C37351] hover:shadow-md hover:shadow-orange-50/40 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#C37351] mb-4 group-hover:bg-[#C37351] group-hover:text-white transition-colors">
              <Settings size={18} />
            </div>
            <h3 className="font-bold text-gray-800 text-base group-hover:text-[#C37351] transition-colors">
              Dados do Sebo
            </h3>
            <p className="text-xs font-medium text-gray-400 mt-1">
              Modifique informações de contato público, altere o endereço fiscal
              ou modifique o CNPJ da filial.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
