import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
