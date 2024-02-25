import "./App.css";
import OILS from "./Oils";
import PRODUCTS from "./Foods";
import OilSection from "./OilSection";
import ProductSection from "./FoodSection";
import Buy from "./Buy";
import { useState, useEffect } from "react";


function App() {
  const [oils, setOils] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [oilTotalPrice, setOilTotalPrice] = useState(0);
  const [productTotalPrice, setProductTotalPrice] = useState(0);

  useEffect(() => {
    setOils(OILS);
    setProducts(PRODUCTS);
  }, []);

  useEffect(() => {
    setTotalPrice(Number(productTotalPrice) + Number(oilTotalPrice));
  }, [productTotalPrice, oilTotalPrice]);

  return (
    <div className="App">
      <label className="label">AZPETROL</label>
      <main>
        <div className="sections-container">
          <OilSection
            oils={oils}
            oilTotalPrice={oilTotalPrice}
            setOilTotalPrice={setOilTotalPrice}
          />
          <ProductSection
            products={products}
            setProductTotalPrice={setProductTotalPrice}
          />
          <Buy totalPrice={totalPrice} />
        </div>
      </main>
    </div>
  );
}

export default App;
