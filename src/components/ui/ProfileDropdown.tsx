import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CircleUser, LayoutDashboard, UserRound, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProfileDropdown() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className="
          flex items-center justify-center
          group p-1.5 rounded-full
          hover:bg-white/10
          transition-all duration-200
          focus:outline-none
          cursor-pointer
        "
      >
        <CircleUser
          size={26}
          className="text-white group-hover:text-gray-200 transition-colors"
        />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="
          mt-2 w-56 origin-top-right
          rounded-xl bg-white p-1
          shadow-xl border border-gray-100
          transition duration-100 ease-out
          data-closed:scale-95 data-closed:opacity-0
          focus:outline-none
          z-50
        "
      >
        {/* Cabeçalho do Dropdown com informações básicas do usuário */}
        <div className="px-4 py-2.5 border-b border-gray-100 mb-1">
          <p className="text-xs font-normal text-gray-400">Logado como</p>
          <p className="text-sm font-semibold text-gray-800 truncate">Minha Conta</p>
        </div>

        <div className="space-y-0.5">
          <MenuItem>
            <Link
              to="/dashboard"
              className="
                flex items-center gap-2.5 px-3 py-2
                text-sm text-gray-700 font-medium rounded-lg
                data-focus:bg-gray-50 data-focus:text-gray-900
                transition-colors
              "
            >
              <LayoutDashboard size={16} className="text-gray-400" />
              Meu Painel
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              to="/dashboard/profile"
              className="
                flex items-center gap-2.5 px-3 py-2
                text-sm text-gray-700 font-medium rounded-lg
                data-focus:bg-gray-50 data-focus:text-gray-900
                transition-colors
              "
            >
              <UserRound size={16} className="text-gray-400" />
              Meus Dados
            </Link>
          </MenuItem>

          {/* Divisor antes da ação de logout */}
          <div className="h-px bg-gray-100 my-1" />

          <MenuItem>
            <button
              onClick={handleLogout}
              className="
                w-full flex items-center gap-2.5 px-3 py-2
                text-sm text-red-600 font-medium rounded-lg text-left
                data-focus:bg-red-50 data-focus:text-red-700
                transition-colors
                cursor-pointer
              "
            >
              <LogOut size={16} className="text-red-400 data-focus:text-red-600" />
              Sair
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}