type Props = {
  pageTitle: string;
};

export default function DashboardSidebar({ pageTitle }: Props) {
  return (
    <aside className="w-72 p-5 bg-white border-r border-[#E5E5E5] min-h-screen">
      <h2 className="font-semibold mb-4">Buscar {pageTitle}</h2>

      <input
        type="text"
        placeholder="Digite o nome..."
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <h2 className="font-semibold mb-2">Estado</h2>

      <div className="flex flex-col gap-2">
        {["CE", "SP", "RJ", "BA"].map((state) => (
          <label key={state} className="flex items-center gap-2">
            <input type="checkbox" />
            {state}
          </label>
        ))}
      </div>
    </aside>
  );
}
