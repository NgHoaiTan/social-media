import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 pt-14 px-4 lg:px-64 max-w-6xl mx-auto">
          {children}
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}

export default DefaultLayout;
