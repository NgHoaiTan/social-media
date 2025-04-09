import { createContext, useContext, useState } from "react";
import axios from "@/utils/axiosInstance"; // hoặc import từ 'axios' nếu không xài file riêng
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const login = async (email, password) => {
    try {
      const res = await axios.post("/login", { email, password });
      console.log(res.data);
      const { token } = res.data.token; // tùy vào API trả gì

      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);

      toast.success("Đăng nhập thành công!");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      toast.error(message);
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    toast.info("Bạn đã đăng xuất.");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
