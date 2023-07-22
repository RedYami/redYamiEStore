import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEnvelope,
  faGear,
  faHouse,
  faListUl,
  faMagnifyingGlass,
  faPaperPlane,
  faRightFromBracket,
  faRightToBracket,
  faCircleUser,
  faFolderOpen,
  faAddressCard,
  faPersonCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "./themeContext";
export default function NavBarMobo({ user, allCarts, setTheme }) {
  const [currentNav, setCurrentNav] = useState("home");
  const myTheme = useContext(ThemeContext);
  const userName = user !== null ? user.user_name : <span>guest</span>;

  function selectedNav(nav) {
    if (currentNav === nav) {
      return {
        backgroundColor: "white",
        color: myTheme,
        fontSize: "28px",
        // borderTop: "2px solid " + myTheme,
      };
    } else {
      return {
        backgroundColor: myTheme,
        color: "white",
        fontSize: "28px",
      };
    }
  }
  return (
    <>
      <div
        className="navHeading "
        style={{
          backgroundColor: myTheme,
          color: "whitesmoke",
          padding: "6px",
          fontFamily: "cursive",
        }}
      >
        <h3>Hyena comerce store</h3>
        <div className="d-flex justify-content-center">
          <span className="" style={{ fontSize: "24px" }}>
            {userName}
          </span>
          <FontAwesomeIcon
            icon={faCircleUser}
            onClick={() => setCurrentNav("setting")}
            style={{ fontSize: "30px", padding: "6px" }}
            className=""
          />
        </div>
      </div>
      <nav className="mainNav bg-body-tertiary">
        <div className="navContent">
          <ul>
            <li className="col " style={selectedNav("home")}>
              <button className=" transparentButton ">
                <Link to={"/"}>
                  <FontAwesomeIcon
                    icon={faHouse}
                    title="Home"
                    style={selectedNav("home")}
                    onClick={() => setCurrentNav("home")}
                  />
                </Link>
              </button>
            </li>
            <li className="col CartNav " style={selectedNav("cart")}>
              <button
                className=" transparentButton"
                style={{ position: "relative" }}
              >
                <Link to={"Cart"}>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    onClick={() => setCurrentNav("cart")}
                    title="cart"
                    style={selectedNav("cart")}
                  />
                </Link>
              </button>
              {allCarts.length > 0 && (
                <span
                  className="bg-danger rounded-circle cartBadge"
                  style={{
                    width: "20px",
                    height: "20px",
                    fontSize: "15px",
                    position: "absolute",
                    right: "75%",
                    color: "white",
                  }}
                >
                  {allCarts.length}
                </span>
              )}
            </li>
            <li className="col " style={selectedNav("orderList")}>
              <button className=" transparentButton ">
                <Link to={"order-list"}>
                  <FontAwesomeIcon
                    icon={faListUl}
                    onClick={() => setCurrentNav("orderList")}
                    title="order list"
                    style={selectedNav("orderList")}
                  />
                </Link>
              </button>
            </li>
            <li className="col " style={selectedNav("inbox")}>
              <button className=" transparentButton ">
                <Link to={"inbox"}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    onClick={() => setCurrentNav("inbox")}
                    title="inbox-message"
                    style={selectedNav("inbox")}
                  />
                </Link>
              </button>
            </li>
            <li className="col " style={selectedNav("profile")}>
              <button className="transparentButton">
                <Link to={"message"}>
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    onClick={() => setCurrentNav("profile")}
                    style={selectedNav("profile")}
                    title="contact"
                  />
                </Link>
              </button>
            </li>
            <li className=" themeChanger col" style={selectedNav("setting")}>
              <button className="transparentButton">
                <Link to={"setting"}>
                  <FontAwesomeIcon
                    icon={faGear}
                    onClick={() => setCurrentNav("setting")}
                    style={selectedNav("setting")}
                  />
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
