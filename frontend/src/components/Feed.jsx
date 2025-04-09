import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import { useAuthContext } from "@/context/AuthContext";

function Feed() {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated, userId } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated && userId) {
      axios
        .get(`/posts/?userId=${userId}`)
        .then((res) => {
          console.log("API Posts:", res.data.posts); // Debug nếu cần
          setPosts(res.data.posts); // Lấy từ res.data.posts
        })
        .catch((err) => console.error("Lỗi lấy bài viết:", err));
    }
  }, [isAuthenticated, userId]);

  return (
    <div className="flex-1 p-6">
      <div className="max-w-screen-xl mx-auto">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className="text-gray-500 text-center">Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
