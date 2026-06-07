import { MapPin } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import ProfileDropdown from "../ui/ProfileDropdown";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Livros", path: "/books" },
  { name: "About", path: "/about" },
];

export default function Header({
  location,
}: {
  location: string;
}) {
  return (
    <header>
      <TopBar location={location} />
      <NavBar />
    </header>
  );
}

// Barra superior
function TopBar({
  location,
}: {
  location: string;
}) {
  const { isAuthenticated } = useAuth();

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

        {isAuthenticated ? (
          <ProfileDropdown />
        ) : (
          <Link to="/login">
            <button
              className="
                bg-[#2f2a28]
                hover:bg-[#1f1b19]
                text-white
                px-4 py-2
                rounded
                transition-colors
                cursor-pointer
              "
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

// Navegação
function NavBar() {
  const { isAuthenticated, user, isAdmin } = useAuth();

  const hasDashboardAccess = isAdmin || (user?.stores && user.stores.length > 0);

  return (
    <nav className="bg-[#A85F42] px-6 py-3">
      <ul className="flex gap-6 text-neutral-100 font-bold">
        {navItems.map((item) => (
          <li key={item.path}>
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

        {isAuthenticated && hasDashboardAccess && (
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `border-b-2 pb-1 transition-colors ${
                  isActive
                    ? "border-white text-white"
                    : "border-transparent hover:border-neutral-200"
                }`
              }
            >
              Meu Painel
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}