import React, { useState } from "react";
import { useEffect } from "react";

function ProductSection({ products, setProductTotalPrice}) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalProductPrice, setTotalProductPrice] = useState(0);

  // Function to handle checkbox change
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      const updatedProduct = prevSelectedProducts[productId] || {
        isSelected: false,
        count: 0,
      };

      return {
        ...prevSelectedProducts,
        [productId]: {
          ...updatedProduct,
          isSelected: !updatedProduct.isSelected, // Toggle the selected state
        },
      };
    });
  };

  // Function to handle count change
  const handleCountChange = (productId, newCount) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: {
        ...prevSelectedProducts[productId],
        count: newCount,
      },
    }));
  };

  useEffect(() => {
    var total = products.reduce((total, product) => {
      var item = selectedProducts[product.id];
      if (item && item.isSelected) {
        return total + product.price * item.count;
      }
      return total;
    }, 0);

    setTotalProductPrice(total);
    setProductTotalPrice(total);
  }, [selectedProducts]);

  return (
    <fieldset className="container-fieldset">
      <div className="container">
        <div className="container-start">
          <div
            className="row"
            style={{ justifyContent: "flex-end", gap: "40px" }}
          >
            <p>Price</p>
            <p>Count</p>
          </div>
          <div className="section">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-container"
                style={{ justifyContent: "space-between" }}
              >
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedProducts[product.id]?.isSelected || false}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                  {product.name}
                </label>

                <div style={{ display: "flex", gap: "35px" }}>
                  <input className="oil-input" value={product.price} readOnly />

                  <input
                    className="oil-input"
                    type="number"
                    value={selectedProducts[product.id]?.count || 0}
                    min="0"
                    onChange={(e) =>
                      handleCountChange(
                        product.id,
                        parseInt(e.target.value) || 0
                      )
                    }
                    disabled={!selectedProducts[product.id]?.isSelected}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container-end">
          <fieldset className="price-fieldset">
            <div className="price-display">{totalProductPrice}$</div>
          </fieldset>
        </div>
      </div>
    </fieldset>
  );
}

export default ProductSection;
