"use client";

import { forwardRef } from "react";

type MaskType = "cpf" | "telefone" | "data" | "mesano";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: MaskType;
}

function applyMask(value: string, mask: MaskType): string {
  const d = value.replace(/\D/g, "");
  if (mask === "cpf") {
    const s = d.slice(0, 11);
    if (s.length <= 3) return s;
    if (s.length <= 6) return `${s.slice(0,3)}.${s.slice(3)}`;
    if (s.length <= 9) return `${s.slice(0,3)}.${s.slice(3,6)}.${s.slice(6)}`;
    return `${s.slice(0,3)}.${s.slice(3,6)}.${s.slice(6,9)}-${s.slice(9)}`;
  }
  if (mask === "telefone") {
    const s = d.slice(0, 11);
    if (s.length <= 2) return s.length ? `(${s}` : "";
    if (s.length <= 7) return `(${s.slice(0,2)}) ${s.slice(2)}`;
    return `(${s.slice(0,2)}) ${s.slice(2,7)}-${s.slice(7)}`;
  }
  if (mask === "data") {
    const s = d.slice(0, 8);
    if (s.length <= 2) return s;
    if (s.length <= 4) return `${s.slice(0,2)}/${s.slice(2)}`;
    return `${s.slice(0,2)}/${s.slice(2,4)}/${s.slice(4)}`;
  }
  if (mask === "mesano") {
    const s = d.slice(0, 6);
    if (s.length <= 2) return s;
    return `${s.slice(0,2)}/${s.slice(2)}`;
  }
  return value;
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = applyMask(e.target.value, mask);
      onChange?.({ ...e, target: { ...e.target, value: masked } });
    };
    return <input {...props} ref={ref} value={value} onChange={handleChange} />;
  }
);
MaskedInput.displayName = "MaskedInput";
