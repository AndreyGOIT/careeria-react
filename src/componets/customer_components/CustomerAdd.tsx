import { useState } from "react";
import "../../styles/CustomerAdd.css";
import CustomerService from "../../services/CustomerService";
import type { AxiosError } from "axios";

import type { Dispatch, SetStateAction } from "react";
// import type { Customer } from "../../types/CustomerType";

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
  const [isClosing, setIsClosing] = useState(false);
  const [isError, setIsError] = useState(false);
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
    const customerData = {
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

    const requiredFields = [
      customerData.customerId,
      customerData.companyName,
      customerData.contactName,
      customerData.contactTitle,
      customerData.address,
      customerData.city,
      customerData.postalCode,
      customerData.country,
      customerData.phone,
    ];

    const hasEmpty = requiredFields.some(
      (field) => !field || field.trim() === ""
    );

    if (hasEmpty) {
      // 💥 эффект "shake"
      setIsError(true);
      setTimeout(() => setIsError(false), 400);

      setShowForm(false);
      setMessage("⚠️ Please fill in all required fields.");
      setIsPositive(false);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setShowForm(true);
      }, 6000);

      return;
    }

    try {
      const response = await CustomerService.create(customerData);

      if (response.status >= 200 && response.status < 300) {
        setMessage(`✅ Added new customer: ${customerData.companyName}`);
        setIsPositive(true);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000);

        setIsClosing(true);
        setTimeout(() => {
          setIsClosing(false);
          setShowForm(false);
        }, 300);

        reload(!x);
      } else {
        setMessage("⚠️ Failed to add new customer.");
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 6000);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error adding new customer:", err);
      setMessage("❌ Error while adding new customer.");
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
        <div className="customer-modal-overlay">
          <div
            className={`customer-modal ${isClosing ? "closing" : ""} ${
              isError ? "shake" : ""
            }`}
          >
            <h2 style={{ color: "indigo" }}>Add New Customer</h2>
            <form className="customer-add-form" onSubmit={formSubmit}>
              <div className="customer-modal-input-block">
                <label>Customer ID:</label>
                <input
                  type="text"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                />
              </div>
              <div className="customer-modal-input-block">
                <label>Company Name:</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="customer-modal-input-block">
                <label>Contact Name:</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div className="customer-modal-input-block">
                <label>Contact Title:</label>
                <input
                  type="text"
                  value={contactTitle}
                  onChange={(e) => setContactTitle(e.target.value)}
                />
              </div>
              <div className="customer-modal-input-block">
                <label>Address:</label>

                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="customer-modal-input-block">
                <label>City:</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="customer-modal-input-block">
                <label>Region:</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div className="customer-modal-input-block">
                <label>Postal Code:</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="customer-modal-input-block">
                <label>Country:</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="customer-modal-input-block">
                <label>Phone:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="customer-modal-input-block">
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
