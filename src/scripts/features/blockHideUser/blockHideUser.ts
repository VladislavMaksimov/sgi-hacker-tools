import {
  clear,
  createBlockedMsgPlug,
  createBlockHideButton,
  createBlockHideUserIcon,
  getIdFromParams,
  getMyId,
  getURLId,
  getUserNameFromPage,
  insertAfter,
} from "../../utils";
import { TEXT_BLOCK_USER, TEXT_HIDE_SELF } from "./constants";
import {
  blockHideUser,
  getBlackList,
  isUserInBlackList,
  unBlockHideUser,
} from "../../storage";

export const hideMessages = () => {
  const messages = document.querySelectorAll("#board > .message.clearfix");
  messages.forEach((msg) => {
    const msgContent = msg.querySelector(".tx");
    const msgAva = msg.querySelector(".avka_repa");
    if (!msgContent || !msgAva) return;

    const userId = (msgContent as HTMLDivElement).dataset.userId;
    debugger;
    if (!userId) return;

    msg.querySelector(".sht-blocked-msg-plug")?.remove();

    if (!isUserInBlackList(userId)) {
      msgContent.classList.remove("sht-hide");
      msgAva.classList.remove("sht-hide");
      return;
    }

    msgContent.classList.add("sht-hide");
    msgAva.classList.add("sht-hide");
    const plug = createBlockedMsgPlug();
    msg.appendChild(plug);
  });
};

export const addBlockHideUserIcon = () => {
  const messages = document.querySelectorAll("#board > .message.clearfix");
  messages.forEach((msg) => {
    const userName = msg.querySelector(
      ".name > a:first-of-type"
    ) as HTMLAnchorElement;
    if (!userName) return;

    const myId = getMyId();
    const userId = getIdFromParams(userName.href);
    if (!userId) return;

    const action = myId === userId ? "hide" : "block";
    const icon = createBlockHideUserIcon(action);

    const msgContent = msg.querySelector(".tx") as HTMLDivElement;
    msgContent.dataset.userId = userId;
    const userNick = msgContent.dataset.nick!;
    icon.addEventListener("click", () => {
      blockHideUser(userId, userNick);
      hideMessages();
      renderBlackList();
    });
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

  const userName = getUserNameFromPage();
  if (!userName) return;

  // on user's page
  if (myId === urlId) {
    const hideButton = createBlockHideButton(TEXT_HIDE_SELF, "hide");
    hideButton.addEventListener("click", () => {
      blockHideUser(myId, userName);
      hideMessages();
      renderBlackList();
    });
    insertAfter(hideButton, sendPrivateMessage);
    return;
  }

  // on another user's page
  const blockButton = createBlockHideButton(TEXT_BLOCK_USER, "block");
  blockButton.addEventListener("click", () => {
    blockHideUser(urlId, userName);
    hideMessages();
    renderBlackList();
  });
  insertAfter(blockButton, sendPrivateMessage);
};

export const renderBlackList = () => {
  const shtBlackList = document.getElementById("sht-blackList");
  if (!shtBlackList) return;
  clear(shtBlackList);
  const blackList = getBlackList();
  if (!blackList || blackList.size === 0) return;
  blackList.forEach((item) => {
    const shtMenuBlockedUser = document.createElement("p");
    shtMenuBlockedUser.textContent = item;
    shtMenuBlockedUser.addEventListener("click", () => {
      unBlockHideUser(item);
      renderBlackList();
      hideMessages();
    });
    shtBlackList.appendChild(shtMenuBlockedUser);
  });
};
