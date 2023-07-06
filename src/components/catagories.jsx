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
            className={"list-group-item" + (Id === 10 ? " bg-secondary" : "")}
            onClick={() => {
              onListClick("all", 10);
            }}
          >
            All
          </li>
          <li
            className={"list-group-item" + (Id === 0 ? " bg-secondary" : "")}
            onClick={() => {
              onListClick("fruit", 0);
            }}
          >
            <FontAwesomeIcon icon={faCarrot} title="fruit" />
          </li>
          <li
            className={"list-group-item" + (Id === 1 ? " bg-secondary" : "")}
            onClick={() => {
              onListClick("snack", 1);
            }}
          >
            <FontAwesomeIcon icon={faBurger} title="snack" />
          </li>
          <li
            className={"list-group-item" + (Id === 2 ? " bg-secondary" : "")}
            onClick={() => {
              onListClick("cake", 2);
            }}
          >
            <FontAwesomeIcon icon={faCakeCandles} title="cake" />
          </li>
          <li
            className={"list-group-item" + (Id === 3 ? " bg-secondary" : "")}
            onClick={() => {
              onListClick("hat", 3);
            }}
          >
            <FontAwesomeIcon icon={faHatCowboy} title="hat" />
          </li>
          <li
            className={"list-group-item" + (Id === 4 ? " bg-secondary" : "")}
            onClick={() => {
              onListClick("pizza", 4);
            }}
          >
            <FontAwesomeIcon icon={faPizzaSlice} title="pizza" />
          </li>
          <li
            className={"list-group-item" + (Id === 5 ? " bg-secondary" : "")}
            onClick={() => {
              onListClick("beverage", 5);
            }}
          >
            <FontAwesomeIcon icon={faMartiniGlassCitrus} title="beverage" />
          </li>
        </ul>
      </div>
    </>
  );
}
