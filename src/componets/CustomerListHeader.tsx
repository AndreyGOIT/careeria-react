import { useState, useEffect } from "react";
import "../styles/CustomerList.css";

const CustomerListHeader = () => {
  const [show, setShow] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  // Останавливаем пульсацию при клике
  useEffect(() => {
    if (!show) setPulsing(false);
  }, [show]);

  return (
    <h2
      className={`customer-list-title ${pulsing ? "pulsing" : ""}`}
      onClick={() => setShow(!show)}
    >
      Customers
    </h2>
  );
};

export default CustomerListHeader;
