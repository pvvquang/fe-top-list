interface IProps {
  color?: string;
  width?: number | string;
  className?: string;
}

function IconPosts({ color = "#808191", width = 32, className }: IProps) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1707 2.67703C15.3542 2.6002 15.5511 2.56064 15.75 2.56064C15.9489 2.56064 16.1458 2.6002 16.3293 2.67703C16.5117 2.7534 16.6772 2.86509 16.8163 3.00565L20.9943 7.18369C21.1349 7.32276 21.2466 7.48827 21.323 7.67068C21.3998 7.85416 21.4394 8.05109 21.4394 8.25001C21.4394 8.44893 21.3998 8.64586 21.323 8.82934C21.2466 9.01174 21.1349 9.17723 20.9944 9.31629L9.53033 20.7803C9.38968 20.921 9.19891 21 9 21H4.5C4.10218 21 3.72065 20.842 3.43934 20.5607C3.15804 20.2794 3 19.8978 3 19.5V15.3105M15.1707 2.67703C14.9882 2.75342 14.8227 2.86513 14.6836 3.00572L15.1707 2.67703ZM4.5 15.3107V19.5H8.68934L19.9394 8.24999L19.9353 8.24598L15.75 4.06065L15.746 4.06473L4.5 15.3107Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25 20.25C8.25 19.8358 8.58579 19.5 9 19.5H20.25C20.6642 19.5 21 19.8358 21 20.25C21 20.6642 20.6642 21 20.25 21H9C8.58579 21 8.25 20.6642 8.25 20.25Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2197 5.46967C12.5126 5.17678 12.9874 5.17678 13.2803 5.46967L18.5303 10.7197C18.8232 11.0126 18.8232 11.4874 18.5303 11.7803C18.2374 12.0732 17.7626 12.0732 17.4697 11.7803L12.2197 6.53033C11.9268 6.23744 11.9268 5.76256 12.2197 5.46967Z"
        fill={color}
      />
    </svg>
  );
}

export default IconPosts;
