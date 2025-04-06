import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 pt-14 lg:ml-64">{children}</main>
      </div>
    </div>
  );
}

export default DefaultLayout;
