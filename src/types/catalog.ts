export interface CatalogItem {
  store_id: number;
  book_id: number;
  price: number;
  quantity: number;
  description: string; // Mapeado a partir do "description" da tabela catalog
}