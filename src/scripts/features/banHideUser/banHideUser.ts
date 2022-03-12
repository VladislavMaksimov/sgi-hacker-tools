import {
  createBanHideButton,
  createBanHideUserIcon,
  getIdFromParams,
  getMyId,
  getURLId,
  insertAfter,
} from "../../utils";
import { TEXT_BAN_USER, TEXT_HIDE_SELF } from "./constants";

export const addBanHideUserIcon = () => {
  const userNames = document.querySelectorAll(".name > a:first-of-type");
  userNames.forEach((userName) => {
    const myId = getMyId();
    const userId = getIdFromParams((userName as HTMLAnchorElement).href);
    const action = myId === userId ? "hide" : "ban";
    const icon = createBanHideUserIcon(action);
    insertAfter(icon, userName);
  });
};

export const addBanHideIconsObserver = () => {
  const board = document.getElementById("board");
  const observer = new MutationObserver((mutations, observer) => {
    const addedNodes = Array.from(mutations[0].addedNodes);
    if (
      !addedNodes.find((node) =>
        (node as HTMLDivElement).classList.contains("message")
      )
    )
      return;
    addBanHideUserIcon();
  });
  if (board)
    observer.observe(board, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
};

export const addBanHideUserOnUserPage = () => {
  const sendPrivateMessage = document
    .querySelector(".w")!
    .querySelector(".popup");
  if (!sendPrivateMessage) return;

  // on user's page
  if (getMyId() === getURLId()) {
    const hideButton = createBanHideButton(TEXT_HIDE_SELF, "hide");
    insertAfter(hideButton, sendPrivateMessage);
    return;
  }

  // on another user's page
  const banButton = createBanHideButton(TEXT_BAN_USER, "ban");
  insertAfter(banButton, sendPrivateMessage);
};
