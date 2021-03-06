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

  const content = document.createElement("div");
  content.classList.add("w", "center");
  content.append(sadisticRepChange, chatBroKiller, blackList, supportWrapper);

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
