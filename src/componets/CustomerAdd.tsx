import { useState } from "react";
import "../styles/CustomerAdd.css";
import CustomerService from "../services/CustomerService";

import type { Dispatch, SetStateAction } from "react";

interface CustomerAddProps {
  x: boolean;
  reload: Dispatch<SetStateAction<boolean>>;
}

const CustomerAdd: React.FC<CustomerAddProps> = ({ x, reload }) => {
  // component logic

  const [showForm, setShowForm] = useState(false);
  // component state
  const [customerId, setCustomerId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");

  // form submit handler
  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission behavior
    // create new customer object
    const newCustomer = {
      customerId,
      companyName,
      contactName,
      contactTitle,
      address,
      city,
      region: region || null,
      postalCode,
      country,
      phone,
      fax: fax || null,
    };
    try {
      const response = await CustomerService.create(newCustomer);
      console.log("Customer added:", response);
      // reset form fields
      setCustomerId("");
      setCompanyName("");
      setContactName("");
      setContactTitle("");
      setAddress("");
      setCity("");
      setRegion("");
      setPostalCode("");
      setCountry("");
      setPhone("");
      setFax("");
    } catch (error) {
      console.error("Error adding customer:", error);
    }
    setShowForm(false); // hide form after submission
    reload(!x); // trigger re-fetching of customers in parent component
    // window.location.reload(); // reload the page to show the new customer in the list (temporary solution)
  };

  return (
    <>
      <h3 className="customer-add-title" onClick={() => setShowForm(!showForm)}>
        (+) Adding new customer
      </h3>
      {showForm && (
        <>
          <hr />
          <form className="customer-add-form" onSubmit={formSubmit}>
            <div>
              <label>Customer ID:</label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              />
            </div>
            <div>
              <label>Company Name:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label>Contact Name:</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>
            <div>
              <label>Contact Title:</label>
              <input
                type="text"
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Address:</label>

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label>Region:</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
            <div>
              <label>Postal Code:</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label>Fax:</label>
              <input
                type="text"
                value={fax}
                onChange={(e) => setFax(e.target.value)}
              />
            </div>
            <button type="submit">Add Customer</button>{" "}
            <button onClick={() => setShowForm(!showForm)}>Cancel</button>
          </form>
        </>
      )}
    </>
  );
};

export default CustomerAdd;
