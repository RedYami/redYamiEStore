import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Facebook from "/src/items/facebook.svg";
import Twitter from "/src/items/twitter.svg";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useContext, useState } from "react";
import { ThemeContext } from "./themeContext";
import React from "react";

export default function MessageBox({ onSendMessage, user }) {
  const myTheme = useContext(ThemeContext);
  const [inputMessage, setInputMessage] = useState("");
  const [title, setTitle] = useState("");
  return (
    <>
      <div className="socialMedia row  rounded p-2 shadow">
        <a
          href="https://www.facebook.com/profile.php?id=100089539521655"
          className=" col d-flex justify-content-evenly"
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <span style={{ color: "black" }}>contact us on</span>
          <i
            className="fa fa-facebook-f"
            style={{
              fontSize: "30px",
              color: "blue",
            }}
          ></i>
        </a>
        <div className=" col d-flex justify-content-evenly">
          <span>See us on</span>
          <i
            className="fa fa-twitter"
            style={{ fontSize: "30px", color: "aqua" }}
          ></i>
        </div>
      </div>
      <div className="messageBox shadow rounded p-3 mt-3">
        <h5>- OR MESSAGE US HERE -</h5>
        <hr />
        <div>
          <label>Title</label>
          <input
            value={title}
            className="form-control user-name"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="mt-1">Message</label>
          <textarea
            value={inputMessage}
            placeholder="write your message here"
            className="form-control"
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            className="btn btn-outline-success mt-1"
            onClick={() => {
              onSendMessage({
                user: user,
                title: title,
                message: inputMessage,
              });
              setInputMessage("");
              setTitle("");
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </>
  );
}
