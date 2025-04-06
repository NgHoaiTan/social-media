import Post from "./Post";

const samplePosts = [
  {
    id: "1",
    userName: "John Doe",
    timestamp: "2 hours ago",
    content: "Hello, this is a sample post!",
    image: "/content.jpg",
  },
  {
    id: "2",
    userName: "Jane Smith",
    timestamp: "5 hours ago",
    content: "Enjoying the day!",
  },
  {
    id: "3",
    userName: "Hoài Tân",
    timestamp: "2 hours ago",
    content: "Hello, this is a sample post!",
    image: "/facebook-logo.jpeg",
  },
];

function Feed() {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-screen-xl mx-auto">
        {samplePosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
