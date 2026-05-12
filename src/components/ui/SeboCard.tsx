import type { Store } from "../../types/store";

// Componente para exibir as informações de um sebo
type Props = {
    store: Store;
}
    
export default function SeboCard({ store }: Props) {
    return (
        <div className="bg-white rounded-lg border border-[#E5E5E5] px-6 py-4 flex justify-between items-center hover:shadow-md transition">
            
            {/* Lado Esquerdo: Nome e Endereço Básico */}
            <div className="w-1/2">
                <div className="font-medium text-[#2f2a28] text-lg">
                    {store.name}
                </div>
                <p className="text-gray-500 mt-1">
                    {store.street}, {store.number}
                </p>
                <p className="text-gray-500">
                    {store.city_block}
                </p>
            </div>

            {/* Lado Direito: Cidade e CEP */}
            <div className="text-right">
                <p className="font-medium">
                    {store.city} - {store.state}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    CEP: {store.cep}
                </p>
            </div>

        </div>
    );
}