import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useOutletContext } from "react-router-dom";
import {
  faCartShopping,
  faCaretRight,
  faCaretLeft,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { myDatas } from "./datas";
import { CurrentUser, ThemeContext } from "./themeContext";
export default function ItemDetail({ addNewCart }) {
  const { id } = useParams();
  const [index, setIndex] = useState(parseInt(id));
  const myTheme = useContext(ThemeContext);
  const currentUser = useContext(CurrentUser);

  const loginErrorLog =
    currentUser === null ? (
      <i className="text-danger">login first to purchase</i>
    ) : null; //when user is not login this log pop up

  const decreaseButton =
    index === 0 ? null : (
      <button
        className={"transparentButton rounded-5 "}
        style={{
          height: "50px",
          width: "50px",
          fontSize: "40px",
          marginRight: "4px",
          color: myTheme,
        }}
        onClick={() => setIndex((index) => index - 1)}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
    ); // decrease button should disappear when the index is minimum

  const increaseButton =
    index === myDatas.length - 1 ? null : (
      <button
        className="transparentButton rounded-5"
        style={{
          height: "50px",
          width: "50px",
          fontSize: "40px",
          marginLeft: "4px",
          color: myTheme,
        }}
        onClick={() => setIndex((index) => index + 1)}
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    ); // also increase button should disappear when the index num is maximum

  return (
    <>
      <div className="itemDetailMain">
        {decreaseButton}
        <div className="card mt-3" style={{ width: "18rem" }}>
          <img
            src={myDatas[index].source}
            className="card-img-top"
            alt="..."
            key={myDatas[index].id}
          />
          <div className="card-body">
            <h5 className="card-title">{myDatas[index].name}</h5>
            <span className="card-text">
              Made with some juicy meat, butter, tomato, bread and blah blah
              blah just try it to feel it.( just {myDatas[index].value} kyats)
            </span>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">production date : 2-5-2023</li>
            <li className="list-group-item">expired date : 3-9-2024</li>
            <li className="list-group-item">production code: 8D853L0</li>
          </ul>
          <div className="card-body imageDetailCart">
            <button className="card-link transparentButton">
              <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: "25px", color: "wheat" }}
                title="add to favourite"
              />
            </button>
            <a href="#" className="card-link">
              <button
                className={
                  "transparentButton " +
                  (currentUser === null ? "d-none" : null)
                } //cart button appear only when the user is login
                title="add to cart"
                onClick={() => addNewCart(myDatas[index])}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: myTheme, fontSize: "24px" }}
                />
              </button>
            </a>
          </div>
          {loginErrorLog}
        </div>
        {increaseButton}
      </div>
    </>
  );
}
