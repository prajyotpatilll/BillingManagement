import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [products, setproducts] = useState([]);

  // get all products
  const getproducts = async () => {
    try {
      const response = await axios.get(backendURL + "/api/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setproducts(response.data.products);
        console.log(response.data.products);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.message || "Error fetching products");
    }
  };

  useEffect(() => {
    getproducts();
  }, []);
  

  const value = {
    products,
    getproducts,
    token // expose fetch function if needed elsewhere
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
