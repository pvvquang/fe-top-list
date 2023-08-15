import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { SIZE, THEME, VARIANT } from "./constant";

interface ButtonProps {
  label?: string;
  children?: ReactNode;
  variant: keyof typeof VARIANT;
  color: keyof typeof THEME;
  size: keyof typeof SIZE;
  disabled?: boolean;
  onClick: () => void;
  tagName?: keyof JSX.IntrinsicElements;
  href?: string;
}

type ButtonPropsCustom = ButtonProps;

function Button({
  label = "",
  children,
  variant,
  color,
  size,
  disabled,
  onClick,
  tagName = "button",
  href = "#",
}: ButtonProps) {
  const TagName = tagName;

  const className = useMemo(() => {
    let _className =
      "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6";
    switch (variant) {
      case VARIANT.contained:
        _className +=
          "shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
        break;
      case VARIANT.outline:
        _className += "border border-current text-indio-500";
        break;
      default:
        _className += "";
        break;
    }
    switch (color) {
      case THEME.primary:
        if (variant === VARIANT.contained) {
          _className += "text-white bg-";
        }
        break;
      case THEME.primary:
        _className += "border";
        break;
      default:
        _className += "";
        break;
    }
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
