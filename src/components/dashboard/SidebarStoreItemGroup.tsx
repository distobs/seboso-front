import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Store } from "lucide-react";
import { getStoreById } from "../../services/store.service";
import type { UserStore } from "../../types/userstore";

interface SidebarStoreItemGroupProps {
  storeRelation: UserStore;
}

export default function SidebarStoreItemGroup({ storeRelation }: SidebarStoreItemGroupProps) {
  const [storeName, setStoreName] = useState<string>("Carregando sebo...");

  useEffect(() => {
    async function loadStoreName() {
      try {
        const storeData = await getStoreById(storeRelation.store_id);
        setStoreName(storeData.name);
      } catch (err) {
        console.error(`Não foi possível carregar o nome do sebo ${storeRelation.store_id}:`, err);
        setStoreName(`Sebo #${storeRelation.store_id}`);
      }
    }
    loadStoreName();
  }, [storeRelation.store_id]); // Array de dependência travada no ID para evitar requisições infinitas

  return (
    <NavLink
      to={`/dashboard/stores/${storeRelation.store_id}`}
      className={({ isActive }) =>
        `
          flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
          ${isActive ? "bg-[#FDF6F3] text-[#C37351] font-bold" : "text-gray-700 hover:bg-gray-50"}
        `
      }
    >
      <Store size={16} className="text-gray-400" />
      <span className="truncate">{storeName}</span>
      <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase font-semibold">
        {storeRelation.role}
      </span>
    </NavLink>
  );
}