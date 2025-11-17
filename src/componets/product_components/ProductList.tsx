import { useState, useEffect } from "react";
import ProductService from "../../services/ProductService";
import type { Product } from "../../types/ProductType";
import styles from "./Product.module.css";
import ProductCard from "./ProductCard";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";

import type { Dispatch, SetStateAction } from "react";
import ConfirmDeleteModal from "../ui/confirm/ConfirmDeleteModal";
import LoaderOverlay from "../ui/loaderOverlay/LoaderOverlay";

interface ProductListProps {
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setIsPositive: Dispatch<SetStateAction<boolean>>;
}

const ProductList: React.FC<ProductListProps> = ({
  setMessage,
  setShowMessage,
  setIsPositive,
}) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  // state to trigger re-fetching of products
  const [x, reload] = useState(false);
  const [search, setSearch] = useState("");
  // Handler for delete request from ProductCard
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditRequest = (product: Product) => {
    setEditingProduct(product);
    console.log("Editing product: ", product);
    setShowEditModal(true);
  };

  const handleDeleteRequest = (product: Product) => {
    setSelectedProduct(product);
    console.log("Selected product: ", product);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await ProductService.remove(selectedProduct.productId);
      reload(!x);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setShowConfirm(false);
      setSelectedProduct(null);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    ProductService.getAll()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => setLoading(false));
  }, [x, show]);

  return loading ? (
    <LoaderOverlay />
  ) : (
    <>
      <h2
        className={`${styles.productListTitle} ${show ? "" : styles.pulsing}`}
        onClick={() => setShow(!show)}
      >
        Products
      </h2>
      <ProductAdd
        x={x}
        reload={reload}
        setMessage={setMessage}
        setShowMessage={setShowMessage}
        setIsPositive={setIsPositive}
      />
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by product name..."
        className={styles.productSearchInput}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <hr />
      {/* products list */}
      {show && (
        <div className={styles.productListGrid}>
          {products &&
            products.map((p: Product) => {
              if (
                p.productName.toLowerCase().indexOf(search.toLowerCase()) === -1
              ) {
                return null; // does not match search, skip rendering
              }

              if (p.productName.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <ProductCard
                    key={p.productId}
                    product={p}
                    onEdit={handleEditRequest}
                    onDelete={handleDeleteRequest}
                  />
                );
              }
            })}
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <ProductEdit
          product={editingProduct}
          x={x}
          reload={reload}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          setIsPositive={setIsPositive}
          closeForm={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        show={showConfirm}
        itemName={selectedProduct?.productName ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default ProductList;
