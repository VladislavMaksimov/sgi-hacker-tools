import {
  clear,
  createBlockedMsgPlug,
  createBlockHideButton,
  createIcon,
  getIdFromParams,
  getMyId,
  getURLId,
  getUserNameFromPage,
  insertAfter,
  removeIconFromParent,
} from "../../utils";
import { TEXT } from "./constants";
import {
  blockHideUser,
  getBlackList,
  isUserInBlackList,
  unBlockHideUser,
  USERS_BLACKLIST_ACTIONS,
} from "../../storage";

export const hideMessages = (onUserPage?: boolean) => {
  let userId: string | undefined;
  if (onUserPage) userId = getURLId();
  if (onUserPage && !userId) return;

  const messages = document.querySelectorAll("#board > .message.clearfix");

  messages.forEach((msg) => {
    const msgContent = msg.querySelector(".tx");
    const msgName = msg.querySelector(".name");
    const msgAva = msg.querySelector(".avka_repa");
    if (!msgContent) return;

    if (!onUserPage) {
      userId = (msgContent as HTMLDivElement).dataset.userId;
      if (!userId) return;
    }

    // if message is small
    if (!msgAva || !msgName) {
      const msgText = msgContent.childNodes[1];
      if (!msgText.textContent) return;

      if (!isUserInBlackList(userId!)) {
        const savedText = (msgContent as HTMLDivElement).dataset.text;
        if (savedText) msgText.textContent = savedText;
        return;
      }

      msgText.textContent = " Что-то сказал(а)...";
      return;
    }

    msg.querySelector(".sht-blocked-msg-plug")?.remove();

    if (!isUserInBlackList(userId!)) {
      msgContent.classList.remove("sht-hide");
      msgAva.classList.remove("sht-hide");
      return;
    }

    msgContent.classList.add("sht-hide");
    msgAva.classList.add("sht-hide");

    const avatar = msgAva.querySelector("img")?.cloneNode() as HTMLImageElement;
    const plug = createBlockedMsgPlug(avatar);
    msg.appendChild(plug);
  });
};

export const addBlockHideUserIcon = () => {
  const messages = document.querySelectorAll("#board > .message.clearfix");
  messages.forEach((msg) => {
    let userName = msg.querySelector(
      ".name > a:first-of-type"
    ) as HTMLAnchorElement | null;
    const msgContent = msg.querySelector(".tx") as HTMLDivElement;
    if (!userName) userName = msgContent.querySelector("a");

    const myId = getMyId();
    const userId = getIdFromParams(userName!.href);
    if (!userId) return;
    msgContent.dataset.userId = userId;

    // if message is small
    const msgName = msg.querySelector(".name");
    const msgAva = msg.querySelector(".avka_repa");
    if (!msgAva || !msgName) {
      const msgText = msgContent.childNodes[1];
      msgContent.dataset.text = msgText.textContent
        ? msgText.textContent
        : undefined;
      return;
    }

    removeIconFromParent(msgName as HTMLElement);
    const isUserMe = myId === userId;

    if (isUserInBlackList(userId)) {
      const action = isUserMe
        ? USERS_BLACKLIST_ACTIONS.UNHIDE
        : USERS_BLACKLIST_ACTIONS.UNBLOCK;
      const icon = createIcon(action, () => {
        unBlockHideUser(userId);
        hideMessages();
        renderBlackList();
        addBlockHideUserIcon();
      });
      insertAfter(icon, userName!);
      return;
    }

    const userNick = msgContent.dataset.nick!;
    const action = isUserMe
      ? USERS_BLACKLIST_ACTIONS.HIDE
      : USERS_BLACKLIST_ACTIONS.BLOCK;
    const icon = createIcon(action, () => {
      blockHideUser(userId, userNick);
      hideMessages();
      renderBlackList();
      addBlockHideUserIcon();
    });
    insertAfter(icon, userName!);
  });
};

export const addBlockHideObserver = () => {
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
    hideMessages();
  });
  if (board)
    observer.observe(board, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
};

