import { useState, useEffect } from "react";
import SeboCard from "../../components/ui/SeboCard";
import type { Store } from "../../types/store";
import { getStores } from "../../services/store.service";
import { Store as StoreIcon, AlertCircle, RefreshCw } from "lucide-react";

export default function Home() {
  const [stores, setStores] = useState<Store[]>([]);
  
  // 1. 🟢 Inicializa o loading como true para evitar chamadas síncronas de setState no useEffect
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Função isolada para recarregar os dados caso ocorra uma falha
  async function handleRefresh() {
    setLoading(true);
    setError("");
    try {
      const data = await getStores();
      setStores(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar a lista de estabelecimentos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchStores() {
      try {
        const data = await getStores();
        if (isMounted) {
          setStores(data);
        }
      } catch (err) {
        console.error("Erro ao carregar sebos:", err);
        if (isMounted) {
          setError("Não foi possível carregar a lista de estabelecimentos.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchStores();

    return () => {
      isMounted = false; // Cleanup para evitar vazamento de memória em componentes desmontados
    };
  }, []);

  // 2. 🟢 Skeleton Loading fluido simulando a estrutura dos cartões de sebo
  if (loading) {
    return (
      <div className="w-full space-y-6 animate-pulse">
        <div className="h-8 bg-gray-100 rounded-xl w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="h-44 bg-gray-100 rounded-2xl" />
          <div className="h-44 bg-gray-100 rounded-2xl" />
          <div className="h-44 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  // 3. 🟢 Estado de Erro Amigável com opção de re-tentativa
  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-xs">
        <AlertCircle className="mx-auto text-red-400 mb-3" size={40} />
        <h2 className="text-lg font-bold text-gray-800">Falha na conexão</h2>
        <p className="text-gray-500 text-xs mt-1 mb-6">{error}</p>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#C37351] hover:bg-[#A85F42] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          <RefreshCw size={14} /> Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      
      {/* Cabeçalho da Página Inicial */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-50 text-[#C37351] rounded-xl">
            <StoreIcon size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Sebos e Livreiros Parceiros
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Explore os estabelecimentos físicos integrados à nossa rede e seus acervos
            </p>
          </div>
        </div>
        
        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 shrink-0">
          {stores.length} {stores.length === 1 ? "sebo ativo" : "sebos ativos"}
        </span>
      </div>

      {stores.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
          <StoreIcon className="mx-auto text-gray-300 mb-3" size={32} />
          <h3 className="font-semibold text-gray-800">Nenhum sebo localizado</h3>
          <p className="text-gray-400 text-xs mt-1">Não existem lojas cadastradas na plataforma no momento.</p>
        </div>
      ) : (
        /* 4. 🟢 Substituição do flex-col por um Grid Moderno e Responsivo */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stores.map((store) => (
            <SeboCard key={store.id} store={store} />
          ))}
        </div>
      )}
      
    </div>
  );
}