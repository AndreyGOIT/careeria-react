import { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import type { User } from "../../types/UserType";
import type { Dispatch, SetStateAction } from "react";
import styles from "./User.module.css";
import UserCard from "./UserCard";
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";

import ConfirmDeleteModal from "../ui/confirm/ConfirmDeleteModal";
import LoaderOverlay from "../ui/loaderOverlay/LoaderOverlay";

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
  const [loading, setLoading] = useState(true);
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
    setShowEditModal(true);
  };

  const handleDeleteRequest = (user: User) => {
    setSelectedUser(user);
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
      })
      .finally(() => setLoading(false));
  }, [x, show]);

  return loading ? (
    <LoaderOverlay />
  ) : (
    <>
      <h2
        className={`${styles.userListTitle} ${show ? "" : styles.pulsing}`}
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

      {/* Search input */}
      <input
        type="text"
        name="userSearch"
        placeholder="Search by user name..."
        className={styles.userSearchInput}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <hr />
      {/* users list */}
      {show && (
        <div className={styles.userListGrid}>
          {users &&
            users.map((u: User) => {
              if (
                u.username.toLowerCase().indexOf(search.toLowerCase()) === -1
              ) {
                return null; // does not match search, skip rendering
              }

              if (u.username.toLowerCase().includes(search.toLowerCase())) {
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

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        show={showConfirm}
        itemName={selectedUser?.username ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default UserList;
