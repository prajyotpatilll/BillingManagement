import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext();

const AppContextProvide = (props) => {

//   const backendURL = import.meta.env.VITE_BACKEND_URL;

//   const [token, settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);




  const value = {
    
  };

 

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvide;
