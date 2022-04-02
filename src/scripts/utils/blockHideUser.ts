import { createIcon, toggleIconState } from "./icons";
import { USERS_BLACKLIST_ACTIONS } from "../storage";

export const createBlockHideButton = (
  text: string,
  action: USERS_BLACKLIST_ACTIONS,
  cb: () => void
) => {
  const wrapper = document.createElement("span");
  wrapper.classList.add("sht-ban-hide-button", `sht-${action}-user`);
  const icon = createIcon(action);
  const actionText = document.createElement("span");
  actionText.textContent = text;
  wrapper.addEventListener("click", cb);
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
