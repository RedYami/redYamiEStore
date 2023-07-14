import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faCartShopping,
  faSpinner,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ThemeContext } from "./themeContext";

export default function Items({
  cataType,
  addCart,
  removeCart,
  pureData,
  filterText,
  currentUser,
}) {
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
      <div className="row">
        {filteredImages.map((data, index) => (
          <Images
            imgData={data}
            key={index}
            addCart={addCart}
            removeCart={removeCart}
            hidden={shouldHiddenOrAll(data.type)}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}

function Images({ imgData, addCart, hidden, currentUser }) {
  const [isLoading, setIsLoading] = useState(true); //is image loading
  const [isImageLoaded, setIsImageLoaded] = useState(false); //is image loaded
  const myTheme = useContext(ThemeContext);

  const loginErrorLog =
    currentUser === null ? (
      <i className="text-center text-danger">
        <b>login first to purchase</b>
      </i>
    ) : null;
  const buttonDisplay = currentUser && (
    <button
      className="addToCart col"
      title="add to cart"
      onClick={() => addCart(imgData)}
    >
      <FontAwesomeIcon icon={faCartShopping} style={{ color: "whitesmoke" }} />
    </button>
  );

  useEffect(() => {
    const image = new Image();
    image.src = imgData.source;
    image.onload = () => {
      setIsImageLoaded(true);
      setIsLoading(false);
    };

    return () => {
      image.onload = null; // Clean up the event handler
    };
  }, [imgData.source]);

  return (
    <>
      <div className={"col-6 " + (!hidden ? "d-none" : "")} key={imgData.name}>
        <div
          className="image-container mb-3 input-group shadow-lg rounded"
          style={{ backgroundColor: myTheme }}
        >
          {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
          {isImageLoaded && (
            <>
              <img
                src={imgData.source}
                alt={imgData.name}
                className="img-fluid "
                style={{
                  position: "relative",
                  // // border: "3px solid " + myTheme,
                  // borderRadius: "2%",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "3px",
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
            </>
          )}
          {isImageLoaded && (
            <div className="itemDetail row text-center">
              <span
                className="name col"
                style={{
                  fontFamily: "cursive",
                  color: "white",
                }}
              >
                {imgData.name}
              </span>
              <div
                className="price col"
                style={{
                  fontFamily: "cursive",
                  color: "white",
                }}
              >
                {imgData.value} kyats
              </div>
              {buttonDisplay}
            </div>
          )}
          {loginErrorLog}
        </div>
      </div>
    </>
  );
}
