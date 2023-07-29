import "@fortawesome/fontawesome-svg-core/styles.css";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import {
  faCartShopping,
  faCaretRight,
  faCaretLeft,
  faStar,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { myDatas } from "./datas";
import { motion } from "framer-motion";
import { CurrentUser, ThemeContext } from "./themeContext";
export default function ItemDetail({ addNewCart, changeNav }) {
  const { id } = useParams();
  const [index, setIndex] = useState(parseInt(id));
  const myTheme = useContext(ThemeContext);
  const currentUser = useContext(CurrentUser);
  const [loadingPre, setLoadingPre] = useState(true);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingMain, setLoadingMain] = useState(true);
  const navigate = useNavigate();
  function backSetting() {
    navigate("/");
  }
  console.log(index);
  console.log(myDatas[index].source);
  useEffect(() => changeNav("home"));
  useEffect(() => {
    const img = new Image();
    img.src = myDatas[index].source;
    img.onload = () => {
      setLoadingMain(false);
    };
  }, [index]);
  useEffect(() => {
    if (index !== 0) {
      const img = new Image();
      img.src = myDatas[index - 1].source;
      img.onload = () => {
        setLoadingPre(false);
      };
    }
  }, [index]);
  useEffect(() => {
    if (index !== myDatas.length - 1) {
      const img = new Image();
      img.src = myDatas[index + 1].source;
      img.onload = () => {
        setLoadingPost(false);
      };
    }
  }, [index]);

  const loginErrorLog =
    currentUser === null ? (
      <i className="text-danger">login first to purchase</i>
    ) : null; //when user is not login this log pop up

  const decreaseButton = (
    <button
      className={"transparentButton rounded-5 "}
      style={{
        height: "50px",
        width: "50px",
        fontSize: "40px",
        marginRight: "4px",
        color: myTheme,
      }}
      onClick={() => {
        setIndex((index) => index - 1);
        setLoadingMain(true);
        setLoadingPre(true);
        setLoadingPost(true);
      }}
      disabled={index === 0 ? true : false}
    >
      <FontAwesomeIcon icon={faCaretLeft} />
    </button>
  );
  // decrease button should disappear when the index is minimum

  const increaseButton = (
    <button
      className={"transparentButton rounded-5 "}
      style={{
        height: "50px",
        width: "50px",
        fontSize: "40px",
        marginLeft: "4px",
        color: myTheme,
      }}
      onClick={() => {
        setIndex((index) => index + 1);
        setLoadingMain(true);
        setLoadingPre(true);
        setLoadingPost(true);
      }}
      disabled={index === myDatas.length - 1 ? true : false}
    >
      <FontAwesomeIcon icon={faCaretRight} />
    </button>
  );
  // also increase button should disappear when the index num is maximum

  return (
    <>
      <div
        className="d-flex justify-content-start transparentButton"
        onClick={backSetting}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <FontAwesomeIcon
          className=""
          icon={faArrowAltCircleLeft}
          style={{ color: myTheme, fontSize: "30px" }}
        />
        back
      </div>
      <div className="itemDetailMain">
        <div className="preImgDiv shadow">
          {loadingPre ? (
            <div className="spinner-grow border text-center"></div>
          ) : index === 0 ? null : (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={myDatas[index - 1].source}
              className="img-fluid preImg"
              key={myDatas[index - 1].source}
            />
          )}
        </div>

        {decreaseButton}
        <div className="card mt-3 " style={{ width: "18rem" }}>
          {loadingMain ? (
            <div className="spinner-grow" style={{ margin: "auto" }}></div>
          ) : (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={myDatas[index].source}
              className="card-img-top mainImg"
              alt="..."
              key={myDatas[index].id}
            />
          )}

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

        <div className="postImgDiv shadow">
          {loadingPre ? (
            <div className="spinner-grow border text-center"></div>
          ) : index === myDatas.length - 1 ? null : (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={myDatas[index + 1].source}
              className="img-fluid postImg"
              key={myDatas[index + 1].source}
            />
          )}
        </div>
      </div>
    </>
  );
}
