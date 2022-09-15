import { InputHTMLAttributes } from 'react';

type FormInputProps = InputHTMLAttributes<HTMLInputElement>

export function FormInput(props: FormInputProps) {
  return (                 
    <input 
      {...props}
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
    />
  );
}
