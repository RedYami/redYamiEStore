import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Navbar, { Navbar1 } from "./components/navBar";
import Catagories from "./components/catagories";
import Items from "./components/items";
import Carts from "./components/cartOptions";
import Footer from "./components/footer";
import { myDatas } from "./components/datas";

function App() {
  const [selectedLi, setSelectedLi] = useState(0);
  const [requestCata, setRequestCata] = useState("fruit");
  const [allCarts, setAllCarts] = useState([]);
  const [itemOrCart, setItemOrCart] = useState(true); //default true to show item component
  const totalRef = useRef(0);
  const [isPaying, setIsPaying] = useState(false);
  const [pureData, setPureData] = useState(myDatas);
  console.log("main data level " + pureData.length);
  const lastItem = pureData[pureData.length - 1];
  console.log(
    "last added item " + lastItem.name + " " + lastItem.type + lastItem.value
  );
  function payment() {
    setIsPaying(true);
    setAllCarts([]); //clear all carts when payment is done
    setPureData(myDatas);
  }
  const status = isPaying && "We have sent Receipt to your email thank you :)";

  function addingRef() {
    for (let i = 0; i <= allCarts.length - 1; i++) {
      totalRef.current += allCarts[i].price;
    }
  }
  totalRef.current = 0;
  addingRef();

  function changeCata(cataType, Id) {
    setRequestCata(cataType);
    setSelectedLi(Id);
    setItemOrCart(true);
  }

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
  function priceUp(id) {
    setAllCarts(
      allCarts.map((cart) => {
        if (cart.id === id) {
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
  function priceDown(id) {
    setAllCarts(
      allCarts.map((cart) => {
        if (cart.id === id) {
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
  function navigation(Boolean) {
    setItemOrCart(Boolean);
    setIsPaying(false); //remove status when navigate
  }
  const postioner = itemOrCart ? (
    <Items
      cataType={requestCata}
      addCart={addNewCart}
      removeCart={removeCart}
      pureData={pureData}
    />
  ) : (
    <Carts
      allCarts={allCarts}
      removeCart={removeCart}
      priceUp={priceUp}
      priceDown={priceDown}
      totalPrice={totalRef.current}
      payment={payment}
    />
  );
  console.log(itemOrCart);
  return (
    <>
      <Navbar1 carts={allCarts} navigate={navigation} />
      <div className="components container-fluid row">
        <aside className={"col-4" + (itemOrCart === false ? " d-none" : "")}>
          <Catagories onListClick={changeCata} Id={selectedLi} />
        </aside>
        <div className="taskContainer col">{postioner}</div>
      </div>
      <div className="container-fluid">
        <h4 className="text-center text-success-emphasis">
          {isPaying && status}
        </h4>
      </div>
    </>
  );
}

export default App;
