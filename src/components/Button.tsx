interface ButtonProps {
  disabledCondition: boolean;
  handleClick: () => void;
}

export default function Button({
  disabledCondition,
  handleClick,
}: ButtonProps) {
  return (
    <button
      className="add-transaction-btn"
      disabled={disabledCondition}
      onClick={handleClick}
    >
      Add
    </button>
  );
}
