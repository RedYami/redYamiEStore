import { faBookOpenReader, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useContext, useState } from "react";
import { ThemeContext } from "./themeContext";

export default function UserInbox({ messages, watchedMessage, deleteMessage }) {
  const [selectedNavType, setSelectedNavType] = useState("primary");
  const myTheme = useContext(ThemeContext);
  const filteredMessage = messages.filter(
    (message) => message.type === selectedNavType
  );

  function checkAllWatched(type) {
    const unwatchedMessages = messages.filter(
      (message) => message.type === type && message.watched === false
    );
    const isAllWatched = unwatchedMessages.length === 0;
    return isAllWatched;
  }
  const primaryHeading =
    selectedNavType !== "primary" ? <span>primary</span> : <span>PRIMARY</span>;
  const newItemHeading =
    selectedNavType !== "new item" ? (
      <span>new item</span>
    ) : (
      <span>NEW ITEM</span>
    );
  const promotionsHeading =
    selectedNavType !== "promotions" ? (
      <span>promotions</span>
    ) : (
      <span>PROMOTIONS</span>
    );

  function redDotNoti(type) {
    return checkAllWatched(type) ? null : (
      <div className="rounded bg-danger unwatched"></div>
    ); //red dot will appear if unwatched message exist according to the heading type
  }
  return (
    <>
      <div className="mainDivInboxMessage mt-5  container ">
        <div className="messageHeadings row">
          <button
            className="col messageNav d-flex justify-content-center"
            style={
              selectedNavType === "primary"
                ? { borderBottom: "2px solid " + myTheme, color: myTheme }
                : null
            }
            onClick={() => setSelectedNavType("primary")}
          >
            {primaryHeading} {redDotNoti("primary")}
          </button>
          <button
            className="col messageNav d-flex justify-content-center"
            style={
              selectedNavType === "new item"
                ? { borderBottom: "2px solid " + myTheme, color: myTheme }
                : null
            }
            onClick={() => setSelectedNavType("new item")}
          >
            {newItemHeading} {redDotNoti("new item")}
          </button>
          <button
            className="col messageNav d-flex justify-content-center"
            style={
              selectedNavType === "promotions"
                ? { borderBottom: "2px solid " + myTheme, color: myTheme }
                : null
            }
            onClick={() => setSelectedNavType("promotions")}
          >
            {promotionsHeading} {redDotNoti("promotions")}
          </button>
        </div>
        <ul className="mt-3 border ">
          {filteredMessage.map((message) => (
            <Message
              message={message}
              key={message.id}
              watchedMessage={watchedMessage}
              deleteMessage={deleteMessage}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
function Message({ message, watchedMessage, deleteMessage }) {
  const [reading, setReading] = useState(false);
  const isNewMessage = message.watched ? null : (
    <i className="badge bg-success">new!</i>
  );
  return (
    <>
      <li className="messageList rounded m-2">
        <button
          className="transparentButton "
          onClick={() => {
            setReading(!reading);
            watchedMessage(message.id);
          }}
        >
          <FontAwesomeIcon icon={faBookOpenReader} />
          <i> {reading ? "close" : "read"}</i>
        </button>
        <button className="transparentButton " style={{ color: "gray" }}>
          {message.title} {isNewMessage}
        </button>
        <button
          className="transparentButton "
          onClick={() => deleteMessage(message.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
      {reading ? <Watch message={message} /> : null}
    </>
  );
}

function Watch({ message }) {
  const messageContent = message.message;
  return (
    <>
      <div className="messageDisplay m-2">
        <textarea
          className=" disabled form-control"
          value={messageContent}
          readOnly
        />
      </div>
    </>
  );
}
