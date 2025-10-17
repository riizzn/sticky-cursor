import React, { useRef } from "react";
import Header from "./components/Header";
import StickyCursor from "./components/StickyCursor";

const App = () => {
  const stickyElement = useRef(null);

  return (
    <main>
      <Header ref={stickyElement} />
      <StickyCursor stickyElement={stickyElement} />
    </main>
  );
};

export default App;
