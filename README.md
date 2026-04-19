# CurrículoSENAI 📄

Sistema moderno de **Gestão de Currículos** desenvolvido com Next.js 14, Tailwind CSS e as melhores práticas de desenvolvimento frontend.

## 🚀 Tecnologias

| Tecnologia | Uso |
|---|---|
| **Next.js 14** (App Router) | Framework principal |
| **TypeScript** | Tipagem estática |
| **Tailwind CSS** | Estilização responsiva |
| **shadcn/ui** (componentes base) | UI Components |
| **React Hook Form** | Gerenciamento de formulários |
| **Yup** | Validação de esquemas |
| **react-input-mask** | Máscaras de entrada (CPF, telefone, data) |
| **Sonner** | Notificações toast |
| **React Icons** | Ícones |
| **Next Image** | Otimização de imagens |

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                          # Landing page (/)
│   ├── layout.tsx                        # Root layout + Toaster
│   ├── globals.css                       # Design system + tokens
│   ├── not-found.tsx                     # Página 404
│   └── curriculos/
│       ├── visualizar/
│       │   ├── page.tsx                  # Lista de currículos
│       │   └── [id]/
│       │       ├── page.tsx              # Detalhe do currículo
│       │       └── loading.tsx           # Skeleton screen
│       └── cadastrar/
│           └── page.tsx                  # Formulário de cadastro
├── components/
│   ├── global/
│   │   ├── Header.tsx                    # Header + Nav com active state
│   │   └── Footer.tsx
│   ├── curriculos/
│   │   ├── CurriculoCard.tsx             # Card animado
│   │   ├── CurriculoForm.tsx             # Formulário com field arrays
│   │   └── EmptyState.tsx               # Estado vazio
│   └── ui/
│       └── skeleton.tsx                  # Skeletons de carregamento
├── data/
│   └── curriculos.ts                     # Dados mockados
├── hooks/
│   └── useCurriculos.ts                  # Hook de persistência (localStorage)
├── lib/
│   ├── utils.ts                          # cn() helper
│   └── validations.ts                    # Schemas Yup
└── middleware.ts                         # Proteção de rotas
```

## 🗺️ Rotas

| Rota | Descrição |
|---|---|
| `/` | Landing page com apresentação do sistema |
| `/curriculos/visualizar` | Lista de currículos com busca em tempo real |
| `/curriculos/visualizar/[id]` | Detalhes completos do candidato |
| `/curriculos/cadastrar` | Formulário de cadastro |

> As rotas `/sistema/paginas/*` são protegidas e redirecionam para as rotas amigáveis.

## ✅ Funcionalidades

### 🔍 Busca em Tempo Real
- Campo de busca com **debounce de 300ms**
- Filtra por nome, cargo, cidade ou habilidade
- Contador de resultados e botão de limpar busca

### 📝 Formulário Dinâmico
- **useFieldArray** do React Hook Form para experiências e formações
- Adicionar/remover campos dinamicamente
- Validação individual de cada item com Yup

### 🎭 Estados Visuais
- **Skeleton Screen** durante carregamento de dados
- **Empty State** com ilustração quando não há currículos
- Loading simulado de 800ms para simular chamada de API

### 🎯 Validações (Yup)
- Campos obrigatórios
- Formato de e-mail
- CPF e telefone com máscara
- Datas no formato correto
- Mínimo de caracteres em textos
- Toasts com a mensagem de erro específica do campo

### 💾 Persistência
- **localStorage** para manter dados entre sessões
- 4 currículos mockados carregados na primeira vez
- Upload fake de foto com preview local (FileReader)

### 🎨 Design
- Paleta azul primária com acento ciano (análogas)
- Tipografia: **Sora** (corpo) + **Playfair Display** (títulos)
- Animações suaves com CSS keyframes e stagger delays
- Totalmente responsivo (mobile, tablet, desktop)

## ▶️ Como executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/curriculos-app.git
cd curriculos-app

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Acesse em
http://localhost:3000
```

## 🏗️ Build para produção

```bash
npm run build
npm start
```

## 👥 Integrantes do Grupo

- Nome 1 — RA: XXXXXXXX
- Nome 2 — RA: XXXXXXXX
- Nome 3 — RA: XXXXXXXX

## 📅 Etapas

- [x] **Etapa 1** — Frontend, UI/UX e Validações (30%)
- [ ] **Etapa 2** — Integração com Backend e Banco de Dados (50%)
- [ ] **Etapa 3** — Deploy (Vercel) e Versionamento (GitHub) (20%)

---

Desenvolvido com ❤️ usando Next.js e Tailwind CSS.
