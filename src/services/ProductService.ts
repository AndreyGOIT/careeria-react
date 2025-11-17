import api from "./api";

export interface Product {
  productId: number;
  productName: string;
  supplierId: number | null;
  categoryId: number | null;
  quantityPerUnit: string | null;
  unitPrice: number | null;
  unitsInStock: number | null;
  unitsOnOrder: number | null;
  reorderLevel: number | null;
    discontinued: boolean;
    imageLink: string | null;
}

// Fetch all products
const getAll = async () => {
  const response = await api.get("/Products");
  return response.data;
};

// Create a new product
const create = async (newProduct: Omit<Product, "productId">) => {
  const response = await api.post("/Products", newProduct);
  return response.data;
};

// Edit an existing product
const update = async (productId: number, updatedProduct: Product) => {
  const response = await api.put(`/Products/${productId}`, updatedProduct);
  return response.data;
};

// Delete a product by ID
const remove = async (productId: number) => {
  const response = await api.delete(`/Products/${productId}`);
  return response.data;
};

export default { getAll, create, update, remove };