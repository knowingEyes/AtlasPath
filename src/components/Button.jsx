export const Button = ({ children, onClick, styles }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#0373f3] block  p-2 cursor-pointer  text-center text-white font-semibold text-sm ${styles} `}
    >
      {children}
    </button>
  );
};
