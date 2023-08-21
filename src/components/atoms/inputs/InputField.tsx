import { Fragment, forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import ConditionalRender from "../ConditionalRender";

type InputProps = {
  type?: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
};

const InputField = forwardRef<
  HTMLInputElement,
  InputProps & ReturnType<UseFormRegister<{ [key: string]: string }>>
>(function InputField(
  {
    type = "text",
    label,
    name,
    onChange,
    onBlur,
    placeholder,
    error,
    errorMessage,
  },
  ref
) {
  return (
    <Fragment>
      <ConditionalRender conditional={!!label}>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      </ConditionalRender>
      <input
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 ring-gray-300 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none ${
          !!errorMessage ? "focus:ring-red-600 ring-red-300" : ""
        }`}
      />
      {!!errorMessage && (
        <p className="text-xs mt-2 text-red-500">{errorMessage}</p>
      )}
    </Fragment>
  );
});

export default InputField;
