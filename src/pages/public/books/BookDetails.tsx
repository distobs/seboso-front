import {Link} from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 

export default function BookDetails() {
  return (
    <div className="p-6">
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
        <h1 className="bold">Detalhes do Livro</h1>
        <p>Aqui você pode ver e editar as informações do livro.</p>
    </div>
  );
}