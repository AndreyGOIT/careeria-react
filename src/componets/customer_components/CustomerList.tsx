import { useState, useEffect } from "react";
import CustomerService from "../../services/CustomerService";
import type { Customer } from "../../types/CustomerType";
import "../../styles/CustomerList.css";
import CustomerCard from "./CustomerCard";
import CustomerAdd from "./CustomerAdd";

import type { Dispatch, SetStateAction } from "react";
import CustomerEdit from "./CustomerEdit";

interface CustomerListProps {
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
}

const CustomerList: React.FC<CustomerListProps> = ({
  setMessage,
  setShowMessage,
  setIsPositive,
}) => {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  // state to trigger re-fetching of customers
  const [x, reload] = useState(false);
  const [search, setSearch] = useState("");
  // Handler for delete request from CustomerCard
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditRequest = (customer: Customer) => {
    setEditingCustomer(customer);
    console.log("Editing customer: ", customer);
    setShowEditModal(true);
  };

  const handleDeleteRequest = (customer: Customer) => {
    setSelectedCustomer(customer);
    console.log("Selected customer: ", customer);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCustomer) return;

    try {
      await CustomerService.remove(selectedCustomer.customerId);
      reload(!x);
    } catch (error) {
      console.error("Error deleting customer:", error);
    } finally {
      setShowConfirm(false);
      setSelectedCustomer(null);
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    CustomerService.getAll()
      .then((data) => setCustomers(data))
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, [x, show]);

  return (
    <>
      <h2
        className={`customer-list-title ${show ? "" : "pulsing"}`}
        onClick={() => setShow(!show)}
      >
        Customers
      </h2>
      <CustomerAdd
        x={x}
        reload={reload}
        setMessage={setMessage}
        setShowMessage={setShowMessage}
        setIsPositive={setIsPositive}
      />

      {/* Search input - functionality not implemented yet */}
      <input
        type="text"
        placeholder="Search by company name..."
        className="customer-search-input"
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <hr />
      {/* customers list */}
      {show && (
        <div className="customer-list-grid">
          {customers &&
            customers.map((c: Customer) => {
              if (
                c.companyName.toLowerCase().indexOf(search.toLowerCase()) === -1
              ) {
                return null; // не отображать, если не совпадает с поиском
              }

              if (c.companyName.toLowerCase().includes(search.toLowerCase())) {
                // console.log("Found:", c.companyName);
                return (
                  <CustomerCard
                    key={c.customerId}
                    customer={c}
                    onEditRequest={handleEditRequest}
                    onDeleteRequest={handleDeleteRequest}
                  />
                );
              }
            })}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingCustomer && (
        <CustomerEdit
          customer={editingCustomer}
          x={x}
          reload={reload}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          setIsPositive={setIsPositive}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Delete {selectedCustomer?.companyName}?</p>
            <div className="modal-buttons">
              <button
                className="btn cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button className="btn delete" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerList;
