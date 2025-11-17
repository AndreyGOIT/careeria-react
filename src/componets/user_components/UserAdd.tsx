import { useState } from "react";
import UserService from "../../services/UserService";
import type { AxiosError } from "axios";

import type { Dispatch, SetStateAction } from "react";
import type { User } from "../../types/UserType";
import styles from "./User.module.css";
import CryptoJS from "crypto-js";

interface UserAddProps {
  x: boolean;
  reload: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
}

const UserAdd: React.FC<UserAddProps> = ({
  x,
  reload,
  setMessage,
  setShowMessage,
  setIsPositive,
}) => {
  // component logic

  const [showForm, setShowForm] = useState(false);

  const [isClosing, setIsClosing] = useState(false);
  // component state
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    accesslevel: 2,
  });
  // check if passwords match
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "accesslevel" ? Number(value) : value,
    }));
  };

  const closeForm = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowForm(false);
      setIsClosing(false);
    }, 300); // Duration should match the CSS animation duration
  };

  // form submit handler
  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.firstname ||
      !formData.lastname ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      closeForm();
      setMessage("⚠️ Please fill in all fields.");
      setIsPositive(false);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setShowForm(true);
      }, 6000);
      return;
    }

    if (!passwordsMatch) {
      setMessage("❗ Passwords do not match.");
      setIsPositive(false);
      setShowMessage(true);
      return;
    }

    const hashedPassword = CryptoJS.SHA256(formData.password).toString();

    const newUser: User = {
      userId: 0,
      username: formData.username,
      firstname: formData.firstname,
      lastname: formData.lastname,
      password: hashedPassword,
      accesslevel: formData.accesslevel,
    };

    try {
      const response = await UserService.create(newUser);
      console.log(response);

      setMessage(`✅ New user "${newUser.username}" created!`);
      setIsPositive(true);
      setShowMessage(true);

      setTimeout(() => setShowMessage(false), 3000);
      reload(!x);
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error adding new user:", err);
      setMessage("❌ Failed to add user");
      setIsPositive(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 6000);
    } finally {
      closeForm();
    }

    // clear form data
    setFormData({
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      accesslevel: 1,
    });
  };

  return (
    <>
      <h3 className={styles.userAddTitle} onClick={() => setShowForm(true)}>
        (+) Adding new user
      </h3>
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${isClosing ? styles.closing : ""}`}>
            <h2 className={styles.userAddFormTitle}>Add New User</h2>
            <form className={styles.userAddForm} onSubmit={formSubmit}>
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
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <label>Accesslevel:</label>
                <select
                  name="accesslevel"
                  value={formData.accesslevel}
                  onChange={handleChange}
                >
                  <option value={2}>User</option>
                  <option value={1}>Admin</option>
                </select>
              </div>
              {!passwordsMatch ? (
                <>
                  <label> </label>
                  <p style={{ color: "red", fontSize: "0.9rem" }}>
                    Passwords do not match
                  </p>
                </>
              ) : (
                <>
                  <label> </label>
                  <p>&nbsp;</p>
                </>
              )}
              <div className={styles.modalButtons}>
                <button
                  className={styles.btn + " " + styles.add}
                  type="submit"
                  disabled={!passwordsMatch}
                >
                  Add User
                </button>{" "}
                <button
                  className={styles.btn + " " + styles.cancel}
                  type="button"
                  onClick={closeForm}
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

export default UserAdd;
