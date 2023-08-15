interface IProps {
  color?: string;
  width?: number | string;
  className?: string;
}

function IconMedia({ color = "#808191", width = 32, className }: IProps) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M17 9.6L18.8314 8.2814C20.1544 7.32887 22 8.27427 22 9.90447V14.0955C22 15.7257 20.1544 16.6711 18.8314 15.7186L17 14.4"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3"
        y="3"
        width="14"
        height="18"
        rx="4"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconMedia;
