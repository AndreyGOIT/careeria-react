import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import CustomerList from "./componets/customer_components/CustomerList.tsx";
import Message from "./Message.tsx";
// Navigate component for routing
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Laskuri from "./componets/Laskuri.tsx";
import UserList from "./componets/user_components/UserList.tsx";
import Login from "./componets/Login.tsx";

const App = () => {
  const navigate = useNavigate();
  // Example state for message component
  const [message, setMessage] = useState(
    "Welcome to the Northwind application!"
  );
  const [isPositive, setIsPositive] = useState(true);
  const [showMessage, setShowMessage] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("accesslelevel");

    setMessage("✅ Logged out successfully.");
    setIsPositive(true);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);

    // ✅ Перенаправляем на главную
    navigate("/");
  };

  // ✅ При запуске приложения восстанавливаем пользователя из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/" style={{ paddingLeft: 15 }}>
          Northwind App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* Показываем ссылки, если пользователь залогинен */}
            {loggedInUser && (
              <>
                <Nav.Link href="/customers">Customers</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </>
            )}
          </Nav>
          {/* Если пользователь не залогинен — показываем Login */}
          {!loggedInUser && (
            <Login
              setMessage={setMessage}
              setShowMessage={setShowMessage}
              setIsPositive={setIsPositive}
              setLoggedInUser={setLoggedInUser}
            />
          )}
          {/* Если залогинен — показываем Logout */}
          {loggedInUser && (
            <>
              <span style={{ color: "white", marginRight: 15 }}>
                Logged in as: {loggedInUser}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  marginRight: 15,
                  padding: "5px 10px",
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "#007bff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Logout
              </button>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>

      {showMessage && <Message message={message} isPositive={isPositive} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="home-page">
                <h1 style={{ textAlign: "center" }}>Home Page</h1>
                <h2 className="title-center">
                  React + Vite{" "}
                  <span className="highlight">/ .NET Core API</span>
                </h2>
              </div>
              <Laskuri />
            </>
          }
        />
        <Route
          path="/customers"
          element={
            <CustomerList
              setMessage={setMessage}
              setShowMessage={setShowMessage}
              setIsPositive={setIsPositive}
            />
          }
        />
        <Route
          path="/users"
          element={
            <UserList
              setMessage={setMessage}
              setShowMessage={setShowMessage}
              setIsPositive={setIsPositive}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
