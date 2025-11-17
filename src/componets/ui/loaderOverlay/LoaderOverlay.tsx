import styles from "./LoaderOverlay.module.css";

const LoaderOverlay = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoaderOverlay;
