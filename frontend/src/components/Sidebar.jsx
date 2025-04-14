import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, SquarePlus } from "lucide-react";
import CreatePost from "@/components/CreatePost";

function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/users/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error("Lỗi khi lấy profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <aside className="w-64 bg-gray-50 h-screen p-4 fixed hidden lg:block z-40 top-14">
      <ul className="space-y-4">
        <li>
          <Link
            to="/profile"
            className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-xl transition duration-200 cursor-pointer"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.profilePicture || ""} />
              <AvatarFallback>
                {user?.username
                  ? user.username
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                  : "UN"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">
              {user?.username || "Loading..."}
            </span>
          </Link>
        </li>

        <li className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-xl transition duration-200 cursor-pointer">
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <span className="font-medium text-base">Bạn bè</span>
        </li>

        {/* <li className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-xl transition duration-200 cursor-pointer">
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
            <SquarePlus className="w-5 h-5 text-red-600" />
          </div>
          <span className="font-medium text-base">Thêm bài viết</span>
        </li> */}
        <CreatePost user={user} />
      </ul>
    </aside>
  );
}

export default Sidebar;
