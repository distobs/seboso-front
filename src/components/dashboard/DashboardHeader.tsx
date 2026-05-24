import { MapPin } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Livros", path: "/books" },
  { name: "About", path: "/about" },
];

export default function DashboardHeader({ location }: { location: string }) {
  return (
    <header>
      <TopBar location={location} />
      <NavBar />
    </header>
  );
}

function TopBar({ location }: { location: string }) {
  return (
    <div className="bg-[#C37351] px-6 py-4 flex items-center justify-between">
      <Link to="/">
        <h1
          className="text-5xl tracking-wide text-[#FFF8F5]"
          style={{ fontFamily: "Imbue" }}
        >
          Seboso
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-neutral-100 font-bold">
          <MapPin size={20} className="opacity-80" />
          <span>{location}</span>
        </div>
        <Link to="/login">
          <button className="bg-[#2f2a28] hover:bg-[#1f1b19] cursor-pointer text-white px-4 py-2 rounded transition-colors">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="bg-[#A85F42] px-6 py-3">
      <ul className="flex gap-6 text-neutral-100 font-bold">
        {navItems.map((item) => (
          <li key={item.path} className="cursor-pointer">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `border-b-2 pb-1 transition-colors ${
                  isActive
                    ? "border-white text-white"
                    : "border-transparent hover:border-neutral-200"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
