import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function Post({ post }) {
  return (
    <Card className="mb-4 shadow-sm">
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
      <CardContent>
        <p>{post.caption}</p>
        {post.mediaUrl && (
          <img
            src={post.mediaUrl}
            alt="Post"
            className="mt-2 rounded-lg w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}

export default Post;
