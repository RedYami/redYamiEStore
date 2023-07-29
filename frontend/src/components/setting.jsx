import {
  faCircleChevronDown,
  faCircleUser,
  faCoins,
  faDroplet,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { motion } from "framer-motion";
import { CurrentUser, ThemeContext } from "./themeContext";
import { Link, useNavigate } from "react-router-dom";
import LoginError from "./loginFirstError";

export default function Setting({
  onLogout,
  changeApptheme,
  redeemPoints,
  changeNav,
}) {
  const myTheme = useContext(ThemeContext);
  const currentUser = useContext(CurrentUser);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => changeNav("setting"));
  const logMode =
    currentUser === null ? (
      <Link to={"/setting/login"} className="fontAwesome">
        <FontAwesomeIcon
          icon={faRightToBracket}
          style={{ fontSize: "40px", color: myTheme }}
        />
        <span style={{ textDecoration: "none" }}>login</span>
      </Link>
    ) : (
      <div
        className="fontAwesome"
        onClick={(e) => {
          //   e.stopPropagation();
          onLogout();
        }}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{ fontSize: "40px", color: "red" }}
        />
        <span>Logout</span>
      </div>
    );
  function handleProfileRoute() {
    if (currentUser !== null) {
      return navigate("/setting/privacy");
    }
    setLoginError(true);
  }
  function handleIsLogin(boolean) {
    setLoginError(boolean);
  }
  return (
    <>
      <ReedemPoint redeemPoints={redeemPoints} />
      <ChangeTheme changeApptheme={changeApptheme} />
      <div className="settingDiv bg-body-tertiary">
        <div className="settingOption ">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="options rounded shadow mb-5"
          >
            <div className="fontAwesome" onClick={handleProfileRoute}>
              <FontAwesomeIcon
                icon={faCircleUser}
                style={{ fontSize: "40px", color: myTheme }}
              />
              <span>Profile</span>
            </div>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="options rounded shadow"
          >
            <div className="fontAwesome">
              <FontAwesomeIcon
                icon={faCircleChevronDown}
                style={{ fontSize: "40px", color: myTheme }}
              />
              <span>Activities</span>
            </div>
          </motion.div>
        </div>
        <div className="settingOption  ">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="options rounded shadow mb-5"
          >
            <Link to={"/setting/policy"} className="fontAwesome ">
              <FontAwesomeIcon
                icon={faUser}
                style={{ fontSize: "40px", color: myTheme }}
              />
              <span style={{ textDecoration: "none" }}>policy terms</span>
            </Link>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="options rounded shadow"
          >
            {logMode}
          </motion.div>
        </div>
        {loginError ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginError
              handleIsLogin={handleIsLogin}
              ErrorMessage={"Login first to view profile"}
            />
          </motion.div>
        ) : null}
      </div>
    </>
  );
}

function ReedemPoint({ redeemPoints }) {
  const myTheme = useContext(ThemeContext);
  const [showRedeem, setShowRedeem] = useState(false);
  const redeemCoin = (
    <div className="d-flex flex-column p-3 justify-content-center">
      <FontAwesomeIcon
        icon={faCoins}
        style={{ fontSize: "50px", color: "gold" }}
      />
      <span className="text-success text-center">{redeemPoints} points</span>
      <button
        className="btn btn-outline-warning mt-2"
        style={{ maxWidth: "60px", margin: "auto" }}
        onClick={(e) => {
          e.stopPropagation();
          setShowRedeem(false);
        }}
      >
        hide
      </button>
    </div>
  );
  return (
    <>
      <div
        className="reedemPoints rounded shadow"
        style={{ padding: "10px" }}
        onClick={() => {
          setShowRedeem(true);
        }}
      >
        <div className=" d-flex justify-content-center rounded">
          <span style={{ marginRight: "4px" }}>my Redeem points</span>
          <FontAwesomeIcon
            icon={faCoins}
            style={{ fontSize: "20px", color: myTheme }}
          />
        </div>
        {showRedeem ? redeemCoin : null}
      </div>
    </>
  );
}

function ChangeTheme({ changeApptheme }) {
  const [showColors, setShowColors] = useState(false);
  const themeColors = [
    "aqua",
    "red",
    "blue",
    "black",
    "yellow",
    "pink",
    "green",
    "orange",
    "gray",
    "gold",
  ];
  const myTheme = useContext(ThemeContext);
  const themeSelection = (
    <div className="d-flex flex-column p-3 justify-content-center">
      <div className="row">
        {themeColors.map((theme) => (
          <ColorButton
            theme={theme}
            key={theme}
            changeApptheme={changeApptheme}
          />
        ))}
      </div>
      <button
        className="btn btn-outline-warning mt-2"
        style={{ maxWidth: "60px", margin: "auto" }}
        onClick={(e) => {
          e.stopPropagation();
          setShowColors(false);
        }}
      >
        hide
      </button>
    </div>
  );
  return (
    <>
      <div
        className="reedemPoints rounded shadow"
        style={{ padding: "10px" }}
        onClick={() => setShowColors(true)}
      >
        <div className=" d-flex justify-content-center rounded">
          <span style={{ marginRight: "4px" }}>Choose Theme</span>
          <FontAwesomeIcon
            icon={faDroplet}
            style={{ fontSize: "20px", color: myTheme }}
          />
        </div>
        {showColors ? themeSelection : null}
      </div>
    </>
  );
}

function ColorButton({ theme, changeApptheme }) {
  return (
    <>
      <button
        className="transparentButton col"
        onClick={() => changeApptheme(theme)}
      >
        <FontAwesomeIcon
          icon={faDroplet}
          style={{ fontSize: "20px", color: theme }}
          className=""
        />
      </button>
    </>
  );
}
