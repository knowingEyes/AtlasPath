import React from "react";

const Tag = ({ children }) => {
  return (
    <div className="bg-[#4A90E2] rounded-4xl w-max px-3 flex items-center justify-center py-1">
      <span className="text-xs text-white">{children}</span>
    </div>
  );
};

export default Tag;


