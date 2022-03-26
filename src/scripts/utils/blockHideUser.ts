export const toggleBlockHideUserIconState = (
  icon: HTMLImageElement,
  iconName: string,
  hover: boolean
) => {
  hover
    ? (icon.src = chrome.runtime.getURL(`${iconName}-hover.svg`))
    : (icon.src = chrome.runtime.getURL(`${iconName}.svg`));
};

export const createBlockHideUserIcon = (action: "block" | "hide") => {
  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL(`user-${action}.svg`);
  icon.className = `sht-${action}-icon`;
  icon.addEventListener("mouseover", () =>
    toggleBlockHideUserIconState(icon, `user-${action}`, true)
  );
  icon.addEventListener("mouseout", () =>
    toggleBlockHideUserIconState(icon, `user-${action}`, false)
  );
  return icon;
};

export const createBlockHideButton = (
  text: string,
  action: "block" | "hide"
) => {
  const wrapper = document.createElement("span");
  wrapper.className = `sht-${action}-user`;
  const icon = createBlockHideUserIcon(action);
  const actionText = document.createElement("span");
  actionText.textContent = text;
  wrapper.addEventListener("mouseover", () =>
    toggleBlockHideUserIconState(icon, `user-${action}`, true)
  );
  wrapper.addEventListener("mouseout", () =>
    toggleBlockHideUserIconState(icon, `user-${action}`, false)
  );
  wrapper.append(icon, actionText);
  return wrapper;
};

export const createBlockedMsgPlug = (avatar?: HTMLImageElement) => {
  const plug = document.createElement("div");
  const text = document.createElement("span");
  text.textContent = "Что-то сказал(а)...";
  if (avatar) {
    avatar.className = "sht-blocked-msg-ava";
    plug.appendChild(avatar);
  }
  plug.appendChild(text);
  plug.className = "sht-blocked-msg-plug";
  return plug;
};
