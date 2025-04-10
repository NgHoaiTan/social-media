import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      return toast.warning("Vui lòng nhập đầy đủ email và mật khẩu");
    }

    setLoading(true);
    const res = await login(input.email, input.password);
    setLoading(false);

    if (res.success) navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-14">
        {/* Cột trái */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center items-center md:items-start mt-[-150px]">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">facebook</h1>
          <h2 className="text-2xl md:text-3xl font-normal text-gray-800">
            Đăng nhập gần đây
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Nhấp vào ảnh của bạn hoặc thêm tài khoản.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <div className="relative w-48 h-48 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-lg transition">
              <span className="text-4xl text-gray-400">+</span>
              <span className="absolute bottom-2 text-gray-600 text-sm">
                Thêm tài khoản
              </span>
            </div>
          </div>
        </div>

        {/* Cột phải */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 w-[396px] h-[496px] mb-[-70px]"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 flex flex-col items-center">
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email hoặc số điện thoại"
              className="w-[364px] h-[52px] !text-lg"
            />
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Mật khẩu"
              className="w-[364px] h-[52px] !text-lg"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-[364px] h-[48px] bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
            <div className="text-center w-full">
              <Link
                to="/"
                className="text-[#1877f2] hover:underline text-sm block text-center"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <hr className="my-4 w-full" />
            <div className="text-center w-full">
              <Button
                type="button"
                variant="outline"
                className="w-[179px] bg-[#42b72a] text-white hover:bg-[#36a420]"
                onClick={() => navigate("/register")}
              >
                Tạo tài khoản mới
              </Button>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            <span className="font-semibold">Tạo Trang</span> dành cho người nổi
            tiếng, thương hiệu hoặc doanh nghiệp.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
