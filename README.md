# 📚 Seboso

## 📖 Sobre o Projeto

O **Seboso** é uma aplicação web completa desenvolvida para modernizar a experiência de leitores e proprietários de sebos independentes. O sistema oferece uma vitrine pública intuitiva para busca e exploração de acervos, combinada com um painel administrativo robusto para gestão de catálogos, equipes e métricas.

Construído com foco em **escalabilidade, tipagem forte e separação de responsabilidades**, o frontend foi arquitetado para integrar-se perfeitamente a um backend real, suportando autenticação, controle de acesso por perfis e interfaces contextuais dinâmicas.

---

## 🛠️ Stack Tecnológica

| Tecnologia            | Finalidade                                 |
| --------------------- | ------------------------------------------ |
| `React 18+`           | Biblioteca principal de UI                 |
| `TypeScript`          | Tipagem estática e segurança de dados      |
| `Tailwind CSS`        | Estilização utility-first e responsividade |
| `React Router DOM`    | Roteamento e proteção de rotas             |
| `Context API + Hooks` | Gerenciamento de estado e autenticação     |
| `Fetch`       | Integração com API externa                 |
| `Vite`                | Build tool e dev server otimizado          |

---

## ✨ Funcionalidades Implementadas

### 🌐 Área Pública

- **Layout Home & Navegação:** Estrutura visual inicial com Header, Sidebar e páginas de `Home`, `Books`, `About`, `Login` e `Signup`.
- **Componentes Reutilizáveis:** `SeboCard` e `BookCard` otimizados para listagens e grids.
- **Detalhes de Sebos & Livros:** Páginas públicas com informações completas, catálogos, localização, avaliações e listagem de estabelecimentos que possuem determinado título.
- **Busca & Filtros Avançados:** Pesquisa por nome, autor, estado, cidade e categorias com integração real ao backend.

### 🔐 Autenticação & Controle de Acesso

- **Fluxo Completo de Auth:** Login e Signup conectados à API, com salvamento seguro de tokens e persistência de sessão.
- **Criação Opcional de Sebo:** Durante o cadastro, o usuário pode registrar um novo sebo automaticamente.
- **Rotas Protegidas por Roles:** Componente `ProtectedRoute` que valida autenticação e permissões (`admin`, `owner`, `employee`), restringindo acesso a menus e páginas internas.

### 📊 Dashboard Administrativo

- **Layout Privado:** `DashboardLayout` e `DashboardSidebar` independentes da área pública, preparados para navegação contextual e expansões futuras.
- **Gestão de Livros (CRUD):** Listagem, criação, edição e remoção de títulos com formulários validados e integração contínua.
- **Gerenciamento do Sebo:** Visualização e edição de dados institucionais, localização, descrição e métricas básicas (acesso `owner`).
- **Controle de Funcionários:** Listagem, edição e gestão de permissões operacionais da equipe vinculada ao sebo.
- **Painel Global de Usuários:** Área administrativa para `admin` gerenciar contas, perfis e permissões em nível de plataforma.

### 🎨 UX & Arquitetura

- **Sidebars Dinâmicas:** Refatoração do layout para suportar sidebars contextuais (filtros, detalhes, dashboard) sem duplicação de código.
- **Estados de UI:** Skeletons de carregamento, empty states, toasts de feedback e transições suaves.
- **Acessibilidade & Responsividade:** Navegação por teclado, contrastes adequados e adaptação fluida para mobile/tablet/desktop.
- **Integração API Centralizada:** Serviço `services/api.ts` com interceptação, tipagem forte, estados de `loading`/`error` e preparação para middleware de auth.

---

## 🏗️ Arquitetura & Padrões

- **Separação de Responsabilidades:** Áreas pública e privada isoladas, componentes atômicos/moleculares, e hooks customizados (`useAuth`, `useApi`, etc.).
- **Tipagem Forte:** Interfaces TypeScript compartilhadas entre `types/`, `services/` e componentes para garantir consistência em todo o fluxo de dados.
- **Escalabilidade:** Estrutura preparada para adição de novos módulos, sidebars contextuais, paginação, cache local e futuras integrações (ex: mapas, pagamentos, notificações).
- **Boas Práticas:** ESLint + Prettier, commits semânticos, aliases de importação e estrutura de pastas modular.

```
src/
├── components/      # UI reutilizável e layouts de página
│   ├── dashboard/   # Layout e componentes do painel administrativo
│   ├── layout/      # Layout público e Header/Sidebar compartilhados
│   └── ui/          # Cards, formulários, modais e componentes atômicos
├── pages/           # Rotas públicas e privadas
├── services/        # api.ts, endpoints tipados, serviços por recurso
├── contexts/        # AuthContext e outros providers
├── hooks/           # Hooks customizados como useAuth, useUserLocation
├── routes/          # Router config & ProtectedRoute
└── types/           # Interfaces e tipos globais
```

---

## 🚀 Instalação & Execução

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/seboso-frontend.git
cd seboso-frontend

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com a URL do backend: VITE_API_BASE_URL=https://api.seboso.dev

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

> ✅ O projeto estará disponível em `http://localhost:5173` (ou porta configurada).

---

## 🔮 Próximos Passos & Escalabilidade

- [ ] Paginação infinita / cursor-based nas listagens
- [ ] Cache local com `React Query` ou `SWR`
- [ ] Upload de imagens para capas de livros e logos de sebos
- [ ] Integração com mapas interativos para localização
- [ ] Internacionalização (i18n) e temas claro/escuro
- [ ] Testes automatizados (Vitest, React Testing Library, Cypress)

---
