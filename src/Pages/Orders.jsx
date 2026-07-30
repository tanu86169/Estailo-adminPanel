import React, { useEffect, useState } from "react";
import axios from "axios";


const Orders = () => {
  const [orders, setOrders] = useState([]);

  const api_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  console.log(token);

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${api_url}/api/order/create-order`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      

      <div className="max-w-6xl mx-auto py-10 px-5">

        <h1 className="text-3xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-xl">
            No Orders Found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-5 mb-6 shadow"
            >
              <div className="flex justify-between">

                <h2 className="font-bold">
                  Order ID :
                  {order._id}
                </h2>

                <span className="text-green-600 font-bold">
                  {order.status}
                </span>

              </div>

              <p className="mt-2">
                Address :
                {order.address}
              </p>

              <p>
                Payment :
                {order.paymentType}
              </p>

              <p className="font-bold text-lg">
                Total :
                ₹{order.totalAmount}
              </p>

              <hr className="my-4" />

              <div className="space-y-4">

                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 items-center"
                  >
                    <img
                      src={item.productId.images[0]?.url}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div>
                      <h3 className="font-semibold">
                        {item.productId.productName}
                      </h3>

                      <p>
                        Qty :
                        {item.qty}
                      </p>

                      <p>
                        Price :
                        ₹{item.price}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </div>
          ))
        )}

      </div>

      
    </>
  );
};

export default Orders;