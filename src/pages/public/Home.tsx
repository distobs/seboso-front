import { useState } from "react"; // Importa o hook useState para gerenciar o estado do componente
import SeboCard from "../../components/ui/SeboCard"; // Importa o componente SeboCard para exibir as informações de cada sebo na lista
import type { Store } from "../../types/store"; // Importa o tipo Store para tipar o estado dos sebos e as props do componente SeboCard

export default function Home() {

  const [stores] = useState<Store[]>([
    {
      id: 1,
      name: "Sebo Maria Vida",
      state: "SC",
      city: "Palhoça",
      createdAt: "18/11/2014",
      rating: 100
    },
    {
      id: 2,
      name: "IKO",
      state: "SP",
      city: "São Paulo",
      createdAt: "10/02/2014"
    },
    {
      id: 3,
      name: "Sebo do Zé",
      state: "RS",
      city: "Porto Alegre",
      createdAt: "05/08/2015",
      rating: 85
    },
    {
      id: 4,
      name: "Sebo do João",
      state: "MG",
      city: "Belo Horizonte",
      createdAt: "12/05/2016",
      rating: 20
    }

  ]);

  const [filtered, setFiltered] = useState(stores);

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">
        Sebos e Livreiros
      </h1>

      {/* Cabeçalho das colunas */}
      <div className="flex justify-between text-sm text-gray-500 mb-2 px-2">
        <span className="w-1/4">Sebos e livreiros</span>
        <span className="w-1/6">Estado</span>
        <span className="w-1/5">Cidade</span>
        <span className="w-1/5">Membro desde</span>
        <span className="w-1/5">Avaliação</span>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-2">
        {filtered.map((store) => (
          <SeboCard key={store.id} store={store} />
        ))}
      </div>
    </>
  );
}