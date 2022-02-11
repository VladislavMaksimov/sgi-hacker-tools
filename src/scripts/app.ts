import { PATHS } from "./constants";
import { addMessageCharsCounter } from "./features/messageCharsCounter/messageCharsCounter";

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("go");

document.addEventListener("DOMContentLoaded", () => {
  switch (page) {
    case PATHS.FAQ:
      addMessageCharsCounter();
      break;
    case PATHS.GAME:
      addMessageCharsCounter();
      break;
    default:
      break;
  }
});