interface IButtonFuncs {
  (
    action: USERS_BLACKLIST_ACTIONS,
    userId: string,
    userName: string,
    onClick: IButtonFuncs,
    prevSibling: HTMLElement,
    prevButton?: HTMLSpanElement | null
  ): void;
}

export const addBlockHideUserOnUserPage = () => {
  const sendPrivateMessage = document
    .querySelector(".w")!
    .querySelector(".popup") as HTMLElement;
  if (!sendPrivateMessage) return;

  const myId = getMyId();
  const urlId = getURLId();
  if (!urlId || !myId) return;

  const userName = getUserNameFromPage();
  if (!userName) return;

  const toggleAction = (action: USERS_BLACKLIST_ACTIONS) => {
    let newAction;
    switch (action) {
      case USERS_BLACKLIST_ACTIONS.BLOCK:
        newAction = USERS_BLACKLIST_ACTIONS.UNBLOCK;
        break;
      case USERS_BLACKLIST_ACTIONS.UNBLOCK:
        newAction = USERS_BLACKLIST_ACTIONS.BLOCK;
        break;
      case USERS_BLACKLIST_ACTIONS.HIDE:
        newAction = USERS_BLACKLIST_ACTIONS.UNHIDE;
        break;
      case USERS_BLACKLIST_ACTIONS.UNHIDE:
        newAction = USERS_BLACKLIST_ACTIONS.HIDE;
        break;
    }
    return newAction;
  };

  const renderButton: IButtonFuncs = (
    action,
    userId,
    userName,
    onClick,
    prevSibling,
    prevButton
  ) => {
    prevButton?.remove();

    const text = TEXT[action];
    const callback =
      action === USERS_BLACKLIST_ACTIONS.HIDE ||
      action === USERS_BLACKLIST_ACTIONS.BLOCK
        ? () => blockHideUser(userId, userName)
        : () => unBlockHideUser(userId);
    const newButton = createBlockHideButton(text, action, callback);

    const newAction = toggleAction(action);
    newButton.addEventListener("click", () =>
      onClick(newAction, userId, userName, onClick, prevSibling, newButton)
    );

    insertAfter(newButton, prevSibling);
  };

  const onClick: IButtonFuncs = (
    newAction,
    userId,
    userName,
    onClick,
    prevSibling,
    prevButton
  ) => {
    hideMessages(true);
    renderButton(newAction, userId, userName, onClick, prevSibling, prevButton);
    renderBlackList(true);
  };

  const prevButton = document.querySelector(
    ".sht-ban-hide-button"
  ) as HTMLSpanElement | null;

  // on user's page
  if (myId === urlId) {
    renderButton(
      isUserInBlackList(urlId)
        ? USERS_BLACKLIST_ACTIONS.UNHIDE
        : USERS_BLACKLIST_ACTIONS.HIDE,
      myId,
      userName,
      onClick,
      sendPrivateMessage,
      prevButton
    );
    return;
  }

  // on another user's page
  renderButton(
    isUserInBlackList(urlId)
      ? USERS_BLACKLIST_ACTIONS.UNBLOCK
      : USERS_BLACKLIST_ACTIONS.BLOCK,
    urlId,
    userName,
    onClick,
    sendPrivateMessage,
    prevButton
  );
};

export const saveSmallMsgTextsOnUserPage = () => {
  const messages = document.querySelectorAll("#board > .message.clearfix");

  messages.forEach((msg) => {
    const msgContent = msg.querySelector(".tx") as HTMLDivElement;
    const msgName = msg.querySelector(".name");
    const msgAva = msg.querySelector(".avka_repa");

    // if message isn't small or hasn't content
    if (msgName || msgAva || !msgContent) return;

    const msgText = msgContent.childNodes[1];
    msgContent.dataset.text = msgText.textContent
      ? msgText.textContent
      : undefined;
  });
};

export const renderBlackList = (onUserPage?: boolean) => {
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
      renderBlackList(onUserPage);
      hideMessages(onUserPage);
      if (!onUserPage) addBlockHideUserIcon();
      else addBlockHideUserOnUserPage();
    });
    shtBlackList.appendChild(shtMenuBlockedUser);
  });
};
