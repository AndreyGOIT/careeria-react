import axios from "axios";

const baseUrl = "http://localhost:5109/api/Customers";

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
// use: CustomerService.getAll().then(data => ...)
const getAll = () => {
  const requestOptions = axios.get(baseUrl);
  return requestOptions.then((response) => response.data);
};

// Create a new customer
// use: CustomerService.create(newCustomer).then(response => ...)
const create = (newCustomer: Customer) => {
  const requestOptions = axios.post(baseUrl, newCustomer, {
      headers: {
        "Content-Type": "application/json",
      },
    });

  return requestOptions.then((response) => response.data);
};

// Edit an existing customer
// use: CustomerService.update(customerId, updatedCustomer).then(response => ...)
const update = (customerId: string, updatedCustomer: Customer) => {
  const requestOptions = axios.put(`${baseUrl}/${customerId}`, updatedCustomer, {
      headers: {
        "Content-Type": "application/json",
      },
    });

  return requestOptions.then((response) => response.data);
};

// Delete a customer by ID
// use: CustomerService.remove(customerId).then(response => ...)
const remove = (customerId: string) => {
  const requestOptions = axios.delete(`${baseUrl}/${customerId}`);

  return requestOptions.then((response) => response.data);
}

export default { getAll, create, update, remove };
