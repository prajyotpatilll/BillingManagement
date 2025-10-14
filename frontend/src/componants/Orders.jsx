import React, { useState } from 'react';

const orderData = [
  { id: "#12345", date: "2024-01-15", amount: "$55.00" },
  { id: "#12346", date: "2024-01-16", amount: "$32.50" },
  { id: "#12347", date: "2024-01-17", amount: "$78.00" },
  { id: "#12348", date: "2024-01-18", amount: "$42.00" },
  { id: "#12349", date: "2024-01-19", amount: "$65.00" },
  // Add more orders as needed
];

const ORDERS_PER_PAGE = 3; // <--- Set how many orders to show on one page

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orderData.length / ORDERS_PER_PAGE);

  // Get only orders for the current page
  const currentOrders = orderData.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );
  console.log(currentOrders);

  const goToPrevPage = () => setCurrentPage((page) => Math.max(page - 1, 1));
  console.log(currentPage);
  const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPages));
  console.log(currentPage);

  return (
    <div>
      <p>All Orders</p>
      <table className="w-full text-left border-collapse">
        <thead className="border-b border-gray-300 dark:border-gray-700">
          <tr>
            <th className="p-4 font-semibold">Order ID</th>
            <th className="p-4 font-semibold">Order Date</th>
            <th className="p-4 font-semibold">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map(({ id, date, amount }) => (
            <tr key={id} className="border-b border-gray-300 dark:border-gray-700 last:border-b-0">
              <td className="p-4 font-mono">{id}</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">{date}</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex gap-2 my-4">
        <button
          className="px-2 py-1 border rounded"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="px-2 py-1 border rounded"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
