import { useState } from "react";
import type { User as UserType } from "../../types/UserType";
import styles from "./User.module.css";

interface UserCardProps {
  user: UserType;
  onDeleteRequest: (user: UserType) => void;
  onEditRequest: (user: UserType) => void;
}

// Receive customer as prop and display its details
const UserCard = ({ user, onDeleteRequest, onEditRequest }: UserCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className={styles.userCard}>
        {!showDetails ? (
          <h3
            onClick={() => setShowDetails(!showDetails)}
            className={styles.userCardTitle}
          >
            {user.username}
          </h3>
        ) : (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={styles.userCardCloseBtn}
          >
            [x] close details
          </button>
        )}
        {showDetails && (
          <div key={user.userId} className={styles.userCardContent}>
            <p>
              <strong className={styles.userCardLabel}>Full name:</strong>{" "}
              {user.firstname} ({user.lastname})
            </p>
            <p>
              <strong className={styles.userCardLabel}>Name:</strong>{" "}
              {user.username}
            </p>
            <p>
              <strong className={styles.userCardLabel}>Accesslevel:</strong>{" "}
              {user.accesslevel === 1 ? "Admin" : "User"}
            </p>

            <div className={styles.modalButtons}>
              <button
                className={styles.userCardBtnEdit}
                onClick={() => onEditRequest(user)}
              >
                📝 Edit
              </button>
              <button
                className={styles.userCardBtn}
                onClick={() => onDeleteRequest(user)}
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

export default UserCard;
