import {
  faCircleChevronDown,
  faCircleUser,
  faCoins,
  faDroplet,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ThemeContext } from "./themeContext";
import { Link } from "react-router-dom";

export default function Setting({ currentUser, onLogout, changeApptheme }) {
  const myTheme = useContext(ThemeContext);
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
  return (
    <>
      <ReedemPoint />
      <ChangeTheme changeApptheme={changeApptheme} />
      <div className="settingDiv bg-body-tertiary">
        <div className="settingOption ">
          <div className="options rounded shadow mb-5">
            <Link to={"/setting/privacy"} className="fontAwesome">
              <FontAwesomeIcon
                icon={faCircleUser}
                style={{ fontSize: "40px", color: myTheme }}
              />
              <span>Profile</span>
            </Link>
          </div>
          <div className="options rounded shadow">
            <div className="fontAwesome">
              <FontAwesomeIcon
                icon={faCircleChevronDown}
                style={{ fontSize: "40px", color: myTheme }}
              />
              <span>Activities</span>
            </div>
          </div>
        </div>
        <div className="settingOption  ">
          <div className="options rounded shadow mb-5">
            <Link to={"/setting/policy"} className="fontAwesome ">
              <FontAwesomeIcon
                icon={faUser}
                style={{ fontSize: "40px", color: myTheme }}
              />
              <span style={{ textDecoration: "none" }}>policy terms</span>
            </Link>
          </div>
          <div className="options rounded shadow">{logMode}</div>
        </div>
      </div>
    </>
  );
}

function ReedemPoint() {
  const myTheme = useContext(ThemeContext);
  const [showRedeem, setShowRedeem] = useState(false);
  const redeemCoin = (
    <div className="d-flex flex-column p-3 justify-content-center">
      <FontAwesomeIcon
        icon={faCoins}
        style={{ fontSize: "50px", color: "gold" }}
      />
      <span className="text-success text-center">79 points</span>
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
