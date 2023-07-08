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
import { alphabet, myDatas, user_datas } from "./components/datas";

import { Link, Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Carts from "./components/cartOptions";
import MessageBox from "./components/message";
import OrderList from "./components/orders";
import Login from "./components/login";
import Register from "./components/register";
export default function App() {
  const [selectedLi, setSelectedLi] = useState(10);
  const [userDatas, setUserDatas] = useState(user_datas);
  const [requestCata, setRequestCata] = useState("all");
  const [allCarts, setAllCarts] = useState([]);
  const totalRef = useRef(0);
  const [isOrdering, setisOrdering] = useState(false);
  const [pureData, setPureData] = useState(myDatas);
  const [filterText, setFilterText] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("yami");
  const [orderedList, setOrderedList] = useState([]);
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
  function successLogin() {
    setIsLogin(true);
  }
  ///////////registration functions/////////
  function createUser(newUser) {
    setUserDatas((userDatas) => [
      ...userDatas,
      {
        user_name: newUser.user_name,
        email: newUser.email,
        password: newUser.password,
        address: newUser.address,
        phone_number: newUser.phone_number,
      },
    ]);
  }

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
  function addNewOrder() {
    setOrderedList((orderedList) => [...orderedList, orderCodeGen(allCarts)]);
    setisOrdering(true);
    setAllCarts([]); //clear all carts when addNewOrder is done
    setPureData(myDatas); //set all items to default mode (reset)
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
  function orderCodeGen(orderedList, min = 0, max = 10) {
    let totalItems = 0;
    let totalPrice = 0;
    let user_name = "yami";
    function simpleCodeGen() {
      let code = "";
      const numOrAlphabet = ["num", "alpha"]; //we dont want alternatvie codes so we toogle number and alphabet
      min = Math.ceil(min); // Round up the minimum value
      max = Math.floor(max); // Round down the maximum value
      for (let i = 0; i < 7; i++) {
        const alphaIndex = Math.floor(Math.random() * alphabet.length);
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        const randomToogle = Math.floor(Math.random() * 2);
        if (numOrAlphabet[randomToogle] === "alpha") {
          code += alphabet[alphaIndex];
        } else {
          code += JSON.stringify(randomInt);
        }
      }
      return code;
    }

    orderedList.forEach((cart) => {
      totalItems += parseInt(1);
      totalPrice += parseInt(cart.price);
    });
    return {
      quantity: totalItems,
      totalPrice: totalPrice + 1000,
      user_name: user_name,
      orderCode: simpleCodeGen(),
      approved: false,
    };
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
                    <div className="dropdown-item">
                      {isLogin ? (
                        <>
                          <div onClick={setIsLogin(false)}>
                            <span>Logout</span>
                            <FontAwesomeIcon
                              icon={faRightFromBracket}
                              style={{ color: "red" }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <Link to={"login"}>
                            <span>Login</span>
                            <FontAwesomeIcon
                              icon={faRightToBracket}
                              style={{ color: "green" }}
                            />
                          </Link>
                        </>
                      )}
                    </div>
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
              addNewOrder={addNewOrder}
            />
          }
        />
        <Route
          path="message"
          element={<MessageBox user={user} onSendMessage={onSendMessage} />}
        />
        <Route
          path="Order-list"
          element={<OrderList orderedList={orderedList} />}
        />
        <Route
          path="login"
          element={<Login userDatas={userDatas} isLogin={successLogin} />}
        />
        <Route
          path="login/register"
          element={
            <Register
              userDatas={userDatas}
              isLogin={isLogin}
              createUser={createUser}
            />
          }
        />
      </Routes>
    </>
  );
}
