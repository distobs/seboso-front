import { useEffect ,useState } from "react"; // Importa os hooks useEffect e useState do React para gerenciar o estado e os efeitos colaterais no componente Home
import { getStores } from "../../services/api"; // Importa a função getStores do serviço de API para buscar a lista de sebos
import SeboCard from "../../components/ui/SeboCard"; // Importa o componente SeboCard para exibir as informações de cada sebo na lista
import type { Store } from "../../types/store"; // Importa o tipo Store para tipar o estado dos sebos e as props do componente SeboCard

export default function Home() {

  // Lista de sebos
  const [stores, setStores] = useState<Store[]>([]);

  // Loading
  const [loading, setLoading] = useState(true);

  // Error
  const [error, setError] = useState("");

  useEffect(() => {

    async function fetchStores() {

      try {

        const data = await getStores();

        console.log("Sebos carregados:", data);

        setStores(data);

      } catch (err) {

        setError("Erro ao carregar sebos: " + (err instanceof Error ? err.message : String(err)));

      } finally {

        setLoading(false);

      }

    }

    fetchStores();

  }, []);

  // Loading
  if (loading) {
    return (
      <p>
        Carregando sebos...
      </p>
    );
  }

  // Error
  if (error) {
    return (
      <p>
        {error}
      </p>
    );
  }

  return (
     <>
    <h1 className="text-2xl font-semibold mb-6">
      Sebos e Livreiros
    </h1>

    <div className="flex flex-col gap-4">
      {stores.map((store) => (
        <SeboCard
          key={store.id}
          store={store}
        />
      ))}
    </div>
  </>
  );
}