import { useState } from "react";
import type { Customer as CustomerType } from "../types/CustomerType";

interface CustomerCardProps {
  customer: CustomerType;
}

// Receive customer as prop and display its details
const CustomerCard = ({ customer }: CustomerCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

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
          <div key={customer.id} className="customer-card">
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
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerCard;
