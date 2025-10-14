import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Dashadmin = () => {
  const { products,getproducts } = useContext(AppContext);
   useEffect(() => {
   getproducts(); 
  },[])
  return (
    <div className="flex flex-col justify-start gap-8 min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-bold">Dashboard</div>
        <div className="flex justify-between bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">Total Products</p>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">Total Orders</p>
            <p className="text-3xl font-bold">320</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">Revenue</p>
            <p className="text-3xl font-bold">$12,500</p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xl font-bold mb-4">Recent Orders</p>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-300 dark:border-gray-700">
              <tr>
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Order Date</th>
                <th className="p-4 font-semibold">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#12345", date: "2024-01-15", amount: "$55.00"},
                { id: "#12346", date: "2024-01-16", amount: "$32.50"},
                { id: "#12347", date: "2024-01-17", amount: "$78.00"},
                { id: "#12348", date: "2024-01-18", amount: "$42.00"},
                { id: "#12349", date: "2024-01-19", amount: "$65.00"},
              ].map(({ id, date, amount, status }) => (
                <tr key={id} className="border-b border-gray-300 dark:border-gray-700 last:border-b-0">
                  <td className="p-4 font-mono">{id}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{date}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashadmin;
