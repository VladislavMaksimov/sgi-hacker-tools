import { PATHS, USERS } from "./constants";
import {
  addSendMeButton,
  addMessageCharsCounter,
  addBotPunishment,
  increaseTorrentLinkSize,
  addSadisticRepChange,
  addShtMenu,
  addBanHideUserIcon,
  addBanHideIconsObserver,
  addBanHideUserOnUserPage,
} from "./features";

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("go");

document.addEventListener("DOMContentLoaded", () => {
  addShtMenu();
  switch (page) {
    case PATHS.FAQ:
      addBanHideUserIcon();
      addSendMeButton();
      addMessageCharsCounter();
      addBanHideIconsObserver();
      break;
    case PATHS.GAME:
      addBanHideUserIcon();
      addSendMeButton();
      addMessageCharsCounter();
      increaseTorrentLinkSize();
      addBanHideIconsObserver();
      break;
    case PATHS.USER:
      const user = urlParams.get("uid");
      switch (user) {
        case USERS.BOT:
          addBotPunishment();
          break;
        default:
          addBanHideUserOnUserPage();
          addSadisticRepChange();
          break;
      }
      break;
    default:
      break;
  }
});
