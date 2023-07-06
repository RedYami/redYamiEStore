import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState } from "react";

export default function MessageBox({ onSendMessage, user }) {
  const [inputMessage, setInputMessage] = useState("");
  const [title, setTitle] = useState("");
  return (
    <>
      <div className="messageBox shadow-lg rounded mt-5 p-3">
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
