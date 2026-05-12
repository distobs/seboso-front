import type { Store } from "../../types/store";

type SeboCardProps = {
  store: Store;
};

export default function SeboCard({
  store,
}: SeboCardProps) {

  return (
    <div className="
      bg-white
      border
      border-gray-200
      rounded-xl
      p-5
      shadow-sm
      hover:shadow-md
      transition-shadow
    ">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-semibold text-[#2f2a28]">
            {store.name}
          </h2>

          <p className="text-gray-500 mt-1">
            {store.street}, {store.number}
          </p>

          <p className="text-gray-500">
            {store.city_block}
          </p>
        </div>

        <div className="text-right">
          <p className="font-medium">
            {store.city} - {store.state}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            CEP: {store.cep}
          </p>
        </div>

      </div>

    </div>
  );
}