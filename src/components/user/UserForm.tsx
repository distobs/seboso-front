import { useState, type FormEvent } from "react";
import { Save, KeyRound, User as UserIcon, Mail, Smartphone, Eye, EyeOff } from "lucide-react";

//  Tipos importados diretamente do arquivo central de tipos
import type { User, UpdateUserInput } from "../../types/user";

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: UpdateUserInput) => Promise<void>;
  submitting: boolean;
}

export default function UserForm({ initialData, onSubmit, submitting }: UserFormProps) {
  // Estados do perfil baseados nas propriedades reais
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [login, setLogin] = useState(initialData?.login || "");
  const [cellNumber, setCellNumber] = useState(initialData?.cell_number || "");
  const [isActivated, setIsActivated] = useState(initialData?.is_activated ?? true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validação simples para garantir que a senha seja fornecida
    await onSubmit({
      name,
      email,
      login,
      password, // Obrigatório
      cell_number: cellNumber || null,
      is_activated: isActivated,
    });
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      
      {/* Bloco 1: Dados Cadastrais com Visual Premium */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none mb-2">
          Informações do Perfil
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Nome */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-gray-600 uppercase">Nome Completo</label>
            <div className="relative">
              <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C37351] focus:ring-1 focus:ring-[#C37351] transition-all"
              />
            </div>
          </div>

          {/* Login */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 uppercase">Username / Login</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-gray-400 select-none">@</span>
              <input
                type="text"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C37351] focus:ring-1 focus:ring-[#C37351] transition-all"
              />
            </div>
          </div>

          {/* Celular */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 uppercase">Telefone Celular</label>
            <div className="relative">
              <Smartphone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="(00) 00000-0000"
                value={cellNumber}
                onChange={(e) => setCellNumber(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C37351] focus:ring-1 focus:ring-[#C37351] transition-all"
              />
            </div>
          </div>

          {/* E-mail */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-gray-600 uppercase">Endereço de E-mail</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C37351] focus:ring-1 focus:ring-[#C37351] transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bloco 2: Segurança (Confirmação da Senha) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-4">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none flex items-center gap-1.5">
            <KeyRound size={14} className="text-amber-500" /> Confirmação de Credenciais
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            A API exige que a senha do usuário seja enviada para aplicar qualquer modificação nesta conta.
          </p>
        </div>

        <div className="space-y-1 max-w-md">
          <label className="text-xs font-bold text-gray-600 uppercase">Senha do Usuário</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Digite a senha atual ou defina uma nova"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C37351] focus:ring-1 focus:ring-[#C37351] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bloco 3: Controle de Ativação do Usuário (Utilizando Switch customizado) */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5 max-w-md">
          <span className="text-sm font-bold text-gray-800 block">Status da Conta Global</span>
          <span className="text-xs text-gray-400 block">
            Se inativo, o usuário perderá o acesso de login imediatamente em qualquer sebo ou catálogo.
          </span>
        </div>

        {/* Toggle Switch moderno no lugar do checkbox nativo */}
        <button
          type="button"
          onClick={() => setIsActivated(!isActivated)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isActivated ? "bg-emerald-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              isActivated ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Botão de Envio */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-[#C37351] text-white px-6 py-2.5 text-sm font-bold rounded-xl hover:bg-[#A85F42] active:scale-[0.99] disabled:bg-gray-200 disabled:text-gray-400 disabled:pointer-events-none transition-all shadow-xs"
        >
          <Save size={16} />
          {submitting ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
}