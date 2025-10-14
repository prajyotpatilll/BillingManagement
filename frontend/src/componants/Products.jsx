import React, { useState, useRef, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Products = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { products } = useContext(AppContext);

  const fileRef = useRef(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !price || !stock || !category) {
      return toast.error("Please fill in all fields");
    }

    if (!image) {
      return toast.error("Please upload a product image");
    }

    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("name", name);
      formdata.append("price", price);
      formdata.append("category", category);
      formdata.append("stock", stock);

      const { data } = await axios.post(
        `${backendURL}/api/products/`,
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message); // ✅ Success toast
        // Reset all fields
        setName("");
        setPrice("");
        setCategory("");
        setStock("");
        setImage(null);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetHandeler = () => {
    setName("");
    setPrice("");
    setCategory("");
    setStock("");
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <div>
        <p>Product Management</p>
      </div>

      <div>
        <p>Add/Edit Product</p>
        <form onSubmit={onsubmitHandler}>
          {/* Row 1 */}
          <div>
            <div>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                name="price"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div>
            <div>
              <input
                type="number"
                name="stock"
                value={stock}
                placeholder="Stock"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <select
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                <option value="Beverages">Beverages</option>
                <option value="Food">Food</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={image ? URL.createObjectURL(image) : "/placeholder.png"}
                alt="preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </label>
            <input
              type="file"
              id="image"
              hidden
              ref={fileRef}
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <p>Upload Product Image</p>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button type="reset" onClick={resetHandeler}>
            Reset
          </button>
        </form>
      </div>

      <div>
        <p>All Products</p>
        <table>
          <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
            </tr>
              ))
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
