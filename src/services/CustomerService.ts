import api from "./api";

export interface Customer {
  customerId: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  region: string | null;
  postalCode: string;
  country: string;
  phone: string;
  fax: string | null;
}

// Fetch all customers
const getAll = async () => {
  const response = await api.get("/Customers");
  return response.data;
};

// Create a new customer
const create = async (newCustomer: Customer) => {
  const response = await api.post("/Customers", newCustomer);
  return response.data;
};

// Edit an existing customer
const update = async (customerId: string, updatedCustomer: Customer) => {
  const response = await api.put(`/Customers/${customerId}`, updatedCustomer);
  return response.data;
};

// Delete a customer by ID
const remove = async (customerId: string) => {
  const response = await api.delete(`/Customers/${customerId}`);
  return response.data;
};

export default { getAll, create, update, remove };
