import type { CatalogItem } from "../../types/catalog";
import CatalogBookCard from "./CatalogBookCard";

type Props = {
  catalog: CatalogItem[];
};

export default function StoreCatalogList({ catalog }: Props) {
  if (catalog.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <p className="text-gray-500">Nenhum livro disponível neste sebo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {catalog.map((item, index) => (
        <CatalogBookCard
          key={`${item.store_id}-${item.book_id}-${index}`}
          item={item}
        />
      ))}
    </div>
  );
}
