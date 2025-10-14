import { NavLink } from "react-router-dom";

export default function AdminNav() {
  const baseClass = "px-4 py-2 rounded-lg font-semibold hover:bg-amber-200 transition-colors";
  const activeClass = "bg-amber-400 text-black";

  return (
    <nav className="h-screen w-1/6 p-8 bg-white flex flex-col justify-between sticky top-0">
      <div className="flex flex-col gap-5">
        <p className="text-xl font-bold mb-6">Cafe Admin</p>
        <NavLink to="/admin/dash" className={({ isActive }) => (isActive ? `${baseClass} ${activeClass}` : baseClass)}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? `${baseClass} ${activeClass}` : baseClass)}>
          Orders
        </NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => (isActive ? `${baseClass} ${activeClass}` : baseClass)}>
          Products
        </NavLink>
      </div>
    </nav>
  );
}
