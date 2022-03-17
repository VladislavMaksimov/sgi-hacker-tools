import {
  createBlockHideButton,
  createOnlyBlockHideIcon,
  getIdFromParams,
  getMyId,
  getURLId,
  insertAfter,
} from "../../utils";
import { TEXT_BLOCK_USER, TEXT_HIDE_SELF } from "./constants";
import { blockHideUser, getBlackList, unBlockHideUser } from "../../storage";

export const addBlockHideUserIcon = () => {
  const userNames = document.querySelectorAll(".name > a:first-of-type");
  userNames.forEach((userName) => {
    const myId = getMyId();
    const userId = getIdFromParams((userName as HTMLAnchorElement).href);
    if (!userId) return;
    const action = myId === userId ? "hide" : "block";
    const icon = createOnlyBlockHideIcon(action, userId);
    icon.addEventListener("click", () => blockHideUser(userId));
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

  const myId = getMyId();
  const urlId = getURLId();
  if (!urlId || !myId) return;

  // on user's page
  if (myId === urlId) {
    const hideButton = createBlockHideButton(TEXT_HIDE_SELF, "hide", myId);
    hideButton.addEventListener("click", () => blockHideUser(myId));
    insertAfter(hideButton, sendPrivateMessage);
    return;
  }

  // on another user's page
  const blockButton = createBlockHideButton(TEXT_BLOCK_USER, "block", urlId);
  blockButton.addEventListener("click", () => blockHideUser(urlId));
  insertAfter(blockButton, sendPrivateMessage);
};

export const renderBlackList = () => {
  const blackList = getBlackList();
  if (!blackList || blackList.size === 0) return;
  const shtMenu = document.getElementById("sht-menu");
  if (!shtMenu) return;
  blackList.forEach((item) => {
    const shtMenuBlockedUser = document.createElement("p");
    shtMenuBlockedUser.textContent = item;
    shtMenuBlockedUser.addEventListener("click", () => unBlockHideUser(item));
    shtMenu.appendChild(shtMenuBlockedUser);
  });
};
