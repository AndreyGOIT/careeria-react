// src/types/CustomerType.ts
export type Customer = {
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
