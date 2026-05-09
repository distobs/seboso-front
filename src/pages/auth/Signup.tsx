import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Signup() {
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

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">

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
        <form className="flex flex-col gap-4">

          {/* Nome */}
          <div className="flex flex-col gap-1">

            <label className="text-sm font-medium text-gray-700">
              Nome
            </label>

            <input
              type="text"
              placeholder="Digite seu nome"
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

          {/* Email */}
          <div className="flex flex-col gap-1">

            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Digite seu email"
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

          {/* Senha */}
          <div className="flex flex-col gap-1">

            <label className="text-sm font-medium text-gray-700">
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha"
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

          {/* Confirmar senha */}
          <div className="flex flex-col gap-1">

            <label className="text-sm font-medium text-gray-700">
              Confirmar senha
            </label>

            <input
              type="password"
              placeholder="Confirme sua senha"
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
              font-medium
            "
          >
            Criar conta
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