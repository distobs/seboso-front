import { BookOpen, ShieldCheck, Heart, Users2, Leaf, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50/50 to-white pb-20">
      
      {/* 1. Hero Section (Apresentação) */}
      <section className="relative bg-[#C37351]/10 border-b border-[#C37351]/5 py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#C37351_1px,transparent_1px)] bg-size-[16px_16px]" />
        
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-black text-[#A85F42] uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-orange-100 shadow-xs">
            Nossa História e Propósito
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none pt-2">
            Conectando leitores ao charme e à história dos <span className="text-[#C37351]">sebos locais</span>.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed pt-2">
            Acreditamos que cada livro usado carrega mais do que palavras: carrega marcas do tempo, dedicatórias e uma jornada única. Nosso papel é dar continuidade a essas histórias.
          </p>
        </div>
      </section>

      {/* 2. O Manifesto / Quem Somos */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[#C37351]">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Mais que uma plataforma, um ponto de encontro literário.
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Nascemos com o objetivo de digitalizar e fortalecer o comércio de sebos e livreiros independentes. Sabemos que gerenciar um acervo físico e diversificado exige paixão e organização. 
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Por isso, criamos um ecossistema completo onde donos de sebos gerenciam seus catálogos de forma inteligente, equipes trabalham em sintonia e leitores encontram relíquias literárias a preços acessíveis.
          </p>
        </div>

        {/* Box Lateral Estilizado */}
        <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-xs relative space-y-6">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#C37351]/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-start gap-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg mt-0.5">
              <Leaf size={18} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Consumo Sustentável</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Estender a vida útil de um livro reduz o impacto ambiental de novas impressões e fomenta a economia circular.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mt-0.5">
              <Store size={18} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Apoio ao Comércio Local</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Damos visibilidade e ferramentas profissionais para que sebos de bairro possam competir no mercado digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Nossos Valores Clave */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Valores que nos guiam</h3>
          <p className="text-xs text-gray-400 font-medium">Os pilares que sustentam a nossa comunidade e o desenvolvimento da plataforma.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* Card Valor 1 */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C37351] flex items-center justify-center">
              <Heart size={20} />
            </div>
            <h4 className="font-bold text-gray-800 text-base">Paixão pela Leitura</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tratamos o livro como um objeto de transformação cultural e afetiva, zelando pela preservação de acervos históricos.
            </p>
          </div>

          {/* Card Valor 2 */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C37351] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-gray-800 text-base">Confiança e Transparência</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Garantimos informações claras sobre o estado de conservação física dos exemplares, preços justos e gestão transparente de estoque.
            </p>
          </div>

          {/* Card Valor 3 */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C37351] flex items-center justify-center">
              <Users2 size={20} />
            </div>
            <h4 className="font-bold text-gray-800 text-base">Colaboração e Equipe</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Unimos donos, funcionários e leitores em uma rede inclusiva, facilitando papéis, acessos e auditoria transparente de rotina.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Call to Action (Chamada para Ação) */}
      <section className="max-w-4xl mx-auto px-4 mt-28">
        <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          {/* Círculo estético de fundo */}
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#C37351]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Quer fazer parte desta revolução literária?
            </h3>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Seja você um leitor ávido procurando seu próximo livro favorito ou um livreiro querendo expandir sua operação física para o ambiente digital.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => navigate("/dashboard")}
                className="px-5 py-3 bg-[#C37351] hover:bg-[#A85F42] text-white text-xs font-bold rounded-xl shadow-md transition-all duration-200"
              >
                Acessar meu Painel
              </button>
              <button 
                onClick={() => navigate("/")}
                className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-bold rounded-xl transition-all duration-200"
              >
                Explorar Acervos Globais
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}