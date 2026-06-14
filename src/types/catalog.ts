export interface CatalogItem {
  store_id: number;
  book_id: number;
  price: number;
  quantity: number;
  state: string; 
}

export type AddToCatalogInput = CatalogItem;

// Type para atualização, onde os campos são opcionais (exceto os identificadores)
export type UpdateCatalogInput = {
  store_id: number;
  book_id: number;
  price?: number;
  quantity?: number;
  state?: string;
};