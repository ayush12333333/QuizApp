import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PublicLayout() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* nested public pages render */}
    </div>
  );
}
