import { useState, useEffect } from "react";
import styles from "../../styles/CustomerEdit.module.css";
import CustomerService from "../../services/CustomerService";
import type { Dispatch, SetStateAction } from "react";
import type { Customer } from "../../types/CustomerType";

interface CustomerEditProps {
  customer: Customer;
  x: boolean;
  reload: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const CustomerEdit: React.FC<CustomerEditProps> = ({
  customer,
  x,
  reload,
  setMessage,
  setShowMessage,
  setIsPositive,
  onClose,
}) => {
  // component logic
  //   const [showForm, setShowForm] = useState(false);
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

  useEffect(() => {
    setCustomerId(customer.customerId);
    setCompanyName(customer.companyName);
    setContactName(customer.contactName);
    setContactTitle(customer.contactTitle);
    setAddress(customer.address);
    setCity(customer.city);
    setRegion(customer.region || "");
    setPostalCode(customer.postalCode);
    setCountry(customer.country);
    setPhone(customer.phone);
    setFax(customer.fax || "");
  }, [customer]);

  // form submit handler
  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission behavior
    // create updated customer object
    const updatedCustomer: Customer = {
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
      const response = await CustomerService.update(
        customerId,
        updatedCustomer
      );

      if (response.status >= 200 && response.status < 300) {
        setMessage(`✅ Customer ${companyName} updated successfully!`);
        setIsPositive(true);
      } else {
        setMessage(`⚠️ Error: ${response.statusText}`);
        setIsPositive(false);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      setMessage(`❌ Error updating customer: ${error}`);
      setIsPositive(false);
    } finally {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
      onClose();
      reload(!x);
    }
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Edit Customer</h2>
        <form className={styles.customerEditForm} onSubmit={formSubmit}>
          <div className={styles.formGrid}>
            <label>Customer ID:</label>
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />

            <label>Company Name:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <label>Contact Name:</label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />

            <label>Contact Title:</label>
            <input
              type="text"
              value={contactTitle}
              onChange={(e) => setContactTitle(e.target.value)}
            />

            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <label>Region:</label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />

            <label>Postal Code:</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />

            <label>Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label>Fax:</label>
            <input
              type="text"
              value={fax}
              onChange={(e) => setFax(e.target.value)}
            />
          </div>

          <div className={styles.buttonRow}>
            <button type="submit" className={styles.btnSave}>
              💾 Save
            </button>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
            >
              ✖ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerEdit;
