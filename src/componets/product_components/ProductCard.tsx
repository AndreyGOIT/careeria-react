import { useState } from "react";
import type { Product as ProductType } from "../../types/ProductType";
import styles from "./Product.module.css";

interface ProductCardProps {
  product: ProductType;
  onEdit: (product: ProductType) => void;
  onDelete: (product: ProductType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={styles.productCard}>
      {!showDetails ? (
        <h3
          onClick={() => setShowDetails(!showDetails)}
          className={styles.productCardTitle}
        >
          {product.productName}
        </h3>
      ) : (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={styles.productCardCloseBtn}
        >
          [x] close details
        </button>
      )}
      {showDetails && (
        <div key={product.productId} className={styles.productCardContent}>
          <p>
            <strong className={styles.productCardLabel}>Product Name:</strong>
            {product.productName}
          </p>
          <div style={{ marginBottom: 10 }}>
            <img
              src={product.imageLink ? product.imageLink : undefined}
              alt={product.productName}
            />
          </div>
          <p>
            <strong className={styles.productCardLabel}>Price:</strong> $
            {product.unitPrice.toFixed(2)}
          </p>
          <p>
            <strong className={styles.productCardLabel}>In Stock:</strong>{" "}
            {product.unitsInStock}
          </p>
          <p>
            <strong className={styles.productCardLabel}>Units On Order:</strong>{" "}
            {product.unitsOnOrder}
          </p>

          <p>
            <strong className={styles.productCardLabel}>
              Quantity Per Unit:
            </strong>{" "}
            {product.quantityPerUnit}
          </p>

          <div className={styles.modalButtons}>
            <button
              onClick={() => onEdit(product)}
              className={styles.productCardBtnEdit}
            >
              📝 Edit
            </button>
            <button
              onClick={() => onDelete(product)}
              className={styles.productCardBtn}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
