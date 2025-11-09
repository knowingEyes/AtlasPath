import ChatBot from "../../public/chatbot.png";
const ChatBotButton = () => {
  return (
    <div>
      <button className="text-black">
        <img src={ChatBot} alt="chatbot" className="w-8 h-8 cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatBotButton;
