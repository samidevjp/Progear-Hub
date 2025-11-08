export const TextField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[#171717] font-montserrat font-bold mb-2"
      >
        {label} {required && <span className="text-[#EF4444]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full h-12 px-4 border-2 rounded-full font-montserrat placeholder-[#9E9E9E] focus:outline-none ${
          error ? "border-red-500" : "border-[#171717] focus:border-[#EF4444]"
        }`}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600 font-montserrat"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export const SelectField = ({
  id,
  label,
  value,
  onChange,
  options = [],
  error,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[#171717] font-montserrat font-bold mb-2"
      >
        {label} {required && <span className="text-[#EF4444]">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full h-12 px-4 border-2 rounded-full font-montserrat focus:outline-none ${
          error ? "border-red-500" : "border-[#171717] focus:border-[#EF4444]"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600 font-montserrat"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export const Checkbox = ({ id, label, checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-[#EF4444] border-gray-300 rounded focus:ring-[#EF4444] focus:ring-2"
      />
      <span className="ml-2 text-[#171717] font-montserrat">{label}</span>
    </label>
  );
};

export const RadioCard = ({
  name,
  value,
  checked,
  onChange,
  title,
  description,
}) => {
  return (
    <label
      className={`block border rounded-lg p-4 cursor-pointer ${
        checked ? "border-[#EF4444]" : "border-[#E5E5E5]"
      }`}
    >
      <div className="flex items-start">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 mt-1 mr-3 text-[#EF4444] focus:ring-[#EF4444]"
        />
        <div>
          <p className="font-montserrat font-bold text-[#171717]">{title}</p>
          {description && (
            <p className="font-montserrat text-[#171717] text-sm mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </label>
  );
};
