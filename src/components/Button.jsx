export const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#0373f3] block w-full p-2 cursor-pointer rounded-full text-center text-white font-semibold text-sm"
    >
      {children}
    </button>
  );
};
