export enum ICON_ACTION {
  BLOCK = "block",
  HIDE = "hide",
  UNBLOCK = "unblock",
  UNHIDE = "unhide",
}

export const toggleIconState = (
  icon: HTMLImageElement,
  iconName: string,
  hover: boolean
) => {
  hover
    ? (icon.src = chrome.runtime.getURL(`${iconName}-hover.svg`))
    : (icon.src = chrome.runtime.getURL(`${iconName}.svg`));
};

export const createIcon = (action: ICON_ACTION, onClick?: () => void) => {
  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL(`user-${action}.svg`);
  icon.classList.add("sht-icon", `sht-${action}-icon`);
  icon.addEventListener("mouseover", () =>
    toggleIconState(icon, `user-${action}`, true)
  );
  icon.addEventListener("mouseout", () =>
    toggleIconState(icon, `user-${action}`, false)
  );
  if (onClick) icon.addEventListener("click", onClick);
  return icon;
};

export const removeIconFromParent = (parent: HTMLElement) => {
  const icon = parent.querySelector(".sht-icon");
  if (icon) icon.remove();
};
