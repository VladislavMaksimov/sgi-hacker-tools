import { USERS_BLACKLIST_ACTIONS } from "../storage";

export const toggleActionIconState = (
  icon: HTMLImageElement,
  iconName: string,
  hover: boolean
) => {
  hover
    ? (icon.src = chrome.runtime.getURL(`${iconName}-hover.svg`))
    : (icon.src = chrome.runtime.getURL(`${iconName}.svg`));
};

export const createActionIcon = (
  action: USERS_BLACKLIST_ACTIONS,
  onClick?: () => void
) => {
  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL(`user-${action}.svg`);
  icon.classList.add("sht-action-icon", `sht-${action}-icon`);
  icon.addEventListener("mouseover", () =>
    toggleActionIconState(icon, `user-${action}`, true)
  );
  icon.addEventListener("mouseout", () =>
    toggleActionIconState(icon, `user-${action}`, false)
  );
  if (onClick) icon.addEventListener("click", onClick);
  return icon;
};

export const removeActionIconFromParent = (parent: HTMLElement) => {
  const icon = parent.querySelector(".sht-action-icon");
  if (icon) icon.remove();
};

export const createIcon = (fileName: string) => {
  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL(fileName);
  icon.className = "sht-icon";
  return icon;
};
