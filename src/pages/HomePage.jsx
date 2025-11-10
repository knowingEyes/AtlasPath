import { Outlet } from "react-router-dom";
import { SectionNavBar } from "../components/SectionNavBar";
import AppHeader from "../components/AppHeader";
import ChatBotUi from "../chatbot/ChatBotUi";
import { useState } from "react";
import ChatBotButton from "../chatbot/ChatBotButton";

export const HomePage = () => {
  const [showBot, setShowBot] = useState(false);
  return (
    <section className="p-5 h-100">
      <ChatBotUi showBot={showBot} />
      <AppHeader>
        <ChatBotButton showBot={() => setShowBot(!showBot)} />
      </AppHeader>
      <SectionNavBar views={["Cities", "Countries"]} />
      <Outlet />
    </section>
  );
};
