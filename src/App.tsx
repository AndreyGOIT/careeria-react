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
import Footer from "./componets/Footer.tsx";

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
    // ✅ Clear user session on logout
    localStorage.clear();
    setLoggedInUser(null);

    setMessage("✅ Logged out successfully.");
    setIsPositive(true);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);

    // ✅ redirect to home page after logout
    navigate("/");
  };

  // ✅ Check for logged-in user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  return (
    <div className="app-container">
      {/* Навигация */}
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
        <Navbar.Brand href="/" className="navbar-brand">
          Northwind App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {loggedInUser && (
              <>
                <Nav.Link href="/customers">Customers</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </>
            )}
          </Nav>

          {!loggedInUser ? (
            <Login
              setMessage={setMessage}
              setShowMessage={setShowMessage}
              setIsPositive={setIsPositive}
              setLoggedInUser={setLoggedInUser}
            />
          ) : (
            <div className="user-info">
              <span className="logged-user">Logged in as: {loggedInUser}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>

      {/* Основной контент */}
      <main className="main-content">
        {/* Сообщения */}
        {showMessage && <Message message={message} isPositive={isPositive} />}
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                <h1>Home Page</h1>
                <h2 className="title-center">
                  React + Vite{" "}
                  <span className="highlight">/ .NET Core API</span>
                </h2>
                <Laskuri />
              </div>
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
      </main>

      {/* Футер */}
      <Footer />
    </div>
  );
};

export default App;
