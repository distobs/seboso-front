import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import {signupUser} from "../../services/auth.service"; // Importa a função signupUser do serviço de autenticação para realizar a requisição de criação de conta à API 
import { ArrowLeft } from "lucide-react"; 

export default function Signup() {

  const navigate = useNavigate();

  const [createStore, setCreateStore] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    login: "",
    password: "",
    cell_number: "",
     is_activated: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signupUser(formData);
      navigate("/login");

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao criar conta"
      );

    } finally {
      setLoading(false);

    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">

      {/* Botão Voltar Posicionado */}
      <Link
        to="/"
        className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center 
                   bg-white text-gray-600 rounded-full shadow-md 
                   hover:shadow-lg hover:text-[#C37351] transition-all duration-300"
        title="Voltar"
      >
        <ArrowLeft size={24} />
      </Link>


      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

        {/* Logo */}
        <div className="mb-6 text-center">

          <h1
            className="text-5xl text-[#C37351]"
            style={{ fontFamily: "Imbue" }}
          >
            Seboso
          </h1>

          <p className="text-gray-500 mt-2">
            Crie sua conta
          </p>

        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          {/* Nome */}
          <div className="flex flex-col gap-1">

            <label className="text-sm font-medium text-gray-700">
              Nome
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Digite seu nome"
              className="
                border border-gray-300
                rounded-lg
                px-3 py-2
                focus:outline-none
                focus:ring-2
                focus:ring-[#C37351]"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">

            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="Digite seu email"
              className="
                border border-gray-300
                rounded-lg
                px-3 py-2
                focus:outline-none
                focus:ring-2
                focus:ring-[#C37351]"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          {/* Login */}
          <div className="flex flex-col gap-1">

            <label className="text-sm font-medium text-gray-700">
              Login
            </label>

            <input
              type="text"
              name="login"
              required
              placeholder="Digite seu login"
              className="
                border border-gray-300
                rounded-lg
                px-3 py-2
                focus:outline-none
                focus:ring-2
                focus:ring-[#C37351]"
              value={formData.login}
              onChange={handleChange}
            />

          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1">

            <label className="text-sm font-medium text-gray-700">
              Senha
            </label>

            <input
              type="password"
              name="password"
              required
              placeholder="Digite sua senha"
              className="
                border border-gray-300
                rounded-lg
                px-3 py-2
                focus:outline-none
                focus:ring-2
                focus:ring-[#C37351]"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          {/* Número de Celular */}
          <div className="flex flex-col gap-1">

            <label className="text-sm font-medium text-gray-700">
              Número de Celular
            </label>

            <input
              type="tel"
              name="cell_number"
              required
              placeholder="Digite seu número de celular"
              className="
                border border-gray-300
                rounded-lg
                px-3 py-2
                focus:outline-none
                focus:ring-2
                focus:ring-[#C37351]"
              value={formData.cell_number}
              onChange={handleChange}
            />

          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-700">

            <input
              type="checkbox"

              checked={createStore}
              onChange={() => setCreateStore(!createStore)}
            />

            Desejo cadastrar um sebo

          </label>

          {/* Campos do Sebo */}
          {createStore && (

            <div className="flex flex-col gap-4 border-t pt-4">

              <h2 className="font-semibold text-gray-800">
                Dados do Sebo
              </h2>

              {/* Nome do Sebo */}
              <input
                type="text"
                placeholder="Nome do sebo"
                className="
                  border border-gray-300
                  rounded-lg
                  px-3 py-2
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#C37351]
                "
              />

              {/* Cidade */}
              <input
                type="text"
                placeholder="Cidade"
                className="
                  border border-gray-300
                  rounded-lg
                  px-3 py-2
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#C37351]
                "
              />

              {/* Estado */}
              <input
                type="text"
                placeholder="Estado"
                className="
                  border border-gray-300
                  rounded-lg
                  px-3 py-2
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#C37351]
                "
              />

            </div>

          )}

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

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
            {loading
              ? "Criando..."
              : "Criar conta"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">

          Já possui conta?{" "}

          <Link
            to="/login"
            className="text-[#C37351] hover:underline font-medium"
          >
            Entrar
          </Link>

        </p>

      </div>

    </div>
  );
}