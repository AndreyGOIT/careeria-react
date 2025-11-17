import { useState } from "react";
import ProductService from "../../services/ProductService";
import type { Product } from "../../types/ProductType";
import styles from "./Product.module.css";
import type { Dispatch, SetStateAction } from "react";

interface ProductEditProps {
  product: Product;
  x: boolean;
  reload: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
  closeForm: () => void;
}

const ProductEdit: React.FC<ProductEditProps> = ({
  product,
  x,
  reload,
  setMessage,
  setShowMessage,
  setIsPositive,
  closeForm,
}) => {
  const [formData, setFormData] = useState({
    productName: product.productName,
    supplierId: product.supplierId,
    categoryId: product.categoryId,
    quantityPerUnit: product.quantityPerUnit,
    unitPrice: product.unitPrice,
    unitsInStock: product.unitsInStock,
    unitsOnOrder: product.unitsOnOrder,
    reorderLevel: product.reorderLevel,
    discontinued: product.discontinued,
    imageLink: product.imageLink,
  });

  // Handler for input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeEditForm = () => {
    // setIsClosing(true);
    setTimeout(() => {
      closeForm();
    }, 300); // Match this duration with your CSS animation duration
  };

  // form submit handler
  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission behavior

    const updatedProduct: Product = {
      productId: product.productId,
      productName: formData.productName,
      supplierId: Number(formData.supplierId),
      categoryId: Number(formData.categoryId),
      quantityPerUnit: formData.quantityPerUnit,
      unitPrice: Number(formData.unitPrice),
      unitsInStock: Number(formData.unitsInStock),
      unitsOnOrder: Number(formData.unitsOnOrder),
      reorderLevel: Number(formData.reorderLevel),
      discontinued: formData.discontinued,
      imageLink: formData.imageLink,
    };

    try {
      await ProductService.update(product.productId, updatedProduct);

      // Success
      setMessage("Product updated successfully!");
      setIsPositive(true);
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("❌ Failed to update product.");
      setIsPositive(false);
    } finally {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);

      closeEditForm();
      reload(!x);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Edit Product</h2>
        <form className={styles.productEditForm} onSubmit={formSubmit}>
          <div className={styles.formGrid}>
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />

            <label>Supplier ID:</label>
            <input
              type="number"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
            />

            <label>Category ID:</label>
            <input
              type="number"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            />

            <label>Quantity Per Unit:</label>
            <input
              type="text"
              name="quantityPerUnit"
              value={formData.quantityPerUnit}
              onChange={handleChange}
            />

            <label>Unit Price:</label>
            <input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
            />

            <label>Units In Stock:</label>
            <input
              type="number"
              name="unitsInStock"
              value={formData.unitsInStock}
              onChange={handleChange}
            />

            <label>Units On Order:</label>
            <input
              type="number"
              name="unitsOnOrder"
              value={formData.unitsOnOrder}
              onChange={handleChange}
            />

            <label>Reorder Level:</label>
            <input
              type="number"
              name="reorderLevel"
              value={formData.reorderLevel}
              onChange={handleChange}
            />

            <label>Discontinued:</label>
            <select
              name="discontinued"
              value={formData.discontinued ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  discontinued: e.target.value === "true",
                }))
              }
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>

            <label>Image Link:</label>
            <input
              type="text"
              name="imageLink"
              value={formData.imageLink || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.modalButtons}>
            <button type="submit" className={styles.btn + " " + styles.save}>
              💾 Save
            </button>
            <button
              type="button"
              className={styles.btn + " " + styles.cancel}
              onClick={closeEditForm}
            >
              ✖ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
