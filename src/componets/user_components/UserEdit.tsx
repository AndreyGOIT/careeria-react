import { useState } from "react";
import styles from "../../styles/CustomerEdit.module.css";
import UserService from "../../services/UserService";
import type { Dispatch, SetStateAction } from "react";
import type { User } from "../../types/UserType";

interface UserEditProps {
  user: User;
  x: boolean;
  reload: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const UserEdit: React.FC<UserEditProps> = ({
  user,
  x,
  reload,
  setMessage,
  setShowMessage,
  setIsPositive,
  onClose,
}: UserEditProps) => {
  const [formData, setFormData] = useState<Omit<User, "userId">>({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    password: user.password,
    accesslevel: user.accesslevel,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "accesslevel" ? Number(value) : value,
    }));
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: User = { userId: user.userId, ...formData };
    try {
      const response = await UserService.update(user.userId, updatedUser);
      if (response.status >= 200 && response.status < 300) {
        setMessage(`✅ User ${formData.username} updated successfully!`);
        setIsPositive(true);
      } else {
        setMessage(`⚠️ Error: ${response.statusText}`);
        setIsPositive(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage(`❌ Error updating user: ${error}`);
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
        <h2 className={styles.modalTitle}>Edit User</h2>
        <form className={styles.customerEditForm} onSubmit={formSubmit}>
          <div className={styles.formGrid}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            <label>First Name:</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />

            <label>Last Name:</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />

            <label>Password:</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <label>Accesslevel:</label>
            <select
              name="accesslevel"
              value={formData.accesslevel}
              onChange={handleChange}
            >
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
            {/* <input
              type="number"
              name="accesslevel"
              value={formData.accesslevel}
              onChange={handleChange}
            /> */}
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

export default UserEdit;
