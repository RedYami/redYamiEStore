import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faCartShopping,
  faListUl,
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
  addNewOrder,
}) {
  const [paying, setPaying] = useState(false);
  function isPaying(Boolean) {
    setPaying(Boolean);
  }
  const confirmNoti = paying && (
    <ConfirmWidget
      isPaying={isPaying}
      addNewOrder={addNewOrder}
      allCarts={allCarts}
      totalPrice={totalPrice}
    />
  ); //this widget pop up to confirm the user's order
  return (
    <>
      <div
        className="mainDiv"
        style={paying ? { pointerEvents: "none", zIndex: "-1" } : null}
      >
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
                <br />
                <span>
                  Your orders my be in the order list{" "}
                  <FontAwesomeIcon icon={faListUl} />
                </span>
              </h1>
            )}
          </div>
          <div className={allCarts.length > 0 ? "col" : "d-none"}>
            <Cashier totalPrice={totalPrice} isPaying={isPaying} />
          </div>
        </div>
        {confirmNoti}
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
            onClick={() => onMinusClick(cart)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span style={{}} className="quantity-text">
            {cart.quantity}
          </span>
          <button
            className="btn btn-outline-info"
            onClick={() => onPlusClick(cart)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </td>
    </>
  );
}
function Cashier({ totalPrice, isPaying }) {
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
        <button className="btn btn-secondary " onClick={() => isPaying(true)}>
          Order Now
        </button>
      </div>
    </>
  );
}

function ConfirmWidget({ isPaying, addNewOrder, allCarts, totalPrice }) {
  return (
    <>
      <div className="confirmWidget-overlay">
        <div className="container confirmWidget">
          <div className="reminder">
            <h4 className="text-center">Are you sure to order this</h4>
            <ul className="list-group">
              <li className="list-group-item row">
                <span className="col text-primary">Name</span>
                <span className="col text-primary">Quantity</span>
                <span className="col text-primary">Total price</span>
              </li>
              {allCarts.map((cart) => (
                <li className="list-group-item row" key={cart.name}>
                  <span className="col">{cart.name}</span>
                  <span className="col">{cart.quantity}</span>
                  <span className="col">{cart.price} kyats</span>
                </li>
              ))}
              <li className="list-group-item active">
                Total price + delivery fee = {totalPrice + parseInt(1000)} kyats
              </li>
            </ul>
            <div className="buttons mt-2 ">
              <button
                onClick={() => isPaying(false)}
                className="cancel btn btn-outline-warning"
              >
                cancel
              </button>
              <button
                className="confirm btn btn-outline-success"
                onClick={() => {
                  addNewOrder();
                  isPaying(false);
                }}
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
