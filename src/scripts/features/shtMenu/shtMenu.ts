import { TEXT } from "./constants";
import { createShtMenuItem } from "../../utils";
import { addChatBroKiller } from "../killChatBro/killChatBro";

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
    () => localStorage.setItem("sadistic", "true"),
    () => localStorage.removeItem("sadistic"),
    localStorage.getItem("sadistic") !== null,
    TEXT.SADISTIC_REP_CHANGE.TOOLTIP_TEXT
  );

  const chatBroKiller = addChatBroKiller();

  const content = document.createElement("div");
  content.classList.add("w", "center");
  content.append(sadisticRepChange, chatBroKiller);

  const blackList = document.createElement("div");
  blackList.id = "sht-blackList";

  const menu = document.createElement("section");
  menu.id = "sht-menu";
  menu.append(headingWrapper, arrow, content, blackList);

  const sidebar = document.getElementById("r-sidebar");
  if (sidebar) {
    const firstChild = sidebar.firstChild;
    if (firstChild) sidebar.insertBefore(menu, firstChild);
    else sidebar.appendChild(menu);
  }
};
