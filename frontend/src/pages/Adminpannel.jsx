import React from "react";
import AdminNav from "../componants/AdminNav";
import { Route, Routes } from "react-router-dom";
import Dashadmin from "../componants/Dashadmin";
import Products from "../componants/Products";
import Orders from "../componants/Orders";

// Dummy data
const stats = [
  {
    label: "Total Products",
    value: 150,
    icon: "inventory_2",
  },
  {
    label: "Total Orders",
    value: 320,
    icon: "receipt_long",
  },
  {
    label: "Revenue",
    value: "$12,500",
    icon: "monitoring",
  },
];

const recentOrders = [
  {
    id: "#12345",
    name: "Sophia Clark",
    date: "2024-01-15",
    amount: "$55.00",
    status: "Completed",
  },
  {
    id: "#12346",
    name: "Ethan Miller",
    date: "2024-01-16",
    amount: "$32.50",
    status: "Pending",
  },
  {
    id: "#12347",
    name: "Olivia Davis",
    date: "2024-01-17",
    amount: "$78.00",
    status: "Completed",
  },
  {
    id: "#12348",
    name: "Liam Wilson",
    date: "2024-01-18",
    amount: "$42.00",
    status: "Completed",
  },
  {
    id: "#12349",
    name: "Ava Martinez",
    date: "2024-01-19",
    amount: "$65.00",
    status: "Pending",
  },
];

export default function Adminpannel() {
  return (
<div className="flex min-h-screen bg-gray-50">
      <AdminNav />
      <main className="flex-1 p-8">
        <Routes>
          <Route path="dash" element={<Dashadmin />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route index element={<Dashadmin />} /> {/* default route */}
        </Routes>
      </main>
    </div>
  );
}
