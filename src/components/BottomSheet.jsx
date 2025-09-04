export const BottomSheet = ({ children }) => {
  return (
    <div className="fixed bottom-0 overflow-y-auto bg-white text-black h-max-[53%] h-[54%] w-full rounded-t-[20px] p-5  z-100">
      {children}
    </div>
  );
};
