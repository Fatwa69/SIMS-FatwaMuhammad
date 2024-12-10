import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const RootLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This renders child routes */}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
