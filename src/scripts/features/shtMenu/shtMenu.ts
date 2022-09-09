import { TEXT } from "./constants";
import { createShtMenuItem } from "../../utils";
import { addChatBroKiller } from "../killChatBro/killChatBro";
import {
  isRepChangeSadistic,
  makeRepChangeNotSadistic,
  makeRepChangeSadistic,
} from "../../storage";

export const addShtMenu = () => {
  const headingWrapper = document.createElement("h2");
  const icon = document.createElement("span");
  icon.className = "pc";
  const heading = document.createElement("p");
  heading.innerText = TEXT.HEADING;
  headingWrapper.append(icon, heading);

  const arrow = document.createElement("div");
  arrow.className = "arrow";

  const sadisticRepChange = createShtMenuItem(
    TEXT.SADISTIC_REP_CHANGE.LABEL,
    makeRepChangeSadistic,
    makeRepChangeNotSadistic,
    isRepChangeSadistic(),
    TEXT.SADISTIC_REP_CHANGE.TOOLTIP_TEXT
  );

  const chatBroKiller = addChatBroKiller();

  const blackList = document.createElement("div");
  blackList.id = "sht-blackList";
  const blackListContent = document.createElement("section");
  blackListContent.id = "sht-blackList-content";
  const blHeading = document.createElement("h4");
  blHeading.textContent = TEXT.BLACKLIST;
  blackList.append(blHeading, blackListContent);

  const support = document.createElement("a");
  support.href = process.env.SUPPORT!;
  support.textContent = TEXT.SUPPORT;
  support.className = "sht-support";
  const supportWrapper = document.createElement("div");
  supportWrapper.className = "sht-support-wrapper";
  supportWrapper.appendChild(support);

  // contacts

  const vkLink = document.createElement("a");
  vkLink.href = process.env.VK!;
  const vkIcon = document.createElement("img");
  vkIcon.src = chrome.runtime.getURL("vk.svg");
  vkLink.appendChild(vkIcon);

  const tgLink = document.createElement("a");
  tgLink.href = process.env.TELEGRAM!;
  const tgIcon = document.createElement("img");
  tgIcon.src = chrome.runtime.getURL("telegram.svg");
  tgLink.appendChild(tgIcon);

  const ghLink = document.createElement("a");
  ghLink.href = process.env.GITHUB!;
  const ghIcon = document.createElement("img");
  ghIcon.src = chrome.runtime.getURL("github.svg");
  ghLink.appendChild(ghIcon);

  const contacts = document.createElement("div");
  contacts.className = "sht-contacts";
  contacts.append(vkLink, tgLink, ghLink);

  const content = document.createElement("div");
  content.classList.add("w", "center");
  content.append(
    sadisticRepChange,
    chatBroKiller,
    blackList,
    contacts,
    supportWrapper
  );

  const menu = document.createElement("section");
  menu.id = "sht-menu";
  menu.append(headingWrapper, arrow, content);

  const sidebar = document.getElementById("r-sidebar");
  if (sidebar) {
    const firstChild = sidebar.firstChild;
    if (firstChild) sidebar.insertBefore(menu, firstChild);
    else sidebar.appendChild(menu);
  }
};
