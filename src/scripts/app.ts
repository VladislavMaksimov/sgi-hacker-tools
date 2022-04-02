import { PATHS, USERS } from "./constants";
import {
  addSendMeButton,
  addMessageCharsCounter,
  addBotPunishment,
  increaseTorrentLinkSize,
  addSadisticRepChange,
  addShtMenu,
  addBlockHideUserIcon,
  addBlockHideObserver,
  addBlockHideUserOnUserPage,
  killOrResurrectChatBro,
  hideMessages,
  renderBlackList,
  saveSmallMsgTextsOnUserPage,
} from "./features";

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("go");

document.addEventListener("DOMContentLoaded", () => {
  killOrResurrectChatBro();
  addShtMenu();
  switch (page) {
    case PATHS.FAQ:
      renderBlackList();
      addBlockHideUserIcon();
      hideMessages();
      addSendMeButton();
      addMessageCharsCounter();
      addBlockHideObserver();
      break;
    case PATHS.GAME:
      renderBlackList();
      addBlockHideUserIcon();
      hideMessages();
      addSendMeButton();
      addMessageCharsCounter();
      increaseTorrentLinkSize();
      addBlockHideObserver();
      break;
    case PATHS.USER:
      const user = urlParams.get("uid");
      switch (user) {
        case USERS.BOT:
          addBotPunishment();
          break;
        default:
          renderBlackList(true);
          saveSmallMsgTextsOnUserPage();
          hideMessages(true);
          addBlockHideUserOnUserPage();
          addSadisticRepChange();
          break;
      }
      break;
    default:
      break;
  }
});
