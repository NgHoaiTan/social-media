import Header from "../components/Header";

function FullWidthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4">{children}</main>
    </div>
  );
}

export default FullWidthLayout;
