import { useState } from "react";
import AuthService from "../../services/Auth";
import Modal from "../ui/Modal/Modal";
import LoginModal from "./LoginModal";
import styles from "./Login.module.css";

interface LoginProps {
  setMessage: (msg: string) => void;
  setShowMessage: (v: boolean) => void;
  setIsPositive: (v: boolean) => void;
  setLoggedInUser: (v: string | null) => void;
}

const Login: React.FC<LoginProps> = ({
  setMessage,
  setShowMessage,
  setIsPositive,
  setLoggedInUser,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMsg("⚠️ Please fill in all fields.");
      setTimeout(() => setErrorMsg(""), 3500);
      return;
    }

    setLoading(true);

    try {
      const res = await AuthService.authenticate(formData);
      const { username, token, accesslevelId } = res;

      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("accesslevelId", String(accesslevelId));

      setLoggedInUser(username);

      setMessage(`✔ Logged in as "${username}"`);
      setIsPositive(true);
      setShowMessage(true);

      setTimeout(() => setShowMessage(false), 4000);
    } catch {
      setMessage("❌ Login failed");
      setIsPositive(false);
      setShowMessage(true);
    } finally {
      setLoading(false);
      setShowForm(false);
      setErrorMsg("");
      setFormData({ username: "", password: "" });
    }
  };

  return (
    <>
      <button className={styles.loginButton} onClick={() => setShowForm(true)}>
        🔐 Login
      </button>

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <LoginModal
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errorMsg={errorMsg}
            close={() => setShowForm(false)}
            loading={loading}
          />
        </Modal>
      )}
    </>
  );
};

export default Login;

// import { useState } from "react";
// import AuthService from "../../services/Auth";
// import type { AxiosError } from "axios";
// import type { Dispatch, SetStateAction } from "react";
// import styles from "./Login.module.css";

// interface LoginProps {
//   setMessage: Dispatch<SetStateAction<string>>;
//   setShowMessage: Dispatch<SetStateAction<boolean>>;
//   setIsPositive: Dispatch<SetStateAction<boolean>>;
//   setLoggedInUser: Dispatch<SetStateAction<string | null>>;
// }

// const Login: React.FC<LoginProps> = ({
//   setMessage,
//   setShowMessage,
//   setIsPositive,
//   setLoggedInUser,
// }) => {
//   // component logic

//   const [showForm, setShowForm] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   // const [isClosing, setIsClosing] = useState(false);
//   // component state
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const closeForm = () => {
//     setFormData({
//       username: "",
//       password: "",
//     });
//     // setIsClosing(true);
//     setTimeout(() => {
//       setShowForm(false);
//       // setIsClosing(false);
//     }, 300); // Duration should match the CSS animation duration
//   };

//   // form submit handler
//   const formSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.username || !formData.password) {
//       setErrorMsg("⚠️ Please fill in all fields.");
//       setTimeout(() => {
//         setErrorMsg("");
//       }, 4000);
//       return;
//     }

//     const credentials = {
//       username: formData.username,
//       password: formData.password,
//     };

//     try {
//       const response = await AuthService.authenticate(credentials);

//       const { username, token, accesslevelId } = response;

//       // save to localStorage and update state
//       setLoggedInUser(username);
//       localStorage.setItem("user", JSON.stringify(response));
//       localStorage.setItem("token", token);
//       localStorage.setItem("username", username);
//       localStorage.setItem("accesslevelId", accesslevelId.toString());

//       setMessage(`✅ Logged in as "${username}"!`);
//       setIsPositive(true);
//       setShowMessage(true);
//       setTimeout(() => setShowMessage(false), 5000);
//     } catch (error) {
//       const err = error as AxiosError;
//       setMessage(err.message || "❌ Login failed");
//       setIsPositive(false);
//       setShowMessage(true);
//       setTimeout(() => setShowMessage(false), 6000);
//     } finally {
//       closeForm();
//     }

//     // kenttien tyhjennys
//     setFormData({
//       username: "",
//       password: "",
//     });
//   };

//   return (
//     <>
//       <button
//         type="button"
//         className={styles.loginButton}
//         onClick={() => setShowForm(true)}
//       >
//         🔐 Login
//       </button>
//       {showForm && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modal}>
//             <h2 className={styles.modalTitle} style={{ color: "indigo" }}>
//               Login form
//             </h2>
//             <form className={styles.loginForm} onSubmit={formSubmit}>
//               <div className={styles.formGrid}>
//                 <label>Username:</label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                 />

//                 <label>Password:</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//               {errorMsg ? (
//                 <p className={styles.errorMessage}>{errorMsg}</p>
//               ) : (
//                 <p className={styles.errorMessage}>&nbsp;</p>
//               )}
//               <div className={styles.modalButtons}>
//                 <button className={styles.btn} type="submit">
//                   Login
//                 </button>
//                 <button
//                   className={styles.btn + " " + styles.cancel}
//                   type="button"
//                   onClick={closeForm}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;
