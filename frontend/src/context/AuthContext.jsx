import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  let logoutTimer;

  const startTokenTimer = (expiresAt) => {
    const timeout = expiresAt - Date.now();

    if (logoutTimer) clearTimeout(logoutTimer);

    logoutTimer = setTimeout(() => {
      logout();
    }, timeout);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");

    if (token && expiresAt && Date.now() < Number(expiresAt)) {
      setIsAuthenticated(true);
      startTokenTimer(Number(expiresAt));
    } else {
      logout(); // Token hết hạn
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/login", { email, password });
      console.log(res.data);
      const token = res.data.token;
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp * 1000;

      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", expiresAt.toString());
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      startTokenTimer(expiresAt);

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
    localStorage.removeItem("expiresAt");
    if (logoutTimer) clearTimeout(logoutTimer);
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
