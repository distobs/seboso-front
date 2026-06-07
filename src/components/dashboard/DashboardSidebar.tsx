import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Users, LayoutDashboard, Store, BookOpen } from "lucide-react";
import SidebarStoreItemGroup from "./SidebarStoreItemGroup";

export default function DashboardSidebar() {
  const { user, isAdmin } = useAuth();

  return (
    <aside
      className="
        w-64
        min-h-screen
        border-r
        border-gray-200
        bg-white
        p-4
        flex
        flex-col
        gap-4
      "
    >
      <div className="px-3 py-2">
        <h2 className="text-2xl font-bold text-[#C37351]" style={{ fontFamily: "Imbue" }}>
          Meu Painel
        </h2>
      </div>

      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-[#FDF6F3] text-[#C37351] font-bold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-[#C37351]"
              }
            `
          }
        >
          <LayoutDashboard size={18} />
          Painel Geral
        </NavLink>

        {/* SEÇÃO DINÂMICA: Aparece apenas para Workers e Owners de Sebos */}
        {user && user.stores && user.stores.length > 0 && (
          <div className="mt-4">
            <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Meus Sebos
            </p>
            <div className="flex flex-col gap-1">
              {user.stores.map((storeRelation) => (
                <SidebarStoreItemGroup
                  key={`${storeRelation.store_id}-${storeRelation.role}`}
                  storeRelation={storeRelation}
                />
              ))}
            </div>
          </div>
        )}

        {/* SEÇÃO ADMINISTRATIVA GLOBAL: Bloqueada para Workers. Só renderiza se for de fato 'isAdmin' */}
        {isAdmin && (
          <div className="mt-4 flex flex-col gap-1">
            <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Administração Global
            </p>
            
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                `
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive ? "bg-[#FDF6F3] text-[#C37351] font-bold" : "text-gray-700 hover:bg-gray-50 hover:text-[#C37351]"}
                `
              }
            >
              <Users size={18} />
              Gerenciar Usuários
            </NavLink>

            <NavLink
              to="/dashboard/stores"
              className={({ isActive }) =>
                `
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive ? "bg-[#FDF6F3] text-[#C37351] font-bold" : "text-gray-700 hover:bg-gray-50 hover:text-[#C37351]"}
                `
              }
            >
              <Store size={18} />
              Gerenciar Sebos
            </NavLink>

            <NavLink
              to="/dashboard/books"
              className={({ isActive }) =>
                `
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive ? "bg-[#FDF6F3] text-[#C37351] font-bold" : "text-gray-700 hover:bg-gray-50 hover:text-[#C37351]"}
                `
              }
            >
              <BookOpen size={18} />
              Gerenciar Livros
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
}