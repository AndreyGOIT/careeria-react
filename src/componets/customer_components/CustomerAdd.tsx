import { useState } from "react";
import CustomerService from "../../services/CustomerService";
import type { AxiosError } from "axios";
import type { Dispatch, SetStateAction } from "react";
import type { Customer } from "../../types/CustomerType";
import styles from "./Customer.module.css";

interface CustomerAddProps {
  customers: Customer[];
  x: boolean;
  reload: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
}

const CustomerAdd: React.FC<CustomerAddProps> = ({
  customers,
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

  const closeForm = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowForm(false);
      setIsClosing(false);
    }, 300); // Duration should match the CSS animation duration
  };

  // form submit handler
  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission behavior

    // check if customerId already exists
    const exists = customers.some((c) => c.customerId === customerId);
    if (exists) {
      setShowForm(false);
      setMessage("⚠️ Customer ID already exists!");
      setIsPositive(false);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setShowForm(true);
      }, 4000);
      return;
    }

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
      // 💥 shake effect
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
      console.log(response);

      setMessage(`✅ Added new customer: ${customerData.companyName}`);
      setIsPositive(true);
      setShowMessage(true);

      setTimeout(() => setShowMessage(false), 5000);
      reload(!x);
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error adding new customer:", err);
      setMessage("❌ Error while adding new customer.");
      setIsPositive(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 6000);
    } finally {
      closeForm();
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
      <h3
        className={styles.customerAddTitle}
        onClick={() => setShowForm(!showForm)}
      >
        (+) Adding new customer
      </h3>
      {showForm && (
        <div className={styles.modalOverlay}>
          <div
            className={`${styles.modal} ${isClosing ? styles.closing : ""} ${
              isError ? styles.shake : ""
            }`}
          >
            <h2 className={styles.customerAddFormTitle}>Add New Customer</h2>
            <form className={styles.customerAddForm} onSubmit={formSubmit}>
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

              <div className={styles.modalButtons}>
                <button className={styles.btn + " " + styles.add} type="submit">
                  Add Customer
                </button>{" "}
                <button
                  className={styles.btn + " " + styles.cancel}
                  onClick={() => {
                    setShowForm(!showForm);
                    setIsClosing(true);
                    setTimeout(() => setIsClosing(false), 300);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerAdd;
