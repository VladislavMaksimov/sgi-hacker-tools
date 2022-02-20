import { TEXT } from "./constants";
import { createShtMenuItem } from "../../utils";

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

  const content = document.createElement("div");
  content.classList.add("w", "center");
  content.appendChild(sadisticRepChange);

  const menu = document.createElement("section");
  menu.append(headingWrapper, arrow, content);

  const sidebar = document.getElementById("r-sidebar");
  if (sidebar) {
    const firstChild = sidebar.firstChild;
    if (firstChild) sidebar.insertBefore(menu, firstChild);
    else sidebar.appendChild(menu);
  }
};
