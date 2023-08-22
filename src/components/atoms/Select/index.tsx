import React, { CSSProperties, Fragment } from "react";
import ConditionalRender from "../ConditionalRender";
import { UseFormRegister } from "react-hook-form";
import { SelectOption } from "@/types/common.type";

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  width?: number | string;
  errorMessage?: string;
}

const Select = React.forwardRef<
  HTMLSelectElement,
  SelectProps & ReturnType<UseFormRegister<{ [key: string]: string }>>
>(function Select(
  { onChange, onBlur, name, label, options, width, errorMessage },
  ref
) {
  const styleArrow: CSSProperties = {
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    backgroundSize: "1em",
  };

  return (
    <Fragment>
      <ConditionalRender conditional={!!label}>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      </ConditionalRender>
      <select
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className="w-max min-w-[80px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-6 appearance-none"
        style={{ ...styleArrow, width }}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      {!!errorMessage && (
        <p className="text-xs mt-2 text-red-500">{errorMessage}</p>
      )}
    </Fragment>
  );
});

export default Select;
