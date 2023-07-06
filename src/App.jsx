import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faGear,
  faHouse,
  faListUl,
  faMagnifyingGlass,
  faPaperPlane,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import reactLogo from "/src/assets/react.svg";
import { useRef, useState } from "react";
import "./App.css";
import { myDatas } from "./components/datas";

import { Link, Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Carts from "./components/cartOptions";
import MessageBox from "./components/message";
export default function App() {
  const [selectedLi, setSelectedLi] = useState(10);
  const [requestCata, setRequestCata] = useState("all");
  const [allCarts, setAllCarts] = useState([]);
  const totalRef = useRef(0);
  const [isOrdering, setisOrdering] = useState(false);
  const [pureData, setPureData] = useState(myDatas);
  const [filterText, setFilterText] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("yami");
  console.log("messages' length " + messages.length);
  {
    messages.length > 0 && console.log("messages " + messages[0].message);
  }

  const status = isOrdering && (
    <span>
      Your order is in the wait list <FontAwesomeIcon icon={faListUl} />
    </span>
  );

  totalRef.current = 0;
  addingRef();
  /////////MessageBox Functions Start///////////
  function onSendMessage(messageObj) {
    setMessages((messages) => [
      ...messages,
      {
        user_name: messageObj.name,
        title: messageObj.title,
        message: messageObj.message,
      },
    ]);
  }
  /////////Carts Functions Start///////////
  function payment() {
    setisOrdering(true);
    setAllCarts([]); //clear all carts when payment is done
    setPureData(myDatas);
  }
  function addingRef() {
    for (let i = 0; i <= allCarts.length - 1; i++) {
      totalRef.current += allCarts[i].price;
    }
  }
  function priceUp(cartObj) {
    setAllCarts(
      allCarts.map((cart) => {
        if (cart.id === cartObj.id) {
          return {
            ...cart,
            price: cart.price + parseInt(cart.initialPrice),
            quantity: cart.quantity + 1,
          };
        }
        return cart;
      })
    );
  }
  function priceDown(cartObjD) {
    setAllCarts(
      allCarts.map((cart) => {
        if (cart.id === cartObjD.id) {
          if (cart.quantity === 1) {
            return cart;
          }
          return {
            ...cart,
            price: cart.price - parseInt(cart.initialPrice),
            quantity: cart.quantity - 1,
          };
        }
        return cart;
      })
    );
  }
  function removeCart(object) {
    setAllCarts(allCarts.filter((cart) => cart.id !== object.id));
    //retrive the data back from myData by id and add to pureData as it was delete from cart
    const retrivedData = myDatas.find((data) => data.id === object.id);
    setPureData([...pureData, retrivedData]);
  }
  /////////Carts Functions End///////////
  /////////Catagories Functions Start///////////
  function changeCata(cataType, Id) {
    setRequestCata(cataType);
    setSelectedLi(Id);
    setItemOrCart(true);
  }
  /////////Catagories Functions End/////
  /////////Items Functions Start/////
  function addNewCart(object) {
    const newCart = {
      name: object.name,
      price: object.value,
      id: object.id,
      quantity: 1,
      initialPrice: object.value,
      icon: object.source,
    };
    setAllCarts([...allCarts, newCart]);
    setPureData(pureData.filter((data) => data.id !== object.id));
  }
  /////////Items Functions End/////
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand " href="#">
            <img src={reactLogo} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <button className="nav-item-link transparentButton ">
                  <Link to={"/"}>
                    <FontAwesomeIcon
                      icon={faHouse}
                      style={{ fontSize: "22px", color: "aqua" }}
                      title="home"
                    />
                  </Link>
                </button>
              </li>
              <li className="notification-container nav-item">
                <button className="cartButton">
                  <Link to={"Cart"}>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      style={{ fontSize: "22px", color: "aqua" }}
                      title="cart"
                    />
                  </Link>
                </button>
                {allCarts.length > 0 && (
                  <span className="notification-badge">{allCarts.length}</span>
                )}
              </li>
              <li className="nav-item ">
                <button className="nav-item-link transparentButton ">
                  <Link to={"Order-list"}>
                    <FontAwesomeIcon
                      icon={faListUl}
                      style={{ fontSize: "22px", color: "aqua" }}
                      title="order list"
                    />
                  </Link>
                </button>
              </li>
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon
                    icon={faGear}
                    style={{ fontSize: "22px", color: "aqua" }}
                  />
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={"message"} className="dropdown-item " href="#">
                      <span className="messageLink">message </span>
                      <div>
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          style={{ color: "green" }}
                        />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      something
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {isLogin ? (
                        <>
                          <span>Logout</span>
                          <FontAwesomeIcon
                            icon={faRightFromBracket}
                            style={{ color: "red" }}
                          />
                        </>
                      ) : (
                        <>
                          <span>Login</span>
                          <FontAwesomeIcon
                            icon={faRightToBracket}
                            style={{ color: "green" }}
                          />
                        </>
                      )}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />

              <button
                className="btn btn-outline-success disabled"
                type="button"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div id="detail" className="">
        <Outlet />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              requestCata={requestCata}
              addNewCart={addNewCart}
              removeCart={removeCart}
              pureData={pureData}
              filterText={filterText}
              changeCata={changeCata}
              selectedLi={selectedLi}
            />
          }
        />

        <Route
          path="Cart"
          element={
            <Carts
              allCarts={allCarts}
              removeCart={removeCart}
              priceUp={priceUp}
              priceDown={priceDown}
              totalPrice={totalRef.current}
              payment={payment}
            />
          }
        />
        <Route
          path="message"
          element={<MessageBox user={user} onSendMessage={onSendMessage} />}
        />
      </Routes>
    </>
  );
}
