// import React from "react";

const Footer = () => {
  return (
    <>
      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          marginTop: "auto",
          backgroundColor: "#263d55",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} Northwind App. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
