import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "react-toastify";
import axios from "@/utils/axiosInstance";

function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value) => {
    setInput({ ...input, gender: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input.username &&
      input.email &&
      input.password &&
      input.gender &&
      input.dateOfBirth
    ) {
      try {
        const res = await axios.post("/register", input);

        if (res.data.success === true) {
          toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
          navigate("/login");
        } else {
          toast.warning(res.data.message || "Đăng ký thất bại.");
        }
      } catch (err) {
        console.error("Lỗi:", err);
        toast.error(
          err.response?.data?.message || "Lỗi khi đăng ký người dùng."
        );
      }
    } else {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4 ">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-14">
        {/* Cột trái: Thông điệp */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center items-center md:items-start mt-[-150px]">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">facebook</h1>
          <h2 className="text-2xl md:text-3xl font-normal text-gray-800">
            Tạo tài khoản mới
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Tham gia Facebook và kết nối với bạn bè!
          </p>
        </div>

        {/* Cột phải: Form đăng ký */}
        <div className="flex-1 w-[396px] mb-[-70px]">
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 flex flex-col items-center">
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <Input
                type="text"
                name="username"
                value={input.username}
                onChange={changeEventHandler}
                placeholder="Tên người dùng"
                className="w-[364px] h-[52px] border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2 transition duration-150 ease-in-out !text-lg"
              />
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Email"
                className="w-[364px] h-[52px] border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2 transition duration-150 ease-in-out !text-lg"
              />
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Mật khẩu"
                className="w-[364px] h-[52px] border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2 transition duration-150 ease-in-out !text-lg"
              />
              <Select onValueChange={handleGenderChange} name="gender">
                <SelectTrigger className="w-[364px] h-[52px] border border-gray-300 rounded-lg text-lg">
                  <SelectValue placeholder="Giới tính" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="date"
                name="dateOfBirth"
                value={input.dateOfBirth}
                onChange={changeEventHandler}
                max={new Date().toISOString().split("T")[0]}
                className="w-[364px] h-[52px] text-lg px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />

              <Button
                type="submit"
                className="w-[364px] h-[48px] bg-[#42b72a] hover:bg-[#36a420] text-white font-semibold py-3 rounded-lg"
              >
                Đăng ký
              </Button>
            </form>
            <div className="text-center w-full">
              <Link
                to="/login"
                className="text-[#1877f2] hover:underline text-sm block text-center"
              >
                Đã có tài khoản? Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
