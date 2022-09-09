import { createShtMenuItem } from "../../utils";
import {
  getChatBroState,
  setChatBroAlive,
  setChatBroDead,
} from "../../storage";
import { setTimer } from "../../utils/timer";

const killChatBro = () => {
  let chatBro: HTMLElement | null = null;

  const findChatBro = () => {
    chatBro = document.querySelector(".chatbro_container");
    return !!chatBro;
  };

  const tryToKillChatBro = () => {
    if (chatBro) chatBro.classList.add("sht-hide");
  };

  // if chatbro is rendered fires tryToKillChatBro once
  setTimer(() => void 0, findChatBro, 100, tryToKillChatBro);
};

const resurrectChatBro = () => {
  const chatBro = document.querySelector(".chatbro_container");
  if (!chatBro) return;
  const chatBroHeader = chatBro.querySelector(
    ".chatbro_header.chatbro_minimized_header"
  ) as HTMLDivElement;
  if (chatBroHeader && chatBroHeader.style.width === "10px")
    chatBroHeader.style.width = "68px";
  chatBro.classList.remove("sht-hide");
};

export const killOrResurrectChatBro = () => {
  const chatBroState = getChatBroState();
  switch (chatBroState) {
    case "dead":
      killChatBro();
      break;
    case "alive":
      resurrectChatBro();
      break;
    default:
      break;
  }
};

export const addChatBroKiller = () => {
  const onCheck = () => {
    setChatBroDead();
    killOrResurrectChatBro();
  };
  const onUncheck = () => {
    setChatBroAlive();
    killOrResurrectChatBro();
  };
  return createShtMenuItem(
    "Скрыть чат",
    onCheck,
    onUncheck,
    getChatBroState() === "dead"
  );
};
