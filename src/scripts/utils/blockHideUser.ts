export const toggleBlockHideUserIconState = (
  icon: HTMLImageElement,
  iconName: string,
  hover: boolean
) => {
  hover
    ? (icon.src = chrome.runtime.getURL(`${iconName}-hover.svg`))
    : (icon.src = chrome.runtime.getURL(`${iconName}.svg`));
};

const createBlockHideUserIcon = (action: "block" | "hide", user?: string) => {
  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL(`user-${action}.svg`);
  icon.className = `sht-${action}-icon`;
  if (user) icon.dataset.user = user;
  icon.addEventListener("mouseover", () =>
    toggleBlockHideUserIconState(icon, `user-${action}`, true)
  );
  icon.addEventListener("mouseout", () =>
    toggleBlockHideUserIconState(icon, `user-${action}`, false)
  );
  return icon;
};

export const createOnlyBlockHideIcon = (
  action: "block" | "hide",
  user: string
) => createBlockHideUserIcon(action, user);

export const createBlockHideButton = (
  text: string,
  action: "block" | "hide",
  user: string
) => {
  const wrapper = document.createElement("span");
  wrapper.className = `sht-${action}-user`;
  wrapper.dataset.user = user;
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
