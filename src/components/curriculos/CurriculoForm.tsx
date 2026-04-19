"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import Image from "next/image";
import { FiPlus, FiTrash2, FiUpload } from "react-icons/fi";
import { curriculoSchema, CurriculoFormData } from "@/lib/validations";
import { useCurriculos } from "@/hooks/useCurriculos";
import { MaskedInput } from "@/components/ui/MaskedInput";

const NIVEIS = ["Técnico", "Tecnólogo", "Bacharelado", "Licenciatura", "Especialização", "MBA", "Mestrado", "Doutorado"];

export function CurriculoForm() {
  const router = useRouter();
  const { addCurriculo } = useCurriculos();
  const [foto, setFoto] = useState("");
  const [saving, setSaving] = useState(false);

  const {
    register, control, handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CurriculoFormData>({
    resolver: yupResolver(curriculoSchema),
    mode: "onChange",
    defaultValues: {
      experiencias: [{ empresa: "", cargo: "", dataInicio: "", dataFim: "", descricao: "" }],
      formacoes: [{ instituicao: "", curso: "", nivel: "", dataInicio: "", dataFim: "" }],
    },
  });

  const { fields: expFields, append: addExp, remove: rmExp } = useFieldArray({ control, name: "experiencias" });
  const { fields: formFields, append: addForm, remove: rmForm } = useFieldArray({ control, name: "formacoes" });

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagem muito grande (máx. 5MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setFoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: CurriculoFormData) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    addCurriculo({
      ...data,
      estado: data.estado.toUpperCase(),
      linkedin: data.linkedin ?? "",
      github: data.github ?? "",
      habilidades: data.habilidades.split(",").map((h) => h.trim()).filter(Boolean),
      experiencias: data.experiencias ?? [],
      formacoes: data.formacoes ?? [],
      foto: foto || `https://api.dicebear.com/8.x/personas/svg?seed=${encodeURIComponent(data.nome)}`,
    });
    toast.success("Currículo cadastrado com sucesso!");
    router.push("/curriculos/visualizar");
    setSaving(false);
  };

  const onError = (errs: typeof errors) => {
    const first = Object.values(errs)[0];
    const msg = first && "message" in first ? (first as { message?: string }).message : "Verifique os campos.";
    toast.error("Formulário inválido", { description: msg });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className="space-y-5">

      <div className="section-block">
        <p className="section-title">Dados Pessoais</p>

        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
            {foto
              ? <Image src={foto} alt="Foto" fill className="object-cover" />
              : <div className="h-full w-full flex items-center justify-center text-gray-300"><FiUpload size={20} /></div>}
          </div>
          <label className="btn-outline text-xs cursor-pointer">
            <FiUpload size={13} /> Selecionar foto
            <input type="file" accept="image/*" className="hidden" onChange={handleFoto} />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Nome completo" error={errors.nome?.message} required>
              <input {...register("nome")} className="input" placeholder="João da Silva" />
            </Field>
          </div>
          <Field label="Cargo / Área" error={errors.cargo?.message} required>
            <input {...register("cargo")} className="input" placeholder="Desenvolvedor Frontend" />
          </Field>
          <Field label="E-mail" error={errors.email?.message} required>
            <input {...register("email")} type="email" className="input" placeholder="joao@email.com" />
          </Field>
          <Field label="Telefone" error={errors.telefone?.message} required>
            <Controller control={control} name="telefone" render={({ field }) => (
              <MaskedInput mask="telefone" {...field} className="input" placeholder="(48) 99999-9999" />
            )} />
          </Field>
          <Field label="CPF" error={errors.cpf?.message} required>
            <Controller control={control} name="cpf" render={({ field }) => (
              <MaskedInput mask="cpf" {...field} className="input" placeholder="000.000.000-00" />
            )} />
          </Field>
          <Field label="Data de Nascimento" error={errors.dataNascimento?.message} required>
            <Controller control={control} name="dataNascimento" render={({ field }) => (
              <MaskedInput mask="data" {...field} className="input" placeholder="DD/MM/AAAA" />
            )} />
          </Field>
          <Field label="Cidade" error={errors.cidade?.message} required>
            <input {...register("cidade")} className="input" placeholder="Blumenau" />
          </Field>
          <Field label="Estado (sigla)" error={errors.estado?.message} required>
            <input {...register("estado")} className="input uppercase" placeholder="SC" maxLength={2} />
          </Field>
          <Field label="LinkedIn" error={errors.linkedin?.message}>
            <input {...register("linkedin")} className="input" placeholder="linkedin.com/in/usuario" />
          </Field>
          <Field label="GitHub" error={errors.github?.message}>
            <input {...register("github")} className="input" placeholder="github.com/usuario" />
          </Field>
        </div>
      </div>

      <div className="section-block">
        <p className="section-title">Perfil Profissional</p>
        <div className="space-y-4">
          <Field label="Resumo profissional" error={errors.resumo?.message} required hint="Mínimo 50 caracteres">
            <textarea {...register("resumo")} rows={4} className="input resize-none" placeholder="Descreva sua trajetória e objetivos..." />
          </Field>
          <Field label="Habilidades" error={errors.habilidades?.message} required hint="Separe por vírgulas: React, Node.js, SQL">
            <input {...register("habilidades")} className="input" placeholder="React, TypeScript, Node.js" />
          </Field>
        </div>
      </div>

      <div className="section-block">
        <div className="flex items-center justify-between mb-4">
          <p className="section-title" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: "none" }}>
            Experiência Profissional
          </p>
          <button type="button" onClick={() => addExp({ empresa: "", cargo: "", dataInicio: "", dataFim: "", descricao: "" })} className="btn-outline text-xs">
            <FiPlus size={13} /> Adicionar
          </button>
        </div>
        {typeof errors.experiencias?.message === "string" && (
          <p className="field-error mb-2">{errors.experiencias.message}</p>
        )}
        <div className="space-y-4">
          {expFields.map((f, i) => (
            <div key={f.id} className="dynamic-item">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500">Experiência {i + 1}</span>
                {expFields.length > 1 && (
                  <button type="button" onClick={() => rmExp(i)} className="text-red-400 hover:text-red-600 transition-colors">
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Empresa" error={errors.experiencias?.[i]?.empresa?.message} required>
                  <input {...register(`experiencias.${i}.empresa`)} className="input" placeholder="Nome da empresa" />
                </Field>
                <Field label="Cargo" error={errors.experiencias?.[i]?.cargo?.message} required>
                  <input {...register(`experiencias.${i}.cargo`)} className="input" placeholder="Seu cargo" />
                </Field>
                <Field label="Data de Início" error={errors.experiencias?.[i]?.dataInicio?.message} required>
                  <Controller control={control} name={`experiencias.${i}.dataInicio`} render={({ field }) => (
                    <MaskedInput mask="mesano" {...field} className="input" placeholder="MM/AAAA" />
                  )} />
                </Field>
                <Field label="Data de Fim" error={errors.experiencias?.[i]?.dataFim?.message} required>
                  <input {...register(`experiencias.${i}.dataFim`)} className="input" placeholder="MM/AAAA ou Atual" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Descrição" error={errors.experiencias?.[i]?.descricao?.message} required>
                    <textarea {...register(`experiencias.${i}.descricao`)} rows={2} className="input resize-none" placeholder="Descreva as atividades..." />
                  </Field>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-block">
        <div className="flex items-center justify-between mb-4">
          <p className="section-title" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: "none" }}>
            Formação Acadêmica
          </p>
          <button type="button" onClick={() => addForm({ instituicao: "", curso: "", nivel: "", dataInicio: "", dataFim: "" })} className="btn-outline text-xs">
            <FiPlus size={13} /> Adicionar
          </button>
        </div>
        {typeof errors.formacoes?.message === "string" && (
          <p className="field-error mb-2">{errors.formacoes.message}</p>
        )}
        <div className="space-y-4">
          {formFields.map((f, i) => (
            <div key={f.id} className="dynamic-item">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500">Formação {i + 1}</span>
                {formFields.length > 1 && (
                  <button type="button" onClick={() => rmForm(i)} className="text-red-400 hover:text-red-600 transition-colors">
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Instituição" error={errors.formacoes?.[i]?.instituicao?.message} required>
                  <input {...register(`formacoes.${i}.instituicao`)} className="input" placeholder="Nome da instituição" />
                </Field>
                <Field label="Curso" error={errors.formacoes?.[i]?.curso?.message} required>
                  <input {...register(`formacoes.${i}.curso`)} className="input" placeholder="Nome do curso" />
                </Field>
                <Field label="Nível" error={errors.formacoes?.[i]?.nivel?.message} required>
                  <select {...register(`formacoes.${i}.nivel`)} className="input">
                    <option value="">Selecione...</option>
                    {NIVEIS.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </Field>
                <Field label="Data de Início" error={errors.formacoes?.[i]?.dataInicio?.message} required>
                  <Controller control={control} name={`formacoes.${i}.dataInicio`} render={({ field }) => (
                    <MaskedInput mask="mesano" {...field} className="input" placeholder="MM/AAAA" />
                  )} />
                </Field>
                <Field label="Data de Conclusão" error={errors.formacoes?.[i]?.dataFim?.message} required>
                  <input {...register(`formacoes.${i}.dataFim`)} className="input" placeholder="MM/AAAA ou Em curso" />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pb-6">
        <button type="button" onClick={() => router.back()} className="btn-outline">
          Cancelar
        </button>
        <button type="submit" disabled={saving || !isDirty} className="btn-primary min-w-[120px]">
          {saving
            ? <><span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full inline-block" /> Salvando...</>
            : "Salvar"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, error, required, hint, children }: {
  label: string; error?: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="field-hint">{hint}</p>}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
