import { useState } from "react";
import type { Customer as CustomerType } from "../../types/CustomerType";
import styles from "./Customer.module.css";

interface CustomerCardProps {
  customer: CustomerType;
  // onDelete: () => void;
  onDeleteRequest: (customer: CustomerType) => void;
  onEditRequest: (customer: CustomerType) => void;
}

// Receive customer as prop and display its details
const CustomerCard = ({
  customer,
  onDeleteRequest,
  onEditRequest,
}: CustomerCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className={styles.customerCard}>
        {!showDetails ? (
          <h3
            onClick={() => setShowDetails(!showDetails)}
            className={styles.customerCardTitle}
          >
            {customer.companyName}
          </h3>
        ) : (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={styles.customerCardCloseBtn}
          >
            [x] close details
          </button>
        )}
        {showDetails && (
          <div key={customer.customerId} className={styles.customerCardContent}>
            <p>
              <strong className={styles.customerCardLabel}>Contact:</strong>{" "}
              {customer.contactName} ({customer.contactTitle})
            </p>
            <p>
              <strong className={styles.customerCardLabel}>Address:</strong>{" "}
              {customer.address}, {customer.city} {customer.postalCode}
            </p>
            {customer.region && (
              <p>
                <strong className={styles.customerCardLabel}>Region:</strong>{" "}
                {customer.region}
              </p>
            )}
            <p>
              <strong className={styles.customerCardLabel}>Country:</strong>{" "}
              {customer.country}
            </p>
            <p>
              <strong className={styles.customerCardLabel}>Phone:</strong>{" "}
              {customer.phone}
            </p>
            {customer.fax && (
              <p>
                <strong className={styles.customerCardLabel}>Fax:</strong>{" "}
                {customer.fax}
              </p>
            )}
            <div className={styles.modalButtons}>
              <button
                className={styles.customerCardBtnEdit}
                onClick={() => onEditRequest(customer)}
              >
                📝 Edit
              </button>
              <button
                className={styles.customerCardBtn}
                onClick={() => onDeleteRequest(customer)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerCard;
