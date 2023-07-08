import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faBurger,
  faCakeCandles,
  faCarrot,
  faHatCowboy,
  faMartiniGlassCitrus,
  faPizzaSlice,
} from "@fortawesome/free-solid-svg-icons";
export default function Catagories({ onListClick, Id }) {
  return (
    <>
      <div className="">
        <ul className="  list-group catagoriesList ">
          <li
            className={"list-group-item text-center"}
            onClick={() => {
              onListClick("all", 10);
            }}
            style={
              Id === 10
                ? { color: "white", backgroundColor: "aqua" }
                : { color: "aqua" }
            }
          >
            All
          </li>
          <li
            className={"list-group-item text-center"}
            onClick={() => {
              onListClick("fruit", 0);
            }}
            style={
              Id === 0
                ? { color: "white", backgroundColor: "aqua" }
                : { color: "aqua" }
            }
          >
            <FontAwesomeIcon icon={faCarrot} title="fruit" />
          </li>
          <li
            className={"list-group-item text-center"}
            onClick={() => {
              onListClick("snack", 1);
            }}
            style={
              Id === 1
                ? { color: "white", backgroundColor: "aqua" }
                : { color: "aqua" }
            }
          >
            <FontAwesomeIcon icon={faBurger} title="snack" />
          </li>
          <li
            className={"list-group-item text-center"}
            onClick={() => {
              onListClick("cake", 2);
            }}
            style={
              Id === 2
                ? { color: "white", backgroundColor: "aqua" }
                : { color: "aqua" }
            }
          >
            <FontAwesomeIcon icon={faCakeCandles} title="cake" />
          </li>
          <li
            className={"list-group-item text-center"}
            onClick={() => {
              onListClick("hat", 3);
            }}
            style={
              Id === 3
                ? { color: "white", backgroundColor: "aqua" }
                : { color: "aqua" }
            }
          >
            <FontAwesomeIcon icon={faHatCowboy} title="hat" />
          </li>
          <li
            className={"list-group-item text-center"}
            onClick={() => {
              onListClick("pizza", 4);
            }}
            style={
              Id === 4
                ? { color: "white", backgroundColor: "aqua" }
                : { color: "aqua" }
            }
          >
            <FontAwesomeIcon icon={faPizzaSlice} title="pizza" />
          </li>
          <li
            className={"list-group-item text-center"}
            onClick={() => {
              onListClick("beverage", 5);
            }}
            style={
              Id === 5
                ? { color: "white", backgroundColor: "aqua" }
                : { color: "aqua" }
            }
          >
            <FontAwesomeIcon icon={faMartiniGlassCitrus} title="beverage" />
          </li>
        </ul>
      </div>
    </>
  );
}
