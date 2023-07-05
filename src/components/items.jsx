import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faCartShopping, faFan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { myDatas } from "./datas";

export default function Items({ cataType, addCart, removeCart, pureData }) {
  return (
    <div className="itemContainer rounded">
      <div className="row">
        {pureData.map((data, index) => (
          <Images
            imgData={data}
            key={index}
            addCart={addCart}
            removeCart={removeCart}
            shouldHidden={cataType === data.type}
          />
        ))}
      </div>
    </div>
  );
}

function Images({ imgData, addCart, shouldHidden }) {
  const [isLoading, setIsLoading] = useState(true); //is image loading
  const [isImageLoaded, setIsImageLoaded] = useState(false); //is image loaded
  // const [addOrRemove, setAddOrRemove] = useState(true); // if true add to cart mode ,false is remove mode

  const buttonDisplay = (
    <button
      className="addToCart col"
      title="add to cart"
      onClick={() => {
        // setAddOrRemove(!addOrRemove);
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
      <div
        className={"col-6 " + (!shouldHidden ? "d-none" : "")}
        key={imgData.name}
      >
        <div className="image-container mb-3 input-group shadow-lg rounded">
          {isLoading && (
            <FontAwesomeIcon icon={faFan} spin className="fanLogo" />
          )}
          {isImageLoaded && (
            <img
              src={imgData.source}
              alt={imgData.name}
              className="img-fluid "
            />
          )}
          {isImageLoaded && (
            <div className="itemDetail row text-center">
              <p className="name col">{imgData.name}</p>
              <div className="price col">{imgData.value} kyats</div>
              {buttonDisplay}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
