const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
}: {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: any) => void;
  className?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border rounded-lg p-2 focus:outline-none ring-1 ring-dark-tile ${className}`}
      />
    </div>
  );
};

export default Input;
