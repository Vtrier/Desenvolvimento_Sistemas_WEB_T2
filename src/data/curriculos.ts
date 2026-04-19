export interface Experiencia {
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
}

export interface Formacao {
  instituicao: string;
  curso: string;
  nivel: string;
  dataInicio: string;
  dataFim: string;
}

export interface Curriculo {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  cidade: string;
  estado: string;
  linkedin: string;
  github: string;
  resumo: string;
  habilidades: string[];
  experiencias: Experiencia[];
  formacoes: Formacao[];
  foto: string;
  createdAt: string;
}

export const MOCK_CURRICULOS: Curriculo[] = [
  {
    id: "1",
    nome: "Ana Clara Ferreira",
    cargo: "Engenheira de Software Sênior",
    email: "ana.ferreira@email.com",
    telefone: "(48) 99123-4567",
    cpf: "123.456.789-00",
    dataNascimento: "15/03/1992",
    cidade: "Florianópolis",
    estado: "SC",
    linkedin: "linkedin.com/in/anaclara",
    github: "github.com/anaclara",
    resumo:
      "Engenheira de software com mais de 8 anos de experiência em desenvolvimento full-stack, especializada em arquiteturas cloud-native e sistemas distribuídos. Apaixonada por código limpo e boas práticas de engenharia.",
    habilidades: ["TypeScript", "React", "Node.js", "AWS", "Docker", "PostgreSQL", "GraphQL"],
    experiencias: [
      {
        empresa: "Totvs S.A.",
        cargo: "Engenheira de Software Sênior",
        dataInicio: "03/2021",
        dataFim: "Atual",
        descricao:
          "Liderança técnica de squad de 6 pessoas, desenvolvimento de microserviços em Node.js e arquitetura de soluções em AWS.",
      },
      {
        empresa: "Softplan",
        cargo: "Desenvolvedora Full Stack",
        dataInicio: "06/2018",
        dataFim: "02/2021",
        descricao:
          "Desenvolvimento de sistemas jurídicos com React e Java Spring Boot, integração com APIs REST.",
      },
    ],
    formacoes: [
      {
        instituicao: "UFSC",
        curso: "Ciência da Computação",
        nivel: "Bacharelado",
        dataInicio: "03/2010",
        dataFim: "12/2014",
      },
    ],
    foto: "https://api.dicebear.com/8.x/personas/svg?seed=ana&backgroundColor=b6e3f4",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    nome: "Lucas Mendes Oliveira",
    cargo: "Product Designer",
    email: "lucas.mendes@email.com",
    telefone: "(11) 98765-4321",
    cpf: "987.654.321-00",
    dataNascimento: "22/07/1995",
    cidade: "São Paulo",
    estado: "SP",
    linkedin: "linkedin.com/in/lucasmendes",
    github: "github.com/lucasmendes",
    resumo:
      "Designer de produto com foco em experiências digitais acessíveis e intuitivas. Experiência em startups de tecnologia e empresas de médio porte, com proficiência em Design Systems e pesquisa com usuários.",
    habilidades: ["Figma", "Adobe XD", "Design System", "Pesquisa UX", "Prototipagem", "Acessibilidade"],
    experiencias: [
      {
        empresa: "Nubank",
        cargo: "Product Designer",
        dataInicio: "01/2022",
        dataFim: "Atual",
        descricao:
          "Design de features para o app mobile com mais de 80 milhões de usuários, condução de testes de usabilidade.",
      },
    ],
    formacoes: [
      {
        instituicao: "Universidade Anhembi Morumbi",
        curso: "Design Digital",
        nivel: "Bacharelado",
        dataInicio: "02/2013",
        dataFim: "12/2017",
      },
      {
        instituicao: "Interaction Design Foundation",
        curso: "UX Design",
        nivel: "Pós-Graduação",
        dataInicio: "01/2019",
        dataFim: "12/2019",
      },
    ],
    foto: "https://api.dicebear.com/8.x/personas/svg?seed=lucas&backgroundColor=ffd5dc",
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "3",
    nome: "Mariana Souza Costa",
    cargo: "Cientista de Dados",
    email: "mariana.costa@email.com",
    telefone: "(51) 97654-3210",
    cpf: "456.789.123-00",
    dataNascimento: "08/11/1990",
    cidade: "Porto Alegre",
    estado: "RS",
    linkedin: "linkedin.com/in/marianacosta",
    github: "github.com/marianacosta",
    resumo:
      "Cientista de dados com expertise em machine learning aplicado a negócios. Experiência em modelos preditivos, NLP e visualização de dados para tomada de decisão estratégica.",
    habilidades: ["Python", "TensorFlow", "Scikit-learn", "SQL", "Tableau", "Apache Spark", "R"],
    experiencias: [
      {
        empresa: "iFood",
        cargo: "Cientista de Dados Sênior",
        dataInicio: "09/2020",
        dataFim: "Atual",
        descricao:
          "Desenvolvimento de modelos de recomendação de restaurantes e análise de churn de usuários.",
      },
      {
        empresa: "Dell Technologies",
        cargo: "Analista de Dados",
        dataInicio: "04/2017",
        dataFim: "08/2020",
        descricao: "Análise de dados de supply chain e desenvolvimento de dashboards executivos.",
      },
    ],
    formacoes: [
      {
        instituicao: "PUCRS",
        curso: "Estatística",
        nivel: "Bacharelado",
        dataInicio: "03/2008",
        dataFim: "12/2012",
      },
      {
        instituicao: "USP",
        curso: "Inteligência Artificial",
        nivel: "Mestrado",
        dataInicio: "03/2015",
        dataFim: "12/2017",
      },
    ],
    foto: "https://api.dicebear.com/8.x/personas/svg?seed=mariana&backgroundColor=c0aede",
    createdAt: "2024-03-10T09:15:00Z",
  },
  {
    id: "4",
    nome: "Rafael Pinto Alves",
    cargo: "DevOps Engineer",
    email: "rafael.alves@email.com",
    telefone: "(21) 96543-2109",
    cpf: "321.654.987-00",
    dataNascimento: "30/04/1988",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    linkedin: "linkedin.com/in/rafaelpinto",
    github: "github.com/rafaelpinto",
    resumo:
      "Engenheiro DevOps especializado em infraestrutura como código e pipelines CI/CD. Experiência em ambientes críticos de alta disponibilidade e automação de processos.",
    habilidades: ["Kubernetes", "Terraform", "Jenkins", "GitLab CI", "Prometheus", "Ansible", "GCP"],
    experiencias: [
      {
        empresa: "Embraer",
        cargo: "DevOps Engineer",
        dataInicio: "07/2019",
        dataFim: "Atual",
        descricao:
          "Gerenciamento de infraestrutura crítica em Kubernetes, implementação de GitOps com ArgoCD.",
      },
    ],
    formacoes: [
      {
        instituicao: "UFF",
        curso: "Sistemas de Informação",
        nivel: "Bacharelado",
        dataInicio: "03/2006",
        dataFim: "12/2010",
      },
    ],
    foto: "https://api.dicebear.com/8.x/personas/svg?seed=rafael&backgroundColor=d1f4d1",
    createdAt: "2024-04-05T16:45:00Z",
  },
];
