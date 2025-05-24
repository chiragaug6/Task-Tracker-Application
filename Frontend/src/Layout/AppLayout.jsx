import React from "react";
import Header from "../Components/Header";

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default AppLayout;
