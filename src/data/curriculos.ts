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
  createdAt?: unknown;
  updatedAt?: unknown;
}
