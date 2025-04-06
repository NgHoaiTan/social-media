import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 h-screen p-4 fixed hidden lg:block z-40 top-14 ">
      <ul className="space-y-4">
        <li className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <span className="font-medium">Your Profile</span>
        </li>
        <li className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full"></div>
          <span>Friends</span>
        </li>
        <li className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-500 rounded-full"></div>
          <span>Groups</span>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
