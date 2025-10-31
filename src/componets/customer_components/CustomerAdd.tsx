import { useState } from "react";
import "../../styles/CustomerAdd.css";
import CustomerService from "../../services/CustomerService";
import type { AxiosError } from "axios";

import type { Dispatch, SetStateAction } from "react";
import type { Customer } from "../../types/CustomerType";

interface CustomerAddProps {
  x: boolean;
  reload: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
}

const CustomerAdd: React.FC<CustomerAddProps> = ({
  x,
  reload,
  setMessage,
  setShowMessage,
  setIsPositive,
}) => {
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
    const newCustomer: Customer = {
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

      if (response.status >= 200 && response.status < 300) {
        setMessage(`✅ Added new customer: ${newCustomer.companyName}`);
        setIsPositive(true);
        setShowMessage(true);

        setTimeout(() => setShowMessage(false), 5000);

        setShowForm(false);
        reload(!x);
      } else {
        setMessage(`⚠️ Error: ${response.statusText}`);
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 6000);
      }
    } catch (error) {
      const err = error as AxiosError;
      setMessage(err.message || "❌ Failed to add customer");
      setIsPositive(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 6000);
    }

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
  };

  return (
    <>
      <h3 className="customer-add-title" onClick={() => setShowForm(!showForm)}>
        (+) Adding new customer
      </h3>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
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
              <br />
              <button type="submit">Add Customer</button>{" "}
              <button onClick={() => setShowForm(!showForm)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerAdd;
