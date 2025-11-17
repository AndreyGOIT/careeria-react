// src/componets/login_components/LoginModal.tsx
import { useRef } from "react";
import styles from "./LoginModal.module.css";

interface LoginModalProps {
  formData: {
    username: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errorMsg: string;
  close: () => void;
  loading: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({
  formData,
  handleChange,
  handleSubmit,
  errorMsg,
  close,
  loading,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit(); // corrected method name
    }
  };

  return (
    <>
      <h2 className={styles.title}>Login</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <p className={styles.error}>{errorMsg || " "}</p>

        <div className={styles.buttons}>
          <button type="submit" className={styles.loginBtn} disabled={loading}>
            <span
              className={`${styles.btnText} ${loading ? styles.hidden : ""}`}
            >
              Login
            </span>

            {loading && <span className={styles.loader}></span>}
          </button>
          <button
            type="button"
            className={styles.cancel}
            onClick={close}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginModal;
