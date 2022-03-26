import { createIcon, ICON_ACTION, toggleIconState } from "./icons";

export const createBlockHideButton = (text: string, action: ICON_ACTION) => {
  const wrapper = document.createElement("span");
  wrapper.className = `sht-${action}-user`;
  const icon = createIcon(action);
  const actionText = document.createElement("span");
  actionText.textContent = text;
  wrapper.addEventListener("mouseover", () =>
    toggleIconState(icon, `user-${action}`, true)
  );
  wrapper.addEventListener("mouseout", () =>
    toggleIconState(icon, `user-${action}`, false)
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
