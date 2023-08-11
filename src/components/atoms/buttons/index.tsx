import Link from "next/link";
import { ReactNode } from "react";
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

  return TagName === "a" ? (
    <Link href={href}>{children ? children : label}</Link>
  ) : (
    <TagName>{children ? children : label}</TagName>
  );
}

export default Button;
