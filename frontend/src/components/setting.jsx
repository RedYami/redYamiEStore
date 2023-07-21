import {
  faChartLine,
  faCircleChevronDown,
  faGear,
  faLock,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ThemeContext } from "./themeContext";
import { Link } from "react-router-dom";

export default function Setting({ currentUser, onLogout }) {
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
      <div className="settingDiv bg-body-tertiary">
        <div className="settingOption ">
          <div className="options rounded shadow mb-5">
            <div className="fontAwesome">
              <FontAwesomeIcon
                icon={faLock}
                style={{ fontSize: "40px", color: myTheme }}
              />
              <span>Privacy</span>
            </div>
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
            <div className="fontAwesome">
              <FontAwesomeIcon
                icon={faUser}
                style={{ fontSize: "40px", color: myTheme }}
              />
              <span>About us</span>
            </div>
          </div>
          <div className="options rounded shadow">{logMode}</div>
        </div>
      </div>
    </>
  );
}
