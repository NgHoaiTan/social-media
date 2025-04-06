import Post from "./Post";

const samplePosts = [
  {
    id: "1",
    userName: "John Doe",
    timestamp: "2 hours ago",
    content: "Hello, this is a sample post!",
    image: "/facebook-logo.jpeg",
  },
  {
    id: "2",
    userName: "Jane Smith",
    timestamp: "5 hours ago",
    content: "Enjoying the day!",
  },
];

function Feed() {
  return (
    <div className="flex-1 p-4 lg:ml-64">
      <div className="max-w-2xl mx-auto">
        {samplePosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
