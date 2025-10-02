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

const getAll = () => {
  const requestOptions = axios.get(baseUrl);
  return requestOptions.then((response) => response.data);
};

const create = (newCustomer: Customer) => {
  return axios.post(baseUrl, newCustomer);
};

export default { getAll, create };
