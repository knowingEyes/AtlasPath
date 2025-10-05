export const Message = ({ message, type = "normal", children }) => {
  return (
    <>
      {type === "normal" && <p>{message}</p>}

      {type === "fullscreen" && (
        <div className="h-screen  p-5 flex items-center justify-center text-center">
          <div
            className={`${
              children && "flex flex-col items-center gap-2 justify-center"
            }`}
          >
            {children}
            <p>{message}</p>
          </div>
        </div>
      )}

      {type === "absolute" && (
        <div className="absolute inset-0 text-center h-max m-auto">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};
