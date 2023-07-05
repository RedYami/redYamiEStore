import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faCartShopping,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Carts({
  allCarts,
  removeCart,
  priceUp,
  priceDown,
  totalPrice,
  payment,
}) {
  return (
    <>
      <div className="mainDiv">
        <div className=" row cart-table">
          <div className="col itemTable">
            <table className="table text-center">
              <thead className="table-dark" style={{ height: "40px" }}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">icon</th>
                  <th scope="col">name</th>
                  <th scope="col">price</th>
                  <th scope="col">quantity</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {allCarts.map((cart, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="img-column">
                      <img
                        src={`${cart.icon}`}
                        alt="icon"
                        className="img-fluid img-thumbnail"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </td>
                    <td>{cart.name}</td>
                    <td>{cart.price}</td>
                    <Modifier
                      cart={cart}
                      onPlusClick={priceUp}
                      onMinusClick={priceDown}
                    />
                    <td>
                      <button
                        className="transparentButton"
                        onClick={() => removeCart(cart)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "red" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {allCarts.length < 1 && (
              <h1 className="container text-center ">
                Cart <FontAwesomeIcon icon={faCartShopping} /> is empty :)
              </h1>
            )}
          </div>
          <div className={allCarts.length > 0 ? "col" : "d-none"}>
            <Cashier totalPrice={totalPrice} payment={payment} />
          </div>
        </div>
      </div>
    </>
  );
}

function Modifier({ cart, onPlusClick, onMinusClick }) {
  return (
    <>
      <td className="quantity-cell">
        <div className="input-group quantity-container ">
          <button
            className="btn btn-outline-info"
            onClick={() => onMinusClick(cart.id)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span style={{}} className="quantity-text">
            {cart.quantity}
          </span>
          <button
            className="btn btn-outline-info"
            onClick={() => onPlusClick(cart.id)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </td>
    </>
  );
}
function Cashier({ totalPrice, payment }) {
  return (
    <>
      <div className="cashier">
        <h3
          className="bg-dark text-center"
          style={{ color: "white", height: "40px" }}
        >
          Cashier
        </h3>
        <div className="totalCash list-group">
          <li className="list-group-item LRdisplay">
            <h5>Total price</h5>
            <p>{totalPrice}ks</p>
          </li>
          <li className="list-group-item LRdisplay">
            <h5>Delivery fee</h5>
            <p>1000ks</p>
          </li>
        </div>
        <hr />
        <div className="LRdisplay">
          <h2>Total</h2>
          <h4>{totalPrice + parseInt(1000)}ks</h4>
        </div>
        <button className="btn btn-secondary " onClick={payment}>
          Pay Now
        </button>
      </div>
    </>
  );
}
