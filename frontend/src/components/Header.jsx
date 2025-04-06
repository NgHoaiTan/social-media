import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-header text-white w-full h-14 p-3 flex items-center justify-between fixed top-0 z-50 shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Facebook" className="w-10 h-10" />

        <div className="relative w-60 h-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Tìm kiếm trên facebook"
            className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-black border-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link to="/">
          <Button variant="ghost" className="text-white hover:bg-blue-700">
            Home
          </Button>
        </Link>
        <Button variant="ghost" className="text-white hover:bg-blue-700">
          Friends
        </Button>
        <Button variant="ghost" className="text-white hover:bg-blue-700">
          Groups
        </Button>
      </nav>
      <div>
        <Link to="/profile">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-blue-700"
          >
            Profile
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
