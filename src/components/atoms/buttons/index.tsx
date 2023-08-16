import { ReactNode, useMemo } from "react";
import { SIZE, THEME, VARIANT } from "./constant";

interface ButtonProps {
  label?: string;
  children?: ReactNode;
  variant?: keyof typeof VARIANT;
  color?: keyof typeof THEME;
  size?: keyof typeof SIZE;
  disabled?: boolean;
  onClick: () => void;
  classNameProps?: string;
  type?: "button" | "submit" | "reset";
}

function Button({
  label = "",
  children,
  variant = VARIANT.contained,
  color = THEME.primary,
  size = SIZE.small,
  disabled,
  onClick,
  classNameProps,
  type = "button",
}: ButtonProps) {
  const className = useMemo(() => {
    let _className =
      "flex items-center justify-center rounded-md w-max  text-sm font-semibold leading-6 transition";
    switch (variant) {
      case VARIANT.contained:
        _className +=
          " shadow-sm bg-indigo-500 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
        break;
      case VARIANT.outline:
        _className += " border border-current";
        break;
      default:
        _className += " px-0 py-0 max-h-fit";
        break;
    }
    switch (color) {
      case THEME.primary:
        if (variant === VARIANT.contained) {
          _className += " text-white";
        } else {
          _className += " text-indigo-500";
        }
        break;
      case THEME.success:
        _className += " text-indigo-500";
        break;
      case THEME.error:
        _className += " bg-red-600 text-white shadow-sm hover:bg-red-500";
        break;
      case THEME.info:
        _className +=
          " bg-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";
        break;
      default:
        _className += "";
        break;
    }
    switch (size) {
      case SIZE.large:
        _className += " px-6 py-3.5";
        break;
      case SIZE.medium:
        _className += " px-5 py-2.5";
        break;
      default:
        _className += " px-3 py-2";
        break;
    }
    if (disabled) {
      _className +=
        " bg-gray-600 pointer-events-none cursor-default opacity-60";
    }
    _className += ` ${classNameProps}`;
    return _className;
  }, [variant, color, size, classNameProps, disabled]);

  const handleClick = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <button type={type} className={className} onClick={handleClick}>
      {children ? children : label}
    </button>
  );
}

export default Button;
