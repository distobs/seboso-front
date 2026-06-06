import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
    
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <Menu as="div" className="relative">
        <MenuButton
            className="
            flex items-center justify-center
            group
            p-2 rounded-full
            hover:bg-gray-100
            transition-colors
            cursor-pointer
            "
        >
            <CircleUser
            size={28}
            className="text-white group-hover:text-gray-400 transition-colors"
            />
        </MenuButton>

        <MenuItems
            anchor="bottom end"
            className="
            mt-2 w-48
            rounded-lg
            bg-white
            shadow-lg
            border
            border-gray-200
            focus:outline-none
            "
        >
            <div className="py-2">
            <MenuItem>
                <Link
                to="/dashboard"
                className="
                    block px-4 py-2
                    text-sm text-gray-700
                    data-focus:bg-gray-100
                "
                >
                Meu Painel
                </Link>
            </MenuItem>

            <MenuItem>
                <button
                onClick={handleLogout}
                className="
                    w-full text-left
                    px-4 py-2
                    text-sm text-red-600
                    data-focus:bg-gray-100
                "
                >
                Sair
                </button>
            </MenuItem>
            </div>
        </MenuItems>
        </Menu>
    );
}
