import { PATHS, USERS } from "./constants";
import {
  addSendMeButton,
  addMessageCharsCounter,
  addBotPunishment,
  increaseTorrentLinkSize,
  addSadisticRepChange,
  addShtMenu,
  addBanUserIcon,
  addBanUserOnUserPage,
  addBanIconsObserver,
} from "./features";

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("go");

document.addEventListener("DOMContentLoaded", () => {
  addShtMenu();
  switch (page) {
    case PATHS.FAQ:
      addBanUserIcon();
      addSendMeButton();
      addMessageCharsCounter();
      addBanIconsObserver();
      break;
    case PATHS.GAME:
      addBanUserIcon();
      addSendMeButton();
      addMessageCharsCounter();
      increaseTorrentLinkSize();
      addBanIconsObserver();
      break;
    case PATHS.USER:
      const user = urlParams.get("uid");
      switch (user) {
        case USERS.BOT:
          addBotPunishment();
          break;
        default:
          addBanUserOnUserPage();
          addSadisticRepChange();
          break;
      }
      break;
    default:
      break;
  }
});
