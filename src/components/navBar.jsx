import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faCartShopping,
  faHouse,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import reactLogo from "/src/assets/react.svg";
import { useState } from "react";

export default function Navbar({ carts, navigate, onSearch, Boolean }) {
  const [searchText, setSearchText] = useState("");
  console.log(Boolean);
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
                <button
                  className="nav-item-link transparentButton "
                  onClick={() => navigate(true)}
                >
                  <FontAwesomeIcon
                    icon={faHouse}
                    style={{ fontSize: "20px", color: "aquamarine" }}
                    title="home"
                  />
                </button>
              </li>
              <div className="notification-container nav-item">
                <button onClick={() => navigate(false)} className="cartButton">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    style={{ fontSize: "20px", color: "aquamarine" }}
                    title="cart"
                  />
                </button>
                {carts.length > 0 && (
                  <span className="notification-badge">{carts.length}</span>
                )}
              </div>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className={"d-flex" + (Boolean ? "" : " d-none")}>
              <input
                className="form-control me-2"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={() => onSearch(searchText)}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
