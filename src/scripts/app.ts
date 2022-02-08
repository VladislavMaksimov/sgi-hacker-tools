import { PATHS } from "./constants";
import { addMessageCharsCounter } from "./features/addMessageCounter";

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("go");

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
