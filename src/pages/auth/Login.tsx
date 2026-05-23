import { Link, useNavigate } from "react-router-dom"; // Importa o Link e useNavigate do react-router-dom para criar links de navegação e programaticamente navegar entre as páginas do aplicativo
import { ArrowLeft } from "lucide-react"; // Importa o ícone ArrowLeft da biblioteca lucide-react para usar como ícone de voltar na página de login
import { useState } from "react"; // Importa o hook useState do React para gerenciar o estado dos campos de email e senha no formulário de login
import { loginUser } from "../../services/auth.service"; // Importa a função loginUser do serviço de autenticação para realizar a requisição de login à API quando o formulário for submetido
import { useAuth } from "../../hooks/useAuth"; /// Importa o hook useAuth do contexto de autenticação para acessar as funções de login e logout e o estado do usuário autenticado no aplicativo

export default function Login() {
  const navigate = useNavigate(); // Hook do React Router para programaticamente navegar entre as páginas do aplicativo
  const { login: authLogin } = useAuth();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para lidar com o envio do formulário de login
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ login, password });

      if (!response.success) {
        setError(response.message ?? "Erro no login");
        return;
      }

      if (!response.message) {
        setError("Token de autenticação não recebido");
        return;
      }

      authLogin(response.message);
      console.log("Login bem-sucedido!");
      console.log(localStorage.getItem("token"));
      navigate("/dashboard"); // Redireciona para o dashboard após login bem-sucedido
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no login");
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      {/* Botão Voltar Posicionado */}
      <Link
        to="/"
        className="absolute 
          top-6 
          left-6 
          w-12 
          h-12 
          flex 
          items-center 
          justify-center       
        bg-white 
        text-gray-600 
          rounded-full 
          shadow-md          
          hover:shadow-lg 
          hover:text-[#C37351] 
          transition-all 
          duration-300"
        title="Voltar"
      >
        <ArrowLeft size={24} />
      </Link>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
        {/* Logo / título */}
        <div className="mb-6 text-center">
          <h1
            className="text-5xl text-[#C37351]"
            style={{ fontFamily: "Imbue" }}
          >
            Seboso
          </h1>

          <p className="text-gray-500 mt-2">Entre na sua conta</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Login</label>

            <input
              type="text"
              placeholder="Digite seu login"
              required
              className="
                border border-gray-300
                rounded-lg
                px-3 py-2
                focus:outline-none
                focus:ring-2
                focus:ring-[#C37351]"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Senha</label>

            <input
              type="password"
              placeholder="Digite sua senha"
              required
              className="
                border border-gray-300
                rounded-lg
                px-3 py-2
                focus:outline-none
                focus:ring-2
                focus:ring-[#C37351]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botão */}
          <button
            type="submit"
            className="
              bg-[#C37351]
              hover:bg-[#A85F42]
              text-white
              py-2
              rounded-lg
              transition-colors
              cursor-pointer
              font-medium"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Não possui conta?{" "}
          <Link
            to="/signup"
            className="text-[#C37351] hover:underline font-medium"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
