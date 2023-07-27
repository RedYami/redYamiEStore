import { useContext, useState } from "react";
import { CurrentUser, ThemeContext } from "./themeContext";
import {
  faCircleUser,
  faCoins,
  faPenToSquare,
  faStarOfLife,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { profileSvgs } from "./datas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Privacy({ changeProfilePicture, changeNav }) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectingProfile, setSelectingProfile] = useState(false);
  const currentUser = useContext(CurrentUser);
  const myTheme = useContext(ThemeContext);
  changeNav("setting");
  const profileItems = [
    {
      name: "New name",
      password: "Enter password to change",
      type: currentUser.user_name,
    },
    {
      name: "New email",
      password: "Enter password to change",
      type: currentUser.email,
    },
    {
      name: "New phone number",
      password: "Enter password to change",
      type: currentUser.phone_number,
    },
    {
      name: "New address",
      password: "Enter password to change",
      type: currentUser.address,
    },
    { name: "Current password", password: "new password", type: "password" },
  ];
  const profilesSelect = (
    <>
      <div
        className="profilePics row p-1 rounded"
        style={{ backgroundColor: "gold" }}
      >
        {profileSvgs.map((profile) => (
          <img
            src={profile}
            className=" col"
            style={{
              maxWidth: "70px",
              maxHeight: "70px",
              cursor: "pointer",
            }}
            onClick={() => changeProfilePicture(profile)}
            key={profile}
          />
        ))}
      </div>
    </>
  );

  return (
    <>
      <div
        className="rounded border "
        style={{
          maxWidth: "500px",
          margin: "auto",
          maxHeight: "500px",
          overflow: "auto",
        }}
      >
        <div
          className="rounded d-flex justify-content-center flex-column p-1"
          style={{ margin: "auto" }}
        >
          <img
            src={currentUser.profile_picture}
            style={{
              maxWidth: "70px",
              maxHeight: "70px",
              //   paddingTop: "30px",
              paddingBottom: "5px",
              margin: "auto",
            }}
            className=" rounded-circle"
          />
          <button
            className=" btn rounded"
            style={{
              fontFamily: "cursive",
              maxWidth: "120px",
              margin: "auto",
              backgroundColor: "gold",
              color: "white",
            }}
            onClick={() => setSelectingProfile(!selectingProfile)}
          >
            {selectingProfile ? "okay" : "edit profile"}
          </button>
          {selectingProfile ? profilesSelect : null}
        </div>
        {profileItems.map((item) => (
          <EditMode
            firstLable={item.name}
            secondLable={item.password}
            thirdText={item.type} //user thirdText
            key={item.name}
          />
        ))}
      </div>
    </>
  );
}

function EditMode({ firstLable, secondLable, thirdText }) {
  const myTheme = useContext(ThemeContext);
  const [isEdit, setIsEdit] = useState(false);

  const changeMode = (
    <>
      <div
        className="container p-3 mt-1 rounded border"
        style={{ maxWidth: "390px" }}
      >
        <label>{firstLable}</label>
        <input
          //   value={userName}
          className="form-control"
          placeholder="user name"
          //   onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label>{secondLable}</label>
        <input
          //   value={password}
          className="form-control"
          placeholder="password"
          //   onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-outline-success mt-2">save</button>
        <br />
        {/* <span className="text-danger">{loginStatus}</span> */}
      </div>
    </>
  );
  return (
    <>
      <div className="reedemPoints rounded " style={{ padding: "10px" }}>
        <div
          className=" d-flex justify-content-between rounded"
          style={{ backgroundColor: myTheme, color: "white" }}
        >
          <span className="p-1 rounded">
            <FontAwesomeIcon
              icon={faStarOfLife}
              className="transparentButton"
            />
            {thirdText}
          </span>
          <button
            style={{
              marginTop: "auto",
              marginBottom: "auto",
            }}
            className="transparentButton p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsEdit(!isEdit);
            }}
          >
            <i style={{ marginRight: "4px", color: "white" }}>Edit</i>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{
                color: "white",
                fontSize: "20px",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              className=""
            />
          </button>
        </div>
        {isEdit ? changeMode : null}
      </div>
    </>
  );
}
