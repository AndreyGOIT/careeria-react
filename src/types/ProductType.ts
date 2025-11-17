// src/types/ProductType.ts
export type Product = {
  productId: number;
  productName: string;
  supplierId: number;
  categoryId: number;
  quantityPerUnit: string;
  unitPrice: number;
  unitsInStock: number;
  unitsOnOrder: number;
  reorderLevel: number;
    discontinued: boolean;
    imageLink: string | null;
};