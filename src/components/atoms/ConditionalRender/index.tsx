import { ReactNode } from "react";

interface IProps {
  children: string | ReactNode;
  fallback?: string | ReactNode;
  conditional: boolean;
}

function ConditionalRender({ children, fallback, conditional }: IProps) {
  return conditional ? children : !!fallback ? fallback : null;
}

export default ConditionalRender;
