import { useState } from "react";
import "./App.css";
import CustomerList from "./componets/customer_components/CustomerList.tsx";
import Message from "./Message.tsx";
// Navigate component for routing
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Laskuri from "./componets/Laskuri.tsx";
import UserList from "./componets/user_components/UserList.tsx";

const App = () => {
  // Example state for message component
  const [message, setMessage] = useState(
    "Welcome to the Northwind application!"
  );
  const [isPositive, setIsPositive] = useState(true);
  const [showMessage, setShowMessage] = useState(true);

  return (
    <>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/" style={{ paddingLeft: 15 }}>
            Northwind App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/customers">Customers</Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
            </Nav>
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
      </Router>
    </>
  );
};

export default App;
