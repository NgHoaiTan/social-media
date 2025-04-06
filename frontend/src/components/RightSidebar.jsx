function RightSidebar() {
  return (
    <aside className="w-64 bg-gray-50 h-screen p-4 fixed right-0 hidden lg:block z-40 top-14">
      <ul className="space-y-4">
        <li className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
          <span>Sponsored</span>
        </li>
        <li className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
          <span>Contacts</span>
        </li>
        <li className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
          <span>Events</span>
        </li>
      </ul>
    </aside>
  );
}

export default RightSidebar;
