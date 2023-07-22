import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
import {
  faCartShopping,
  faSpinner,
  faCircleInfo,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./themeContext";

export default function Items({
  cataType,
  addCart,
  removeCart,
  pureData,
  currentUser,
}) {
  const [addWithoutLogin, setAddWithoutLogin] = useState(false);
  const [filterText, setFilterText] = useState("");
  const myTheme = useContext(ThemeContext);

  function handleIsLogin(boolean) {
    setAddWithoutLogin(boolean);
  }
  const filteredImages = [];

  pureData.forEach((data) => {
    //for showing the data that only match with the search bar input(words)
    if (data.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
      filteredImages.push(data);
    }
  });
  function shouldHiddenOrAll(type) {
    //hiding the item in the coditions of the catagory type
    if (cataType === "all") {
      return true;
    } else {
      return type === cataType; //e.g cataType === fruits, show only the item that type is fruit
    }
  }

  return (
    <div className="itemContainer rounded">
      <div className="searchBar mb-2 p-2" style={{ backgroundColor: myTheme }}>
        <form className="d-flex">
          <input
            className="form-control me-2"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />

          <button className="btn btn-outline-success disabled" type="button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      <div className="row">
        {filteredImages.map((data, index) => (
          <Images
            imgData={data}
            key={index}
            addCart={addCart}
            removeCart={removeCart}
            hidden={shouldHiddenOrAll(data.type)}
            currentUser={currentUser}
            handleIsLogin={handleIsLogin}
          />
        ))}
      </div>
      {addWithoutLogin ? <LoginError handleIsLogin={handleIsLogin} /> : null}
    </div>
  );
}

function Images({ imgData, addCart, hidden, currentUser, handleIsLogin }) {
  // const [isLoading, setIsLoading] = useState(true); //is image loading
  // const [isImageLoaded, setIsImageLoaded] = useState(false); //is image loaded
  function userExist() {
    if (currentUser !== null) {
      return addCart(imgData);
    }
    handleIsLogin(true);
  }

  const myTheme = useContext(ThemeContext);
  const buttonDisplay = (
    <button
      className="transparentButton"
      title="add to cart"
      onClick={() => userExist()}
    >
      <FontAwesomeIcon icon={faCartShopping} style={{ color: "whitesmoke" }} />
    </button>
  );

  return (
    <>
      <div
        className={"col-4 mb-3 image-container " + (hidden ? null : "d-none")} //if hidden is true show image else display none image
        key={imgData.name}
      >
        <div className="">
          <img
            src={imgData.source}
            alt={imgData.name}
            className="img-fluid itemImage rounded"
            loading="lazy"
          />
          <span
            style={{
              position: "absolute",
              top: "2%",
              right: "16px",
              fontSize: "25px",
              color: "white",
              cursor: "pointer",
            }}
            title="item Detail"
          >
            <Link
              to={"detail/" + imgData.id}
              style={{
                textDecoration: "none",
                color: myTheme,
              }}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="rounded-circle p-1"
                style={{ backgroundColor: "white" }}
              />
            </Link>
          </span>
        </div>

        <div
          className="cartingFunction rounded mt-1 text-center"
          style={{ backgroundColor: myTheme }}
        >
          <div
            className="name "
            style={{
              fontFamily: "cursive",
              color: "white",
            }}
          >
            {imgData.name}
          </div>
          <div
            className="price rounded"
            style={{
              fontFamily: "cursive",
              color: "white",
              border: "1px solid white",
              padding: "2px",
            }}
          >
            {imgData.value} kyats
          </div>
          <div className="theee">{buttonDisplay}</div>
        </div>
      </div>
    </>
  );
}

function LoginError({ handleIsLogin }) {
  const navigate = useNavigate();
  function loginFirst() {
    return navigate("/setting/login");
  }
  return (
    <>
      <div className="confirmWidget-overlay">
        <div className="container confirmWidget">
          <div className="reminder">
            <h4 className="text-center">Please Login first to order</h4>
            <div className="buttons mt-2 ">
              <button
                onClick={() => handleIsLogin(false)}
                className="cancel btn btn-outline-warning"
              >
                cancel
              </button>
              <button
                className="confirm btn btn-outline-success "
                onClick={() => loginFirst()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
