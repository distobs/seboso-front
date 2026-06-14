import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, UserCog } from "lucide-react";

// 1. O serviço agora importa APENAS as funções do backend
import { getUserById, updateUser } from "../../../services/user.service";

// 2. Os tipos e interfaces vêm TODOS do arquivo centralizado na pasta types
import type { User, UpdateUserInput } from "../../../types/user";

import UserForm from "../../../components/user/UserForm"; 

export default function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getUserById(Number(id))
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleUpdate(formData: UpdateUserInput) {
    if (!id) return;
    setSubmitting(true);
    try {
      await updateUser(Number(id), formData);
      navigate("/dashboard/users");
    } catch (err) {
      alert("Falha ao salvar as alterações. Erro: " + (err instanceof Error ? err.message : "Desconhecido"));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="animate-pulse h-40 bg-gray-50 rounded-xl" />;
  if (!user) return <p className="text-sm text-red-500">Usuário não encontrado.</p>;

  return (
    <div className="max-w-2xl space-y-6 p-2">
      <button onClick={() => navigate("/dashboard/users")} className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-gray-600">
        <ArrowLeft size={14} /> Voltar para a lista
      </button>
      <div className="flex items-center gap-2 text-gray-900">
        <UserCog size={24} className="text-[#C37351]" />
        <h1 className="text-xl font-bold tracking-tight">Editar Perfil Global</h1>
      </div>

      {/* Utilizando o componente de formulário */}
      <UserForm initialData={user} onSubmit={handleUpdate} submitting={submitting} />
    </div>
  );
}