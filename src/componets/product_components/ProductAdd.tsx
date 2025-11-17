import { useState } from "react";
import type { Product as ProductType } from "../../types/ProductType";
import styles from "./Product.module.css";
import ProductService from "../../services/ProductService";
import type { AxiosError } from "axios";

import type { Dispatch, SetStateAction } from "react";

interface ProductAddProps {
  x: boolean;
  reload: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
}

const ProductAdd: React.FC<ProductAddProps> = ({
  x,
  reload,
  setMessage,
  setShowMessage,
  setIsPositive,
}) => {
  const [showForm, setShowForm] = useState(false);

  const [isClosing, setIsClosing] = useState(false);
  // component state
  const [formData, setFormData] = useState({
    productName: "",
    supplierId: 0,
    categoryId: 0,
    quantityPerUnit: "",
    unitPrice: 0,
    unitsInStock: 0,
    unitsOnOrder: 0,
    reorderLevel: 0,
    discontinued: false,
    imageLink: "",
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
  const closeForm = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowForm(false);
    }, 300); // Match this duration with your CSS animation duration
  };

  // form submit handler
  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission behavior

    const requiredFields = [
      formData.productName,
      formData.supplierId,
      formData.categoryId,
      formData.quantityPerUnit,
      formData.unitPrice,
      formData.unitsInStock,
    ];

    // Check for empty required fields
    for (const field of requiredFields) {
      if (field === "" || field === 0) {
        setMessage("Please fill in all required fields.");
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setShowForm(true);
        }, 6000);
        return;
      }
    }

    const newProduct: Omit<ProductType, "productId"> = {
      productName: formData.productName,
      supplierId: Number(formData.supplierId),
      categoryId: Number(formData.categoryId),
      quantityPerUnit: formData.quantityPerUnit,
      unitPrice: Number(formData.unitPrice),
      unitsInStock: Number(formData.unitsInStock),
      unitsOnOrder: Number(formData.unitsOnOrder),
      reorderLevel: Number(formData.reorderLevel),
      discontinued: formData.discontinued,
      imageLink: formData.imageLink || null,
    };

    try {
      const response = await ProductService.create(newProduct);
      console.log(response);

      setMessage(`✅ Product "${newProduct.productName}" added successfully!`);
      setIsPositive(true);
      setShowMessage(true);

      setTimeout(() => setShowMessage(false), 5000);
      reload(!x); // trigger reload
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error adding new product:", axiosError);
      setMessage("❌ Failed to add product");
      setIsPositive(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 6000);
    } finally {
      closeForm();
    }

    setFormData({
      productName: "",
      supplierId: 0,
      categoryId: 0,
      quantityPerUnit: "",
      unitPrice: 0,
      unitsInStock: 0,
      unitsOnOrder: 0,
      reorderLevel: 0,
      discontinued: false,
      imageLink: "",
    });
  };

  return (
    <>
      <h3 className={styles.productAddTitle} onClick={() => setShowForm(true)}>
        (+) Adding new Product
      </h3>

      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${isClosing ? styles.closing : ""}`}>
            <h2 className={styles.productAddFormTitle}>Add New Product</h2>
            <form onSubmit={formSubmit} className={styles.productAddForm}>
              <div className={styles.formGrid}>
                <label>Product Name:</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />

                <label>Supplier ID:</label>
                <input
                  type="number"
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  required
                />

                <label>Category ID:</label>
                <input
                  type="number"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                />

                <label>Quantity Per Unit:</label>
                <input
                  type="text"
                  name="quantityPerUnit"
                  value={formData.quantityPerUnit}
                  onChange={handleChange}
                  required
                />

                <label>Unit Price:</label>
                <input
                  type="number"
                  step="0.01"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  required
                />

                <label>Units In Stock:</label>
                <input
                  type="number"
                  name="unitsInStock"
                  value={formData.unitsInStock}
                  onChange={handleChange}
                  required
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
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>

                <label>Image Link:</label>
                <input
                  type="text"
                  name="imageLink"
                  value={formData.imageLink}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.modalButtons}>
                <button className={styles.btn + " " + styles.add} type="submit">
                  Add Product
                </button>
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

export default ProductAdd;
