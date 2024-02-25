import React, { useState, useEffect } from "react";

function OilSection({ oils, oilTotalPrice, setOilTotalPrice }) {
  const [selectedOil, setSelectedOil] = useState(null);
  const [buyByMoney, setBuyByMoney] = useState(true);
  const [literAmount, setLiterAmount] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [warningText, setWarningText] = useState("Warning: Select oil !");

  const handleOilSelect = (e) => {
    const selectedOil = oils.find((oil) => oil.id === e.target.value);
    setSelectedOil(selectedOil);
  };

  useEffect(() => {
    if (selectedOil != null) {
      setWarningText("");
      let newPrice = 0;
      if (buyByMoney) {
        newPrice = Number(dollarAmount);
      } else {
        newPrice = selectedOil.price * literAmount;
      }
      setOilTotalPrice(newPrice.toFixed(2));
    } else {
      setWarningText("Warning: Select An Oil!");
    }
  }, [dollarAmount, literAmount, buyByMoney, selectedOil]);

  return (
    <fieldset className="container-fieldset">
      <div className="container">
        <div className="container-start">
          <div className="row oil-select-container">
            <h3>Oil</h3>
            <select onChange={handleOilSelect}>
              <option value="" disabled selected hidden>
                Select oil
              </option>
              {oils.map((oil) => (
                <option key={oil.id} value={oil.id}>
                  {oil.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row oil-select-container">
            <h3>Price</h3>
            <input
              readOnly
              type="text"
              value={
                selectedOil?.price != null
                  ? `${selectedOil?.price}$ / liter`
                  : "0"
              }
            ></input>
          </div>
          <div className="row">
            <label className="checkbox-label">
              <input
                min="0"
                type="radio"
                checked={buyByMoney}
                onChange={() => setBuyByMoney(true)}
              />
              Buy by Money
            </label>

            <input
              min="0"
              className="oil-input"
              type="number"
              placeholder={"Amount in dollars"}
              value={dollarAmount}
              onChange={(e) => setDollarAmount(e.target.value)}
              disabled={!buyByMoney}
            />
          </div>
          <div className="row">
            <label className="checkbox-label">
              <input
                type="radio"
                checked={!buyByMoney}
                onChange={() => setBuyByMoney(false)}
              />
              Buy by Liters
            </label>
            <input
              type="number"
              className="oil-input"
              placeholder="Liters"
              value={literAmount}
              onChange={(e) => setLiterAmount(e.target.value)}
              disabled={buyByMoney}
            />
          </div>
        </div>

        <div className="container-end">
          <fieldset className="price-fieldset">
            <div
              className="price-display"
              style={{ color: warningText !== "" ? "red" : "green" }}
            >
              {warningText !== "" ? warningText : `${oilTotalPrice}$`}
            </div>
          </fieldset>
        </div>
      </div>
    </fieldset>
  );
}

export default OilSection;
