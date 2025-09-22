import React, { useState } from "react";

const products = [
  { id: "66fe41c2d1d8a3f90b345a11", name: "Espresso", price: 2.5, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd-EyrmvX4-RzpF0clUl3GtvyurRoRpc2E7wVnrrKPhQsTJwTXbKoRYBrbnSVI-Z2t-G-seH_NzRRkO5H7zd1K1hmIPsSsv6h1a2XGdRP60SJFH4Refs6Oi_mWIxWZ2Rv10KC_EkMCEfIbAiOQ-1CNyizmVRJ895mOZ5OHgAIi_jbjYh4Th6vdSDbYdsCTM5JFQF1HFKgsy9fPm8qTR_R_elMWS5A7vhLlJs_JT_P6gZtuHEuWxd5d0TA8_cNh9I8vAafQzFfY8bE" },
  { id: "66fe41c2d1d8a3f90b345a12", name: "Cappuccino", price: 3.5, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVIw1m9qRAt88GCwS77Bnt3ph2UGjwv7mLoGrnuxIq7xYJXCwyql-KdUb1pseouPXfjtBfI7DdgmdE-GU5L0IAfUlIoLFMCXup9G_RgNdTEDm4XEzvvV8i8z8q5qwhlLYWnuLL6AvoMSGegsVI5gy8yBukLgDImDdYMh6qg4NPtrsZ8xl9Y0apcmZYT1ugVwKKplPVTePCnl24daT8GbnRkZ4SuL2VFrudGBd90-rT6oR7_tdf8k13DFdQCoRHtp40WgpPUG4ufCI" },
  { id: "66fe41c2d1d8a3f90b345a13", name: "Latte", price: 4.0, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtWWS8l2t_9dNRw04pjQG4pKqlNhPlbRnYoN3T7F0GUnMw5QlgCU7M8teLrh3Iulp9APUxeCNZqv-Mxc1xpLPcchfucMTSyBoCB6zVNDQW6kip3foejkawBJUb-U9oM3ChOwtbc-5I1AwTmds_jmd1WSHt9EPKOc7j1VnIcftf11DojYRsD5COBgYOKciP9_caLiBaLxsZRedYSndi-A5kHtIcO0Xt5QmuM7cYoMTbXEls3imipnOubb-ALtZ-3o8cRuni9TvzQYs" },
];

const CreateBill = () => {
  const [bill, setBill] = useState([]);

  const addToBill = (product) => {
    setBill((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setBill((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setBill((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(item.qty - 1, 1) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const deleteItem = (id) => setBill((prev) => prev.filter((item) => item.id !== id));

  const subtotal = bill.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Check if product is in bill
  const getQty = (id) => bill.find((item) => item.id === id)?.qty || 0;

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-content-light dark:text-content-dark font-display">
      {/* Products */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Order</h1>
            <p className="text-subtle-light dark:text-subtle-dark">
              Browse products and create a new bill
            </p>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => {
            const qty = getQty(product.id);
            return (
              <div
                key={product.id}
                className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group relative"
                onClick={() => qty === 0 && addToBill(product)}
              >
                <img
                  alt={product.name}
                  className="rounded-t-xl h-40 w-full object-cover"
                  src={product.img}
                />

                {/* + / - overlay */}
                {qty > 0 && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-t-xl">
                    <div className="flex items-center bg-white/90 dark:bg-black/70 rounded-full p-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          decreaseQty(product.id);
                        }}
                        className="p-2 text-content-light dark:text-content-dark hover:text-primary"
                      >
                        -
                      </button>
                      <span className="px-4 font-bold text-lg">{qty}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          increaseQty(product.id);
                        }}
                        className="p-2 text-content-light dark:text-content-dark hover:text-primary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bill Preview */}
      <aside className="w-96 bg-surface-light dark:bg-surface-dark p-6 flex flex-col shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Bill Preview</h2>
        <div className="flex-1 overflow-y-auto -mr-6 pr-6 space-y-4">
          {bill.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-background-light dark:bg-background-dark p-3 rounded-lg">
              <img
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
                src={item.img}
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-subtle-light dark:text-subtle-dark">Qty: {item.qty}</p>
              </div>
              <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
              <div className="flex flex-col gap-1 ml-2">
                <button onClick={() => deleteItem(item.id)} className="text-red-500">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-subtle-light/30 dark:border-subtle-dark/30 mt-6 pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-subtle-light dark:text-subtle-dark">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-subtle-light dark:text-subtle-dark">Tax (10%)</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button className="w-full py-3 px-4 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors">
            Confirm Order
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-transparent border border-primary text-primary font-semibold hover:bg-primary-light dark:hover:bg-primary/10 transition-colors">
            Download Bill
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CreateBill;
