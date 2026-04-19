"use client";

import { forwardRef } from "react";

type MaskType = "cpf" | "telefone" | "data" | "mesano";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: MaskType;
}

function applyMask(value: string, mask: MaskType): string {
  const digits = value.replace(/\D/g, "");

  switch (mask) {
    case "cpf": {
      const d = digits.slice(0, 11);
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
      if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
      return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
    }
    case "telefone": {
      const d = digits.slice(0, 11);
      if (d.length <= 2) return d.length ? `(${d}` : "";
      if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
      return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    }
    case "data": {
      const d = digits.slice(0, 8);
      if (d.length <= 2) return d;
      if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
      return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
    }
    case "mesano": {
      const d = digits.slice(0, 6);
      if (d.length <= 2) return d;
      return `${d.slice(0, 2)}/${d.slice(2)}`;
    }
    default:
      return value;
  }
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = applyMask(e.target.value, mask);
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: masked },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    return (
      <input
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";
