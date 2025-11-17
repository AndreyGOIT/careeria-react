import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./componets/homePage_components/Home.tsx";
import CustomerList from "./componets/customer_components/CustomerList.tsx";
import ProductList from "./componets/product_components/ProductList.tsx";
import UserList from "./componets/user_components/UserList.tsx";
import Message from "./componets/Message.tsx";
// Navigate component for routing
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./componets/login_components/Login.tsx";
import Footer from "./componets/Footer.tsx";
import ProtectedRoute from "./componets/ProtectedRoute.tsx";
import LoaderOverlay from "./componets/ui/loaderOverlay/LoaderOverlay.tsx";

const App = () => {
  const navigate = useNavigate();
  // Example state for message component
  const [message, setMessage] = useState(
    "Welcome to the Northwind application!"
  );
  const [isPositive, setIsPositive] = useState(true);
  const [showMessage, setShowMessage] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const location = useLocation();
  const [isRouteLoading, setIsRouteLoading] = useState(false);

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

  // Detect route change
  useEffect(() => {
    setIsRouteLoading(true);
    const timeout = setTimeout(() => setIsRouteLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="app-container">
      {/* Navigation */}
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
                <Nav.Link href="/products">Products</Nav.Link>
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

      {/* Main contant */}
      <main className="main-content">
        {/* Messages */}
        {showMessage && <Message message={message} isPositive={isPositive} />}

        {/* Loader Overlay */}
        {isRouteLoading && <LoaderOverlay />}

        {/* Route-based content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/customers"
            element={
              <ProtectedRoute requiredRole={2}>
                <CustomerList
                  setMessage={setMessage}
                  setShowMessage={setShowMessage}
                  setIsPositive={setIsPositive}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute requiredRole={2}>
                <ProductList
                  setMessage={setMessage}
                  setShowMessage={setShowMessage}
                  setIsPositive={setIsPositive}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRole={1}>
                <UserList
                  setMessage={setMessage}
                  setShowMessage={setShowMessage}
                  setIsPositive={setIsPositive}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
