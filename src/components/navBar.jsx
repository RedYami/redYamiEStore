import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faCartShopping,
  faHouse,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { cartData } from "./datas";
export default function Navbar({ carts, navigate }) {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={"/src/components/cancerLogo.png"}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
          </a>
          <div className="nav-item">
            <button
              className="nav-item-link transparentButton"
              onClick={() => navigate(true)}
            >
              <FontAwesomeIcon
                icon={faHouse}
                style={{ fontSize: "24px", color: "gray" }}
              />
            </button>
          </div>
          <div className="notification-container nav-item">
            <button onClick={() => navigate(false)}>
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ fontSize: "24px", color: "gray" }}
              />
            </button>
            {carts.length > 0 && (
              <span className="notification-badge">{carts.length}</span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export function Navbar1({ carts, navigate }) {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand " href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item ">
                <button
                  className="nav-item-link transparentButton "
                  onClick={() => navigate(true)}
                >
                  <span>Home</span>
                  <FontAwesomeIcon
                    icon={faHouse}
                    style={{ fontSize: "20px", color: "gray" }}
                  />
                </button>
              </li>
              <div className="notification-container nav-item">
                <button onClick={() => navigate(false)} className="cartButton">
                  <span>Cart</span>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    style={{ fontSize: "20px", color: "gray" }}
                  />
                </button>
                {carts.length > 0 && (
                  <span className="notification-badge">{carts.length}</span>
                )}
              </div>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
