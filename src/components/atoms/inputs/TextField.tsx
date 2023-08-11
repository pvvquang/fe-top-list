import React from "react";

interface IProps {
  type?: string;
  label?: string;
  keyName: string;
  value: string;
  onChange: (
    value: string,
    keyName: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
}

function TextField({
  type,
  label,
  keyName,
  value,
  onChange,
  placeholder,
  error,
  errorMessage,
  required = false,
}: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, keyName, e);
  };

  return (
    <div>
      {!!label ? (
        <label
          htmlFor={keyName}
          className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      ) : null}

      <div className="mt-2">
        <input
          value={value}
          onChange={handleChange}
          id={keyName}
          name={keyName}
          type={type}
          required={required}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default TextField;
