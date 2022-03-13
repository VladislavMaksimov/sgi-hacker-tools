import { PATHS, USERS } from "./constants";
import {
  addSendMeButton,
  addMessageCharsCounter,
  addBotPunishment,
  increaseTorrentLinkSize,
  addSadisticRepChange,
  addShtMenu,
  addBlockHideUserIcon,
  addBlockHideIconsObserver,
  addBlockHideUserOnUserPage,
} from "./features";

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("go");

document.addEventListener("DOMContentLoaded", () => {
  addShtMenu();
  switch (page) {
    case PATHS.FAQ:
      addBlockHideUserIcon();
      addSendMeButton();
      addMessageCharsCounter();
      addBlockHideIconsObserver();
      break;
    case PATHS.GAME:
      addBlockHideUserIcon();
      addSendMeButton();
      addMessageCharsCounter();
      increaseTorrentLinkSize();
      addBlockHideIconsObserver();
      break;
    case PATHS.USER:
      const user = urlParams.get("uid");
      switch (user) {
        case USERS.BOT:
          addBotPunishment();
          break;
        default:
          addBlockHideUserOnUserPage();
          addSadisticRepChange();
          break;
      }
      break;
    default:
      break;
  }
});
