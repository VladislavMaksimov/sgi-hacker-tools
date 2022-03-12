export const toggleBanHideUserIconState = (
  icon: HTMLImageElement,
  iconName: string,
  hover: boolean
) => {
  hover
    ? (icon.src = chrome.runtime.getURL(`${iconName}-hover.svg`))
    : (icon.src = chrome.runtime.getURL(`${iconName}.svg`));
};

export const createBanHideUserIcon = (action: "ban" | "hide") => {
  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL(`user-${action}.svg`);
  icon.className = `sht-${action}-icon`;
  icon.addEventListener("mouseover", () =>
    toggleBanHideUserIconState(icon, `user-${action}`, true)
  );
  icon.addEventListener("mouseout", () =>
    toggleBanHideUserIconState(icon, `user-${action}`, false)
  );
  return icon;
};

export const createBanHideButton = (text: string, action: "ban" | "hide") => {
  const wrapper = document.createElement("span");
  wrapper.className = `sht-${action}-user`;
  const icon = createBanHideUserIcon(action);
  const actionText = document.createElement("span");
  actionText.textContent = text;
  wrapper.addEventListener("mouseover", () =>
    toggleBanHideUserIconState(icon, `user-${action}`, true)
  );
  wrapper.addEventListener("mouseout", () =>
    toggleBanHideUserIconState(icon, `user-${action}`, false)
  );
  wrapper.append(icon, actionText);
  return wrapper;
};
