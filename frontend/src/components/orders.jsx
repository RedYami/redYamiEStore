import { useContext } from "react";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { ThemeContext } from "./themeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export default function OrderList({ orderedList, deleteOrder }) {
  const myTheme = useContext(ThemeContext);

  return (
    <>
      <div className="orderList container-fluid ">
        <div className="orderTable ">
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col" style={{ backgroundColor: myTheme }}>
                  items quantity
                </th>
                <th scope="col" style={{ backgroundColor: myTheme }}>
                  order code
                </th>
                <th scope="col" style={{ backgroundColor: myTheme }}>
                  total price
                </th>
                <th scope="col" style={{ backgroundColor: myTheme }}>
                  user name
                </th>
                <th scope="col" style={{ backgroundColor: myTheme }}>
                  Admin
                </th>
                <th scope="col" style={{ backgroundColor: myTheme }}></th>
              </tr>
            </thead>
            <tbody>
              {orderedList.map((list, index) => (
                <tr key={index}>
                  <td>{list.quantity}</td>
                  <td>{list.orderCode}</td>
                  <td>{list.totalPrice} kyats</td>
                  <td>{list.user_name}</td>
                  <td>{list.approved ? "Approved" : "pending"}</td>
                  <td>
                    <button
                      className="transparentButton"
                      style={{ color: "red" }}
                      onClick={() => deleteOrder(list.id)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
