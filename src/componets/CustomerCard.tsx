import { useState } from "react";
import type { Customer as CustomerType } from "../types/CustomerType";
import CustomerService from "../services/CustomerService";

interface CustomerCardProps {
  customer: CustomerType;
  onDelete: () => void;
}

// Receive customer as prop and display its details
const CustomerCard = ({ customer, onDelete }: CustomerCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handler for deleting a customer
  const handleDelete = async () => {
    if (isDeleting) return; // Prevent multiple deletions
    if (!window.confirm(`Delete ${customer.companyName}?`)) return;

    setIsDeleting(true);
    try {
      await CustomerService.remove(customer.customerId);
      console.log("Customer deleted");
      onDelete(); // Notify parent to refresh the list
    } catch (error) {
      console.error("Error deleting customer:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="customer-card">
        {!showDetails ? (
          <h3
            onClick={() => setShowDetails(!showDetails)}
            className="customer-card-title"
          >
            {customer.companyName}
          </h3>
        ) : (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="customer-card-title clickable"
          >
            [ x ] Close
          </button>
        )}
        {showDetails && (
          <div key={customer.customerId} className="customer-card">
            <p>
              <strong className="customer-card-label">Contact:</strong>{" "}
              {customer.contactName} ({customer.contactTitle})
            </p>
            <p>
              <strong className="customer-card-label">Address:</strong>{" "}
              {customer.address}, {customer.city} {customer.postalCode}
            </p>
            {customer.region && (
              <p>
                <strong className="customer-card-label">Region:</strong>{" "}
                {customer.region}
              </p>
            )}
            <p>
              <strong className="customer-card-label">Country:</strong>{" "}
              {customer.country}
            </p>
            <p>
              <strong className="customer-card-label">Phone:</strong>{" "}
              {customer.phone}
            </p>
            {customer.fax && (
              <p>
                <strong className="customer-card-label">Fax:</strong>{" "}
                {customer.fax}
              </p>
            )}
            <button onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerCard;
