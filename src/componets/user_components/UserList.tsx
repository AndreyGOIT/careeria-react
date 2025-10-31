import { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import type { User } from "../../types/UserType";
import "./UserList.css";
import UserCard from "./UserCard";
import UserAdd from "./UserAdd";

import type { Dispatch, SetStateAction } from "react";
import UserEdit from "./UserEdit";

interface UserListProps {
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
}

const UserList: React.FC<UserListProps> = ({
  setMessage,
  setShowMessage,
  setIsPositive,
}) => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  // state to trigger re-fetching of users
  const [x, reload] = useState(false);
  const [search, setSearch] = useState("");
  // Handler for delete request from UserCard
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditRequest = (user: User) => {
    setEditingUser(user);
    console.log("Editing user: ", user);
    setShowEditModal(true);
  };

  const handleDeleteRequest = (user: User) => {
    setSelectedUser(user);
    console.log("Selected user: ", user);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await UserService.remove(selectedUser.userId);
      reload(!x);
    } catch (error) {
      console.error("Error deleting customer:", error);
    } finally {
      setShowConfirm(false);
      setSelectedUser(null);
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    UserService.getAll()
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [x, show]);

  return (
    <>
      <h2
        className={`user-list-title ${show ? "" : "pulsing"}`}
        onClick={() => setShow(!show)}
      >
        Users
      </h2>
      <UserAdd
        x={x}
        reload={reload}
        setMessage={setMessage}
        setShowMessage={setShowMessage}
        setIsPositive={setIsPositive}
      />

      {/* Search input - functionality not implemented yet */}
      <input
        type="text"
        placeholder="Search by user name..."
        className="user-search-input"
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <hr />
      {/* users list */}
      {show && (
        <div className="user-list-grid">
          {users &&
            users.map((u: User) => {
              if (
                u.username.toLowerCase().indexOf(search.toLowerCase()) === -1
              ) {
                return null; // не отображать, если не совпадает с поиском
              }

              if (u.username.toLowerCase().includes(search.toLowerCase())) {
                // console.log("Found:", c.companyName);
                return (
                  <UserCard
                    key={u.userId}
                    user={u}
                    onEditRequest={handleEditRequest}
                    onDeleteRequest={handleDeleteRequest}
                  />
                );
              }
            })}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <UserEdit
          user={editingUser}
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
        <div className="user-modal-overlay">
          <div className="user-modal">
            <h3>Confirm Deletion</h3>
            <p>Delete {selectedUser?.username}?</p>
            <div className="user-modal-buttons">
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

export default UserList;
