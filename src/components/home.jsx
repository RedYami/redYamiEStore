import { useRef, useState } from "react";

import Catagories from "/src/components/catagories";
import Items from "/src/components/items";
// import { myDatas } from "./components/datas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import reactLogo from "/src/assets/react.svg";

export default function Home({
  requestCata,
  addNewCart,
  removeCart,
  pureData,
  filterText,
  changeCata,
  selectedLi,
}) {
  return (
    <>
      <div className="components container-fluid row">
        <aside className="col-4">
          <Catagories onListClick={changeCata} Id={selectedLi} />
        </aside>
        <div className="taskContainer col">
          <Items
            cataType={requestCata}
            addCart={addNewCart}
            removeCart={removeCart}
            pureData={pureData}
            filterText={filterText}
          />
        </div>
      </div>
    </>
  );
}