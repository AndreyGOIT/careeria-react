import { useState } from "react";
import "./App.css";
import CustomerList from "./componets/CustomerList.tsx";
import Message from "./Message.tsx";

const App = () => {
  // Example state for message component
  const [message, setMessage] = useState(
    "Welcome to the Northwind application!"
  );
  const [isPositive, setIsPositive] = useState(true);
  const [showMessage, setShowMessage] = useState(true);

  return (
    <>
      <h1 className="title-center">
        React + Vite <span className="highlight">/ .NET Core API</span>
      </h1>

      {showMessage && <Message message={message} isPositive={isPositive} />}
      <CustomerList
        setMessage={setMessage}
        setShowMessage={setShowMessage}
        setIsPositive={setIsPositive}
      />
    </>
  );
};

export default App;
