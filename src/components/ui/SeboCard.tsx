import type { Store } from "../../types/store" // Importa o tipo Store para tipar as props do componente

// Componente para exibir as informações de um sebo
type Props = {
    store: Store;
}
    
export default function SeboCard({ store }: Props) {
    return (
        <div className="bg-white rounded-lg border border-[#E5E5E5] px-6 py-4 flex cursor-pointer justify-between items-center hover:shadow-md transition">
            
            {/*Nome do sebo*/}
            <div className="w-1/4 font-medium text-[#2f2a28]">
                {store.name}
            </div>

            {/*Estado*/}
            <div className="w-1/4 text-[#6b6b6b]">
                {store.state}
            </div>

            {/* Cidade */}
            <div className="w-1/5 text-gray-600">
                {store.city}
            </div>

            {/*Data*/}
            <div className="w-1/5 text-gray-500 text-sm">
                {store.createdAt}
            </div>

            {/* Avaliação */}
            <div className="w-1/5 text-sm">
                {store.rating ? (
                <span className="text-green-600 font-semibold">
            👍 {store.rating}% recomendam
                </span>
            ) : (
                <span className="text-gray-400">
                    Ainda não há recomendações
                </span>
                )}
            </div>

        </div>
    );
}