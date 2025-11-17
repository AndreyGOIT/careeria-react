import Modal from "../Modal/Modal";
import styles from "./ConfirmDeleteModal.module.css";

interface ConfirmDeleteModalProps {
  show: boolean;
  itemName: string; // name of the element (companyName, productName...)
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  show,
  itemName,
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <Modal onClose={onCancel}>
      <h3 className={styles.modalTitle}>Confirm deletion</h3>
      <p className={styles.modalContent}>
        Delete <strong>{itemName}</strong>?
      </p>

      <div className={styles.modalButtons}>
        <button
          className={`${styles.btn} ${styles.delete}`}
          onClick={onConfirm}
        >
          Yes, delete
        </button>

        <button className={`${styles.btn} ${styles.cancel}`} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
