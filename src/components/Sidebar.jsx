import {
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";
import { LuLogs } from "react-icons/lu";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import logo from "../assets/Main_Logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: FiUsers, label: "Subscribers", path: "/admin/subscribers" },
  { icon: FiDollarSign, label: "Payments", path: "/admin/payments" },
  { icon: LuLogs, label: "Logs", path: "/admin/logs" },
  { icon: GrUserAdmin, label: "Roles", path: "/admin/roles" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 z-[1000] w-64 bg-white shadow-xl flex flex-col items-center py-6">
      {/* Logo Section */}
      <div className="mb-12">
        <img src={logo} alt="Dexter AI Logo" width={30} className="w-[11rem]" />
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col text-[#7A8EAC] gap-6 flex-grow">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto text-[#6D68FB] pb-6">
        <NavItem
          icon={IoIosLogOut}
          label="Logout"
          isActive={false} // No active state needed for logout
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, onClick, isActive }) => {
  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition w-48 
        ${isActive ? "bg-[#6D68FB] text-white" : "hover:bg-[#F9FAFB]"}`}
      onClick={onClick}
    >
      <Icon className="text-xl" />
      <span>{label}</span>
    </div>
  );
};

export default Sidebar;
