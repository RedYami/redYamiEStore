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
            E store
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
