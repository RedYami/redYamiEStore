import React from "react";
import { useRef, useState } from "react";
import "./App.css";
import "./CSS/home.css";
import "./CSS/items.css";
import "./CSS/message.css";
import "./CSS/nav.css";
import "./CSS/orders.css";
import "./CSS/setting.css";
import "./CSS/userInbox.css";
import { alphabet, myDatas, user_datas } from "./components/datas";
import { CurrentUser, ThemeContext } from "./components/themeContext";

import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Carts from "./components/cartOptions";
import MessageBox from "./components/message";
import OrderList from "./components/orders";
import Login from "./components/login";
import Register from "./components/register";
import UserInbox from "./components/userInbox";

import ItemDetail from "./components/itemDetail";
import ErrorPage from "./error-page";
import NavBarMobo from "./components/pureNav";
import Setting from "./components/setting";
import PolicyTerms from "./components/eStorePolicy";
import Privacy from "./components/privacyEdit";
import Loading from "./components/loadingMode";
let orderId = 0;
let userId = 2;
export default function App() {
  const [selectedLi, setSelectedLi] = useState(10);
  const [userDatas, setUserDatas] = useState(user_datas);
  const [requestCata, setRequestCata] = useState("all");
  const [allCarts, setAllCarts] = useState([]);
  const totalRef = useRef(0);
  const [pureData, setPureData] = useState(myDatas);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(userDatas[0]);
  const [messages, setMessages] = useState([]);
  const [currentNav, setCurrentNav] = useState("home");
  const [myTheme, setMyTheme] = useState("aqua");
  const [inboxMessage, setInboxMessage] = useState([
    {
      sender: "admin",
      id: 0,
      title: "noticing",
      type: "primary",
      message:
        "dear user your order have been canceled due to unavailable products sorry for unconvinence of us ,thank you for your ordering",
      watched: false,
    },
    {
      sender: "admin",
      id: 1,
      title: "success purchasement",
      type: "primary",
      message: "Dear user your your purchasement is success order code-6Y2D7UM",
      watched: false,
    },
    {
      sender: "admin",
      id: 2,
      type: "new item",
      title: "new item",
      message: "dear user there is new item we added check it out",
      watched: false,
    },
  ]);
  const [orderedList, setOrderedList] = useState([]);
  function setTheme(color) {
    setMyTheme(color);
  }
  function changeNav(nav) {
    setCurrentNav(nav);
  }
  function changeProfilePicture(picture) {
    setUserDatas(
      userDatas.map((user_data) => {
        if (user_data.user_id === user.user_id) {
          return {
            ...user_data,
            profile_picture: picture,
          };
        }
        return user_data;
      })
    );
    setUser({
      ...user,
      profile_picture: picture,
    });
  }

  totalRef.current = 0;
  addingRef();
  //when login is success successLogin()
  function successLogin(userName) {
    setUser(userDatas.find((user) => user.user_name === userName));
    setCurrentNav("home");
  }
  function onLogout() {
    setUser(null);
  }
  //////////userInbox message functions/////////
  function watchedMessage(id) {
    setInboxMessage((inboxMessage) =>
      inboxMessage.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            watched: true,
          };
        }
        return message;
      })
    );
  } //when the message is watched set "watched" key to true
  function deleteMessage(id) {
    setInboxMessage(inboxMessage.filter((message) => message.id !== id));
  }
  ///////////registration functions/////////
  function createUser(newUser) {
    setUserDatas((userDatas) => [
      ...userDatas,
      {
        user_id: userId++,
        user_name: newUser.user_name,
        email: newUser.email,
        password: newUser.password,
        address: newUser.address,
        phone_number: newUser.phone_number,
      },
    ]);
    setUser(newUser);
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
    setAllCarts([]); //clear all carts when addNewOrder is done
    setPureData(myDatas); //set all items to default mode (reset)
  }
  function deleteOrder(id) {
    setOrderedList(orderedList.filter((order) => order.id !== id));
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
    setIsLoading(true);
    async function updateCata() {
      return new Promise((resolve) => {
        setRequestCata(cataType);
        setSelectedLi(Id);
        resolve();
      });
    }
    updateCata().then(() => {
      setIsLoading(false);
    });
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

    const isAlreadyExist = allCarts.find((cart) => cart.id === newCart.id);
    //above line for making sure the user doesnt add the same item twice

    if (isAlreadyExist !== undefined) {
      return;
    }
    setAllCarts([...allCarts, newCart]);
    setPureData(pureData.filter((data) => data.id !== object.id));
  }

  function orderCodeGen(orderedList, min = 0, max = 9) {
    //this function generate the orderlist with order code
    let totalItems = 0;
    let totalPrice = 0;
    let user_name = user.user_name;
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
      totalItems += parseInt(cart.quantity);
      totalPrice += parseInt(cart.price);
    });
    return {
      quantity: totalItems,
      totalPrice: totalPrice + 1000,
      user_name: user_name,
      orderCode: simpleCodeGen(),
      approved: false,
      id: orderId++,
      originalOrder: orderedList,
    };
  }
  /////////Items Functions End/////

  return (
    <>
      <ThemeContext.Provider value={myTheme}>
        <CurrentUser.Provider value={user}>
          <div className="mainApp">
            <NavBarMobo
              allCarts={allCarts}
              currentNav={currentNav}
              setCurrentNav={changeNav}
            />

            <Outlet />
            {isLoading ? <Loading /> : null}
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
                  changeCata={changeCata}
                  selectedLi={selectedLi}
                />
              }
              errorElement={<ErrorPage />}
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
              path="order-list"
              element={
                <OrderList
                  orderedList={orderedList}
                  deleteOrder={deleteOrder}
                />
              }
            />
            <Route
              path="setting/login"
              element={<Login userDatas={userDatas} isLogin={successLogin} />}
            />
            <Route
              path="setting/login/register"
              element={
                <Register userDatas={userDatas} createUser={createUser} />
              }
            />
            <Route
              path="inbox"
              element={
                <UserInbox
                  messages={inboxMessage}
                  watchedMessage={watchedMessage}
                  deleteMessage={deleteMessage}
                />
              }
            />
            <Route
              path="detail/:id"
              element={<ItemDetail addNewCart={addNewCart} />}
            />
            <Route
              path="setting"
              element={
                <Setting onLogout={onLogout} changeApptheme={setTheme} />
              }
            />
            <Route path="setting/policy" element={<PolicyTerms />} />
            <Route
              path="setting/privacy"
              element={<Privacy changeProfilePicture={changeProfilePicture} />}
            />
          </Routes>
        </CurrentUser.Provider>
      </ThemeContext.Provider>
    </>
  );
}
