export const Button = ({ children, onClick, styles, gradient = true }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        gradient && `bg-gradient-to-r from-[#121212] to-[#3c3c3c] `
      }   active:scale-[1.02] transition-all active:shadow-xl hover:shadow-xl block p-2 cursor-pointer  text-center text-white font-semibold text-sm ${styles} `}
    >
      {children}
    </button>
  );
};

