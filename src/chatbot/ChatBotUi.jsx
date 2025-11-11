import { CB_API_TOKEN } from "../config/apiconfig";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import Chat, { useMessages, Bubble } from "@chatui/core";

import { useEffect, useState } from "react";

const client = new Cerebras({
  apiKey: CB_API_TOKEN,
});

const ChatBotUi = ({ showBot }) => {
  const { appendMsg, messages } = useMessages([]);
  const [prompt, setPrompt] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    appendMsg({
      type: "text",
      content: {
        text:
          answer || "Hello! I'm your city assistant. How can I help you today?",
      },
      position: "left",
    });
  }, [answer, appendMsg]);
 

  useEffect(() => {
    const fetchAnswer = async () => {
      if (!prompt) return;
      const res = await client.chat.completions.create({
        model: "llama3.1-8b",
        messages: [
          { role: "user", content: prompt },
          {
            role: "system",
            content:
              "You are a helpful assistant that provides information about cities around the world. Answer concisely and accurately.",
          },
        ],
        max_tokens: 100,
      });
      setAnswer(res.choices[0].message.content);
    };
    fetchAnswer();
  }, [prompt]);

  const handleSend = (type, val) => {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });
    }
    // setPrompt(val);
    setTimeout(() => {
      setPrompt(val);
    }, 1000);
  };

  return (
    <div
      className={`max-h-0 absolute top-22  z-9999 rounded-2xl overflow-auto right-10 max-w-0  transition-all  duration-500 [&_Composer]:m-6 ${
        showBot && `max-h-60  max-w-full ml-7 h-auto `
      }`}
    >
      <Chat
        navbar={{ title: "City Assistant" }}
        placeholder="Ask me anything city related..."
        messages={messages}
        onSend={handleSend}
        renderMessageContent={(msg) => (
          <Bubble content={msg.content.text} />
        )}
      />
    </div>
  );
};

export default ChatBotUi;
