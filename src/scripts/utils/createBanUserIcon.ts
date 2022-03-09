export const toggleBanUserIconState = (
  icon: HTMLImageElement,
  hover: boolean
) => {
  hover
    ? (icon.src = chrome.runtime.getURL("user-ban-hover.svg"))
    : (icon.src = chrome.runtime.getURL("user-ban.svg"));
};

export const createBanUserIcon = () => {
  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("user-ban.svg");
  icon.className = "sht-ban-icon";
  icon.addEventListener("mouseover", () => toggleBanUserIconState(icon, true));
  icon.addEventListener("mouseout", () => toggleBanUserIconState(icon, false));
  return icon;
};
