import { CSSProperties, Fragment } from "react";
import { SelectProps } from ".";
import ConditionalRender from "../ConditionalRender";

interface IProps extends SelectProps {
  onChange: (value: string | number) => void;
  defaultValue: string | number;
}

const SelectController: React.FC<IProps> = ({
  label,
  options,
  width,
  onChange,
  defaultValue,
}) => {
  const styleArrow: CSSProperties = {
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    backgroundSize: "1em",
  };

  return (
    <Fragment>
      <ConditionalRender conditional={!!label}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      </ConditionalRender>
      <select
        className="w-max min-w-[80px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-6 appearance-none"
        style={{ ...styleArrow, width }}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

export default SelectController;
