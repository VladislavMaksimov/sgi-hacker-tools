import {
  createBlockHideButton,
  createBlockHideUserIcon,
  getIdFromParams,
  getMyId,
  getURLId,
  insertAfter,
} from "../../utils";
import { TEXT_BLOCK_USER, TEXT_HIDE_SELF } from "./constants";

export const addBlockHideUserIcon = () => {
  const userNames = document.querySelectorAll(".name > a:first-of-type");
  userNames.forEach((userName) => {
    const myId = getMyId();
    const userId = getIdFromParams((userName as HTMLAnchorElement).href);
    const action = myId === userId ? "hide" : "block";
    const icon = createBlockHideUserIcon(action);
    insertAfter(icon, userName);
  });
};

export const addBlockHideIconsObserver = () => {
  const board = document.getElementById("board");
  const observer = new MutationObserver((mutations, observer) => {
    const addedNodes = Array.from(mutations[0].addedNodes);
    if (
      !addedNodes.find((node) =>
        (node as HTMLDivElement).classList.contains("message")
      )
    )
      return;
    addBlockHideUserIcon();
  });
  if (board)
    observer.observe(board, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
};

export const addBlockHideUserOnUserPage = () => {
  const sendPrivateMessage = document
    .querySelector(".w")!
    .querySelector(".popup");
  if (!sendPrivateMessage) return;

  // on user's page
  if (getMyId() === getURLId()) {
    const hideButton = createBlockHideButton(TEXT_HIDE_SELF, "hide");
    insertAfter(hideButton, sendPrivateMessage);
    return;
  }

  // on another user's page
  const blockButton = createBlockHideButton(TEXT_BLOCK_USER, "block");
  insertAfter(blockButton, sendPrivateMessage);
};
