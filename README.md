# CurriculoSenai

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