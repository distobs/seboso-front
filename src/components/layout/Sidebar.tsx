type Props = {
  pageTitle: string;
};

export default function Sidebar({ pageTitle }: Props) {
  return (
    <aside className="w-72 p-5 gap-4 bg-white border-r border-[#E5E5E5] min-h-screen">

      <div className="px-3 py-2">
        <h2 className="text-2xl font-bold text-[#C37351]" style={{ fontFamily: "Imbue" }}>
          Buscar por {pageTitle}
        </h2>
      </div>

      <input
        type="text"
        placeholder="Digite o nome..."
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

    </aside>
  );
}