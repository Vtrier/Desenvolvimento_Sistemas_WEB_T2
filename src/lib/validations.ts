import * as yup from "yup";

const experienciaSchema = yup.object({
  empresa: yup.string().min(2, "Empresa deve ter no mínimo 2 caracteres").required("Empresa é obrigatória"),
  cargo: yup.string().min(2, "Cargo deve ter no mínimo 2 caracteres").required("Cargo é obrigatório"),
  dataInicio: yup
    .string()
    .matches(/^\d{2}\/\d{4}$/, "Formato: MM/AAAA")
    .required("Data de início é obrigatória"),
  dataFim: yup.string().required("Data de fim é obrigatória"),
  descricao: yup.string().min(10, "Descrição deve ter no mínimo 10 caracteres").required("Descrição é obrigatória"),
});

const formacaoSchema = yup.object({
  instituicao: yup.string().min(2, "Instituição deve ter no mínimo 2 caracteres").required("Instituição é obrigatória"),
  curso: yup.string().min(2, "Curso deve ter no mínimo 2 caracteres").required("Curso é obrigatório"),
  nivel: yup.string().required("Nível é obrigatório"),
  dataInicio: yup
    .string()
    .matches(/^\d{2}\/\d{4}$/, "Formato: MM/AAAA")
    .required("Data de início é obrigatória"),
  dataFim: yup.string().required("Data de fim é obrigatória"),
});

export const curriculoSchema = yup.object({
  nome: yup.string().min(3, "Nome deve ter no mínimo 3 caracteres").required("Nome é obrigatório"),
  cargo: yup.string().min(3, "Cargo deve ter no mínimo 3 caracteres").required("Cargo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup
    .string()
    .min(14, "Telefone inválido")
    .required("Telefone é obrigatório"),
  cpf: yup
    .string()
    .min(14, "CPF inválido")
    .required("CPF é obrigatório"),
  dataNascimento: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Formato: DD/MM/AAAA")
    .required("Data de nascimento é obrigatória"),
  cidade: yup.string().min(2, "Cidade deve ter no mínimo 2 caracteres").required("Cidade é obrigatória"),
  estado: yup.string().length(2, "Use a sigla do estado (ex: SC)").required("Estado é obrigatório"),
  linkedin: yup.string().optional().default(""),
  github: yup.string().optional().default(""),
  resumo: yup.string().min(50, "Resumo deve ter no mínimo 50 caracteres").required("Resumo profissional é obrigatório"),
  habilidades: yup
    .string()
    .min(3, "Informe pelo menos uma habilidade")
    .required("Habilidades são obrigatórias"),
  experiencias: yup.array(experienciaSchema).min(1, "Adicione ao menos uma experiência profissional"),
  formacoes: yup.array(formacaoSchema).min(1, "Adicione ao menos uma formação acadêmica"),
});

export type CurriculoFormData = yup.InferType<typeof curriculoSchema>;
