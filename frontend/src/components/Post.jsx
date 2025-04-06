import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function Post({ post }) {
  return (
    <Card className="mb-4 shadow-sm">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>{post.userName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.userName}</p>
            <p className="text-sm text-gray-500">{post.timestamp}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="mt-2 rounded-lg w-full" />
        )}
      </CardContent>
    </Card>
  );
}

export default Post;
