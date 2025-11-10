import Chat, { useMessages, Bubble } from "@chatui/core";
import { useEffect } from "react";

const ChatBotUi = ({ showBot }) => {
  const { appendMsg, messages } = useMessages([]);

  useEffect(() => {
    // Initial bot message
    appendMsg({
      type: "text",
      content: {
        text: "Hello! I'm your city assistant. How can I help you today?",
      },
      position: "left",
    });
  }, []);
  return (
    <div
      className={`max-h-0 absolute top-22  z-9999 rounded-2xl overflow-hidden right-10 max-w-0  transition-all duration-500   ${
        showBot && `max-h-58 opacity-100 max-w-full ml-7 `
      }`}
    >
      <Chat
        navbar={{ title: "City Assistant" }}
        placeholder="Ask me anything city related..."
        messages={messages}
        renderMessageContent={(msg) => <Bubble content={msg.content.text} />}
      />
    </div>
  );
};

export default ChatBotUi;
