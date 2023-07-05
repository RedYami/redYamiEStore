import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faCartShopping, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Items({
  cataType,
  addCart,
  removeCart,
  pureData,
  filterText,
}) {
  const filteredImages = [];

  pureData.forEach((data) => {
    if (data.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
      filteredImages.push(data);
    }
  });
  function shouldHiddenOrAll(type) {
    console.log("catagories type " + cataType);
    if (cataType === "all") {
      return true;
    } else {
      return type === cataType;
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
          />
        ))}
      </div>
    </div>
  );
}

function Images({ imgData, addCart, hidden }) {
  const [isLoading, setIsLoading] = useState(true); //is image loading
  const [isImageLoaded, setIsImageLoaded] = useState(false); //is image loaded

  const buttonDisplay = (
    <button
      className="addToCart col"
      title="add to cart"
      onClick={() => {
        addCart(imgData);
      }}
    >
      <FontAwesomeIcon icon={faCartShopping} style={{ color: "gray" }} />
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
        <div className="image-container mb-3 input-group shadow-lg rounded">
          {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
          {isImageLoaded && (
            <img
              src={imgData.source}
              alt={imgData.name}
              className="img-fluid "
            />
          )}
<<<<<<< HEAD
          {isHover && isImageLoaded && (
            <div
              className="itemDetail container-fluid"
              onMouseEnter={() => setIsHover(true)}
            >
              <div className="price">{imgData.value} kyats</div>
=======
          {isImageLoaded && (
            <div className="itemDetail row text-center">
              <p className="name col">{imgData.name}</p>
              <div className="price col">{imgData.value} kyats</div>
>>>>>>> itemDetail
              {buttonDisplay}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
