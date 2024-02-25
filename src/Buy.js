import React from 'react'

export default function Buy({totalPrice}) {
  return (
    <fieldset className="buy-container">
    <h2>Total Price: ${totalPrice}</h2>
    <button>Buy</button>
  </fieldset>
  )
}
