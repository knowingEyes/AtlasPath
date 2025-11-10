const AppHeader = ({ children }) => {
  return (
    <header>
      <header className="my-5 flex justify-between items-center ">
        <div>
          <p className="text-gray-600 text-sm">Looking for inspiration?</p>
          <h1 className="text-2xl font-semibold">Start exploring!</h1>
        </div>
        {children}
      </header>
    </header>
  );
};

export default AppHeader;
