import { useState } from "react";

export default function Catagories({ onListClick, Id }) {
  const catagoriesList = ["fruit", "snack", "cake", "hat", "pizza", "beverage"];
  return (
    <>
      <h3
        className="bg-dark text-center"
        style={{ color: "white", height: "40px" }}
      >
        Catagories
      </h3>
      <ul className=" list-group catagoriesList ">
        {catagoriesList.map((list, index) => (
          <li
            className={
              "list-group-item" + (Id === index ? " bg-secondary" : "")
            }
            onClick={() => {
              onListClick(list, index);
            }}
            key={index}
          >
            {list}
          </li>
        ))}
      </ul>
    </>
  );
}
