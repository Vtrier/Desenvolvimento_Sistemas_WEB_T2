# CurriculoSenai - Etapa 1

Sistema moderno de **Gestão de Currículos** desenvolvido com Next.js 14, Tailwind CSS e as melhores práticas de desenvolvimento frontend.

## Tecnologias

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

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Landing page com apresentação do sistema |
| `/curriculos/visualizar` | Lista de currículos com busca em tempo real |
| `/curriculos/visualizar/[id]` | Detalhes completos do candidato |
| `/curriculos/cadastrar` | Formulário de cadastro |

## Funcionalidades

### Busca em Tempo Real
- Campo de busca com **debounce de 300ms**
- Filtra por nome, cargo, cidade ou habilidade
- Contador de resultados e botão de limpar busca

### Formulário Dinâmico
- **useFieldArray** do React Hook Form para experiências e formações
- Adicionar/remover campos dinamicamente
- Validação individual de cada item com Yup

### Estados Visuais
- **Skeleton Screen** durante carregamento de dados
- **Empty State** com ilustração quando não há currículos
- Loading simulado de 800ms para simular chamada de API

### Validações (Yup)
- Campos obrigatórios
- Formato de e-mail
- CPF e telefone com máscara
- Datas no formato correto
- Mínimo de caracteres em textos
- Toasts com a mensagem de erro específica do campo

### Persistência
- **localStorage** para manter dados entre sessões
- 4 currículos mockados carregados na primeira vez
- Upload fake de foto com preview local (FileReader)

### Design
- Paleta azul primária
- Tipografia: **Sora** (corpo) + **Playfair Display** (títulos)
- Animações suaves com CSS keyframes e stagger delays
- Totalmente responsivo (mobile, tablet, desktop)

## Como executar

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

## Build para produção

```bash
npm run build
npm start
```

# CurriculoSenai - Etapa 2

Sistema de Gestão de Currículos — Next.js 14 + Firebase Firestore.

## Tecnologias

| Tech | Uso |
|---|---|
| Next.js 14 (App Router) | Framework principal |
| Tailwind CSS | Estilização |
| React Hook Form + Yup | Formulários e validação |
| Sonner | Toasts de feedback |
| React Icons | Ícones |
| **Firebase Firestore** | Banco de dados (Etapa 2) |

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Configurar Firebase
cp .env.example .env.local
# Edite .env.local com os dados do seu projeto Firebase

# 3. Rodar
npm run dev
```

## Configuração do Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Crie um projeto → Adicione um app Web
3. Copie as credenciais para `.env.local`
4. No Firestore → Criar banco → modo de teste

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Landing page |
| `/curriculos/visualizar` | Lista de currículos |
| `/curriculos/visualizar/[id]` | Detalhes + análise de completude |
| `/curriculos/cadastrar` | Novo currículo |
| `/curriculos/editar/[id]` | Editar currículo |
| `/curriculos/sugestoes` | Busca por aderência |

## Arquitetura

```
src/
├── app/                         # Rotas (Next.js App Router)
├── components/
│   ├── curriculos/
│   │   ├── CurriculoCard.jsx    # Card da listagem
│   │   ├── CurriculoForm.jsx    # Formulário (cadastro e edição)
│   │   ├── EmptyState.jsx       # Estado vazio
│   │   └── SugestoesCurriculo.jsx # Feature de sugestão
│   ├── global/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── ui/
│       ├── MaskedInput.jsx      # Máscaras CPF/telefone/data
│       └── skeleton.jsx         # Loading skeletons
├── hooks/
│   └── useCurriculos.js         # Estado + integração com service
├── lib/
│   ├── firebase.js              # Inicialização do Firebase
│   ├── curriculoService.js      # CRUD no Firestore
│   └── validations.js           # Schemas Yup
└── utils/
    └── sugestoesCurriculo.js    # Lógica de análise e sugestão
```

## Feature: Sugestão de Currículos

### Análise de completude (`analisarCurriculo`)
Avalia cada currículo e retorna uma pontuação (0–100) com sugestões de melhoria:
- Resumo muito curto (< 100 chars) → −20 pts
- Sem experiências → −25 pts
- Sem formação → −20 pts
- Menos de 3 habilidades → −15 pts
- E-mail inválido → −10 pts
- Telefone incompleto → −10 pts

### Busca por aderência (`sugerirCurriculos`)
Recebe um texto livre (ex: "React Node.js Pleno") e rankeia os currículos pela proporção de termos que coincidem com habilidades, cargo ou resumo do candidato. Retorna ordenado do mais aderente ao menos.

## Integrantes do Grupo

- João Gabriel De Araújo
- João Bernardo Porto
- Vítor Hugo Trierveiler
