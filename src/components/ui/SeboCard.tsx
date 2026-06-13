import { Link } from "react-router-dom";

import type { Store } from "../../types/store";

type Props = {
  store: Store;
};

export default function SeboCard({ store }: Props) {
  return (
    <Link
      to={`/stores/${store.id}`}
      className="
        block
        bg-white
        rounded-xl
        border
        border-gray-200
        p-5
        transition-all
        hover:shadow-lg
        hover:border-[#C37351]
        hover:-translate-y-1
      "
    >
      <div className="flex justify-between items-start">

        {/* Informações principais */}
        <div className="space-y-2">

          <h2
            className="
              text-lg
              font-semibold
              text-[#2F2A28]
            "
          >
            {store.name}
          </h2>

          <div className="text-sm text-gray-500">

            <p>
              {store.street}, {store.number}
            </p>

            <p>
              {store.city_block}
            </p>

          </div>

        </div>

        {/* Cidade */}
        <div className="text-right">

          <p className="font-medium text-gray-700">
            {store.city}
          </p>

          <p className="text-sm text-gray-500">
            {store.state}
          </p>

        </div>

      </div>

      {/* Rodapé */}
      <div
        className="
          mt-4
          pt-4
          border-t
          border-gray-100
          flex
          justify-between
          items-center
        "
      >

        <span className="text-sm text-gray-500">
          CEP: {store.cep}
        </span>

        <span
          className="
            text-sm
            font-medium
            text-[#C37351]
          "
        >
          Ver sebo →
        </span>

      </div>
    </Link>
  );
}