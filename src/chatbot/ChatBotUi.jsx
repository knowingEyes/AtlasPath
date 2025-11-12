import { CB_API_TOKEN } from "../config/apiconfig";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import Chat, { Bubble } from "@chatui/core";

import useChatBot from "./useChatBot";

const ChatBotUi = ({ showBot }) => {
  const { messages, handleSend, chatRef } = useChatBot();

  return (
    <div
      ref={chatRef}
      className={`max-h-0 absolute top-22  z-9999 rounded-2xl overflow-auto right-10 max-w-0  transition-all  duration-500 ${
        showBot && `max-h-60  max-w-full  ml-7 h-auto `
      }`}
    >
      <Chat
        navbar={{ title: "City Assistant" }}
        placeholder="Ask me anything city related..."
        messages={messages}
        onSend={handleSend}
        locale=""
        renderMessageContent={(msg) => (
          <Bubble
            content={msg.content.text}
            // onFocus={()=> set}
          />
        )}
      />
    </div>
  );
};

export default ChatBotUi;
