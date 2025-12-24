import type { ComponentPropsWithoutRef } from 'react';

export default function InputField({
  type = 'text',
  ...props
}: ComponentPropsWithoutRef<'input'>) {
  return <input type={type} className="input-field" {...props} />;
}
