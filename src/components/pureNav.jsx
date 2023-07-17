import "@fortawesome/fontawesome-svg-core/styles.css";
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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "./themeContext";
export default function NavBarMobo({ user, allCarts, setTheme }) {
  const [currentNav, setCurrentNav] = useState("home");
  const myTheme = useContext(ThemeContext);

  function selectedNav(nav) {
    if (currentNav === nav) {
      return {
        backgroundColor: "white",
        color: myTheme,
        fontSize: "28px",
        borderTop: "2px solid " + myTheme,
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
        className="navHeading text-center "
        style={{
          backgroundColor: myTheme,
          color: "whitesmoke",
          padding: "6px",
        }}
      >
        <h3>Hyena comerce store</h3>
      </div>
      <nav className="mainNav bg-body-tertiary">
        <div className="navContent">
          <ul>
            <li className="col ">
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
            <li className="col " style={selectedNav("cart")}>
              <button className=" transparentButton">
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
                <span className="notification-badge">{allCarts.length}</span>
              )}
            </li>
            <li className="col " style={selectedNav("orderList")}>
              <button className=" transparentButton ">
                <Link to={"login/register"}>
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
                <FontAwesomeIcon
                  icon={faCircleUser}
                  onClick={() => setCurrentNav("profile")}
                  style={selectedNav("profile")}
                />
              </button>
            </li>
            <li className=" themeChanger col" style={selectedNav("setting")}>
              <button className="transparentButton">
                <FontAwesomeIcon
                  icon={faGear}
                  onClick={() => setCurrentNav("setting")}
                  style={selectedNav("setting")}
                />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
