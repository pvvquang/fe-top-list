import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { SIZE, THEME, VARIANT } from "./constant";

interface ButtonProps {
  label?: string;
  children?: ReactNode;
  variant: keyof typeof VARIANT;
  color?: keyof typeof THEME;
  size?: keyof typeof SIZE;
  disabled?: boolean;
  onClick: () => void;
  tagName?: keyof JSX.IntrinsicElements;
  href?: string;
  classNameProps?: string;
}

type ButtonPropsCustom = ButtonProps;

function Button({
  label = "",
  children,
  variant,
  color = THEME.primary,
  size = SIZE.small,
  disabled,
  onClick,
  tagName = "button",
  href = "#",
  classNameProps,
}: ButtonProps) {
  const TagName = tagName;

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
  }, [variant, color, size]);

  const handleClick = () => {
    if (disabled) return;
    onClick();
  };

  return TagName === "a" ? (
    <Link href={href} className={className} onClick={handleClick}>
      {children ? children : label}
    </Link>
  ) : (
    <TagName className={className} onClick={handleClick}>
      {children ? children : label}
    </TagName>
  );
}

export default Button;
