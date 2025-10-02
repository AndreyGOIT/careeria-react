import { useState, useEffect } from "react";
import CustomerService from "../services/CustomerService";
import type { Customer } from "../types/CustomerType";
import "../styles/CustomerList.css";
import CustomerCard from "./CustomerCard";
import CustomerAdd from "./CustomerAdd";
// import CustomerListHeader from "./CustomerListHeader";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);

  // Fetch customers on component mount
  useEffect(() => {
    CustomerService.getAll()
      .then((data) => setCustomers(data))
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  return (
    <>
      {/* <CustomerListHeader setShow={setShow} /> */}
      <h2 className="customer-list-title" onClick={() => setShow(!show)}>
        Customers
      </h2>
      <p className="customer-list-subtitle">press title</p>
      <CustomerAdd />
      <hr />
      {show && (
        <div className="customer-list-grid">
          {customers &&
            customers.map((c: Customer) => (
              <CustomerCard key={c.id} customer={c} />
            ))}
        </div>
      )}
    </>
  );
};

export default CustomerList;
