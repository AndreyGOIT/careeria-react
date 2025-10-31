import { useState } from "react";
import type { User as UserType } from "../../types/UserType";

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
      <div className="customer-card">
        {!showDetails ? (
          <h3
            onClick={() => setShowDetails(!showDetails)}
            className="customer-card-title"
          >
            {user.username}
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
          <div key={user.userId} className="customer-card">
            <p>
              <strong className="customer-card-label">Full name:</strong>{" "}
              {user.firstname} ({user.lastname})
            </p>
            <p>
              <strong className="customer-card-label">Name:</strong>{" "}
              {user.username}
            </p>
            <p>
              <strong className="customer-card-label">Accesslevel:</strong>{" "}
              {user.accesslevel === 1 ? "Admin" : "User"}
            </p>

            <button
              className="customer-card-btn-edit"
              onClick={() => onEditRequest(user)}
            >
              Edit
            </button>
            <button
              className="customer-card-btn"
              onClick={() => onDeleteRequest(user)}
            >
              Delete
              {/* {isDeleting ? "Deleting..." : "Delete"} */}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserCard;
