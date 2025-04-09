import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

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
    const storedUserId = localStorage.getItem("userId");

    if (token && expiresAt && Date.now() < Number(expiresAt)) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      startTokenTimer(Number(expiresAt));
    } else {
      logout();
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/login", { email, password });
      const { token } = res.data;

      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp * 1000;
      const extractedUserId = decoded.sub || decoded.userId || decoded.id;

      if (!extractedUserId) {
        throw new Error("Không tìm thấy userId trong token.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", expiresAt.toString());
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", extractedUserId);

      setIsAuthenticated(true);
      setUserId(extractedUserId);
      startTokenTimer(expiresAt);

      toast.success("Đăng nhập thành công!");
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      toast.error(message);
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");

    if (logoutTimer) clearTimeout(logoutTimer);

    setIsAuthenticated(false);
    setUserId(null);
    toast.info("Bạn đã đăng xuất.");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
