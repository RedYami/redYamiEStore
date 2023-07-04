import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faCartShopping, faFan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { myDatas } from "./datas";

export default function Items({ cataType, addCart, removeCart }) {
  function typeFilter() {
    const filteredList = myDatas.filter((data) => {
      return data.type === cataType;
    });
    return filteredList;
  }

  return (
    <div className="container itemContainer rounded">
      <div className="row">
        {myDatas.map((data) => (
          <Images
            imgData={data}
            key={data.id}
            addCart={addCart}
            removeCart={removeCart}
            shouldHidden={cataType === data.type}
          />
        ))}
      </div>
    </div>
  );
}

function Images({ imgData, addCart, removeCart, shouldHidden }) {
  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [addOrRemove, setAddOrRemove] = useState(true); // by default set add to cart to true

  const buttonDisplay = addOrRemove ? (
    <button
      className="addToCart"
      title="add to cart"
      onClick={() => {
        setAddOrRemove(!addOrRemove);
        addCart(imgData);
      }}
    >
      <FontAwesomeIcon icon={faCartShopping} style={{ color: "gray" }} />
    </button>
  ) : (
    <button
      className="addToCart"
      title="remove from cart"
      onClick={() => {
        setAddOrRemove(!addOrRemove);
        removeCart(imgData);
      }}
    >
      <FontAwesomeIcon icon={faCartShopping} style={{ color: "red" }} />
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
      <div className={"col-4 " + (!shouldHidden ? "d-none" : "")}>
        <div className="image-container mb-3">
          {isLoading && (
            <FontAwesomeIcon icon={faFan} spin className="fanLogo" />
          )}
          {isImageLoaded && (
            <img
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              src={imgData.source}
              alt={imgData.name}
              className="img-fluid rounded"
            />
          )}
          {isHover && isImageLoaded && (
            <div className="itemDetail" onMouseEnter={() => setIsHover(true)}>
              <div className="price">{imgData.value} kyats</div>
              {buttonDisplay}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
