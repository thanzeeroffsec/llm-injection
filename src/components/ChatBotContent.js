import React from "react";

const ChatBotContent = ({ children, title }) => {
  return (
    <div className="mt-5">
      <h1 className="text-lg font-semibold pl-2 mb-2">{title}</h1>
      <div className="bg-[#f1f3f5] rounded-2xl h-16 border border-[black]/[0.2] flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default ChatBotContent;
