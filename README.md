# CurrículoSENAI 📄

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

## Integrantes do Grupo

- João Gabriel De Araújo
- João Bernardo Porto
- Vítor Hugo Trierveiler
