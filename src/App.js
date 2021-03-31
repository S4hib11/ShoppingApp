import React, { useState, useContext } from "react";
import Header from "./components/Header";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import { GlobalProvider } from "./context/GlobalContext";
import { GlobalContext } from "./context/GlobalContext";
import "./styles.css";

export default function App() {
  const context = useContext(GlobalContext);
  const [data, setData] = useState(context.items);

  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <Cart />
        <Shop data={data} setData={setData} />
      </div>
    </GlobalProvider>
  );
}
