interface ButtonProps {
  disabledCondition: boolean;
}

export default function Button({ disabledCondition }: ButtonProps) {
  return <button disabled={disabledCondition}>Add</button>;
}
