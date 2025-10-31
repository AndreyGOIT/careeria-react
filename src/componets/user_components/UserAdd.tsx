import { useState, useEffect } from "react";
import "./UserAdd.css";
import UserService from "../../services/UserService";
import type { AxiosError } from "axios";

import type { Dispatch, SetStateAction } from "react";
import type { User } from "../../types/UserType";
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
    accesslevel: 1,
  });

  // Для проверки изменения showForm
  useEffect(() => {
    console.log("showForm changed:", showForm);
  }, [showForm]);

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
      !formData.password
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

      if (response.status === 201) {
        setMessage(`✅ New user "${newUser.username}" created!`);
        setIsPositive(true);
        setShowMessage(true);

        setTimeout(() => setShowMessage(false), 5000);
        reload(!x);
      } else {
        setMessage(`⚠️ Error: ${response.statusText}`);
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 6000);
      }
    } catch (error) {
      const err = error as AxiosError;
      setMessage(err.message || "❌ Failed to add user");
      setIsPositive(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 6000);
    } finally {
      closeForm();
    }

    // очистка формы
    setFormData({
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      accesslevel: 1,
    });
  };

  return (
    <>
      <h3 className="user-add-title" onClick={() => setShowForm(true)}>
        (+) Adding new user
      </h3>
      {showForm && (
        <div
          className={`user-modal-overlay ${
            isClosing ? "modal-close" : "modal-open"
          }`}
        >
          <div className="user-modal">
            <h2>Add New User</h2>
            <form className="user-add-form" onSubmit={formSubmit}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Accesslevel:</label>
                <select
                  name="accesslevel"
                  value={formData.accesslevel}
                  onChange={handleChange}
                >
                  <option value={1}>Admin</option>
                  <option value={2}>User</option>
                </select>
              </div>
              <br />
              <button type="submit">Add User</button>{" "}
              <button type="button" onClick={closeForm}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAdd;
