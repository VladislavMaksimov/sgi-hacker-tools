import { PATHS, USERS } from "./constants";
import {
  addSendMeButton,
  addMessageCharsCounter,
  addBotPunishment,
  increaseTorrentLinkSize,
  addSadisticRepChange,
  addShtMenu,
} from "./features";

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("go");

document.addEventListener("DOMContentLoaded", () => {
  addShtMenu();
  switch (page) {
    case PATHS.FAQ:
      addSendMeButton();
      addMessageCharsCounter();
      break;
    case PATHS.GAME:
      addSendMeButton();
      addMessageCharsCounter();
      increaseTorrentLinkSize();
      break;
    case PATHS.USER:
      const user = urlParams.get("uid");
      switch (user) {
        case USERS.BOT:
          addBotPunishment();
          break;
        default:
          addSadisticRepChange();
          break;
      }
      break;
    default:
      break;
  }
});
