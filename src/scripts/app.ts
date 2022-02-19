import { PATHS, USERS } from "./constants";
import {
  addSendMeButton,
  addMessageCharsCounter,
  addBotPunishment,
  increaseTorrentLinkSize,
} from "./features";

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("go");

document.addEventListener("DOMContentLoaded", () => {
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
      }
      break;
    default:
      break;
  }
});
