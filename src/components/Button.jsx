export const Button = ({ children, onClick, styles }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#121212] active:scale-[1.02] transition-all active:shadow-xl hover:shadow-xl block  p-2 cursor-pointer  text-center text-white font-semibold text-sm ${styles} `}
    >
      {children}
    </button>
  );
};
