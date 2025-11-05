import { useState, useEffect } from "react";
import "./user_components/UserAdd.css";
import AuthService from "../services/Auth";
import type { AxiosError } from "axios";

import type { Dispatch, SetStateAction } from "react";
// import CryptoJS from "crypto-js";

interface LoginProps {
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
  setLoggedInUser: Dispatch<SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({
  setMessage,
  setShowMessage,
  setIsPositive,
  setLoggedInUser,
}) => {
  // component logic

  const [showForm, setShowForm] = useState(false);

  const [isClosing, setIsClosing] = useState(false);
  // component state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      [name]: value,
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
    if (!formData.username || !formData.password) {
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

    // const hashedPassword = CryptoJS.SHA256(formData.password).toString();

    const credentials = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await AuthService.authenticate(credentials);
      //   console.log("Ответ при логине:", response);

      // getting username, token, accesslevelId from response
      const { username, token, accesslevelId } = response;

      // save to localStorage and update state
      setLoggedInUser(username);
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("accesslevelId", accesslevelId.toString());

      console.log("Пользователь сохранён в localStorage:", response);

      setMessage(`✅ Logged in as "${username}"!`);
      setIsPositive(true);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    } catch (error) {
      const err = error as AxiosError;
      setMessage(err.message || "❌ Login failed");
      setIsPositive(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 6000);
    } finally {
      closeForm();
    }

    // kenttien tyhjennys
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <h3 className="login-button" onClick={() => setShowForm(true)}>
        🔐 Login
      </h3>
      {showForm && (
        <div
          className={`user-modal-overlay ${
            isClosing ? "modal-close" : "modal-open"
          }`}
        >
          <div className="user-modal">
            <h2 style={{ color: "indigo" }}>Login form</h2>
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
                <label>Password:</label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button type="submit">Login</button>{" "}
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

export default Login;
