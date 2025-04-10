import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

function Post({ post }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Card className="mb-4 shadow-sm ">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar>
            <img
              src={post.author.profilePicture}
              alt={post.author.username}
              className="w-full h-full object-cover rounded-full"
            />
          </Avatar>
          <div>
            <p className="font-semibold">{post.author.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="-mt-4">
        <p>{post.caption}</p>
        {post.mediaUrl && (
          <img
            src={post.mediaUrl}
            alt="Post"
            className="mt-2 rounded-lg w-full"
          />
        )}

        <div className="border-t my-2" />

        {/* Like, Comment, Share section */}
        <div className="flex items-center mt-5 text-sm text-gray-600 justify-between max-w-sm mx-auto h-2">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={toggleLike}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                liked ? "text-red-500 fill-red-500" : "text-gray-500"
              }`}
            />
            <span className={liked ? "text-red-500" : ""}>Thích</span>
          </div>
          <div
            className="flex items-center space-x-1 cursor-pointer"
            // onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Bình luận</span>
          </div>

          <div
            className="flex items-center space-x-1 cursor-pointer"
            // onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
            <span>Chia sẻ</span>
          </div>
        </div>

        {/* Bình luận */}
        {/* {showComments && (
          <div className="mt-4 space-y-2">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="border rounded-lg px-3 py-1 bg-gray-100"
              >
                <p className="text-sm font-semibold">{comment.user}</p>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}

            <div className="flex mt-2 space-x-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Viết bình luận..."
                className="flex-1 px-3 py-1 border rounded-md text-sm"
              />
              <button
                onClick={handleCommentSubmit}
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
              >
                Gửi
              </button>
            </div>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}

export default Post;
