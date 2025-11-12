import { CB_API_TOKEN } from "../config/apiconfig";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import { useMessages } from "@chatui/core";
import React, { useEffect, useRef, useState } from "react";
const client = new Cerebras({
  apiKey: CB_API_TOKEN,
});
const useChatBot = () => {
  const { appendMsg, messages } = useMessages([]);
  const [prompt, setPrompt] = useState(null);
  const [answer, setAnswer] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    appendMsg({
      type: "text",
      content: {
        text:
          // Render initial bot message on mount if no answer available
          answer || "Hello! I'm your city assistant. How can I help you today?",
      },
      position: "left",
    });
  }, [answer, appendMsg]);

  // scroll to bottom when new message is created
  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  /* fetch answer from Cerebras API with Cerebras client. answer is generated based on user prompt */
  useEffect(() => {
    const fetchAnswer = async () => {
      if (!prompt) return;
      try {
        const res = await client.chat.completions.create({
          model: "llama3.1-8b", // chatbot model
          messages: [
            { role: "user", content: prompt },
            {
              role: "system",
              content:
                "You are a helpful assistant that provides information about cities around the world. Answer concisely and accurately.",
            },
          ],
          max_tokens: 100, // maximum text generated
        });
        setAnswer(res.choices[0].message.content);
      } catch (error) {
        console.error(error);
      }
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

      setTimeout(() => {
        setPrompt(val);
      }, 1000);
    }
  };

  return {
    appendMsg,
    messages,
    prompt,
    answer,
    handleSend,
    chatRef,
  };
};

export default useChatBot;
