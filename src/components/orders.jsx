export default function OrderList({ orderedList }) {
  return (
    <>
      <div className="orderList container-fluid ">
        <div className="orderTable ">
          <table className="table text-center">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">items quantity</th>
                <th scope="col">order code</th>
                <th scope="col">total price</th>
                <th scope="col">user name</th>
                <th scope="col">Admin</th>
              </tr>
            </thead>
            <tbody>
              {orderedList.map((list, index) => (
                <tr key={index}>
                  <td>#</td>
                  <td>{list.quantity}</td>
                  <td>{list.orderCode}</td>
                  <td>{list.totalPrice}</td>
                  <td>{list.user_name}</td>
                  <td>{list.approved ? "Approved" : "pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}