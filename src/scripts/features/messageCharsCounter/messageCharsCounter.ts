import { insertAfter, createTooltipIcon } from "../../utils";
import {
  DANGER_CHARS,
  ALERT_CHARS,
  MESSAGE_MAX_LENGTH,
  TEXT,
} from "./constants";

export const addMessageCharsCounter = () => {
  const message = document.getElementById("message") as HTMLTextAreaElement;
  message.maxLength = MESSAGE_MAX_LENGTH;

  const messageCharsCounter = document.createElement("span");
  messageCharsCounter.innerText = String(message.value.length);

  const charsTooltipIcon = createTooltipIcon(TEXT.CHARS_COUNTER_TOOLTIP);

  const messageChars = document.createElement("p");
  messageChars.id = "sht-message-chars";
  messageChars.innerText = TEXT.CHARS_COUNTER;
  messageChars.appendChild(messageCharsCounter);
  messageChars.appendChild(charsTooltipIcon);

  const addCounter = () => {
    message.classList.add("sht-no-mb");
    insertAfter(messageChars, message);
    message.addEventListener("input", countCharacters);
  };

  const toggleCharsCountAlert = (charactersCount: number) => {
    if (charactersCount > DANGER_CHARS) {
      messageChars.classList.add("sht-message-chars-alert");
      messageChars.classList.remove("sht-mini-message-chars-alert");
    } else if (charactersCount > ALERT_CHARS) {
      messageChars.classList.remove("sht-message-chars-alert");
      messageChars.classList.add("sht-mini-message-chars-alert");
    } else {
      messageChars.classList.remove("sht-message-chars-alert");
      messageChars.classList.remove("sht-mini-message-chars-alert");
    }
  };

  const countCharacters = () => {
    const charactersCount = message.value.length;
    toggleCharsCountAlert(charactersCount);
    messageCharsCounter.innerText = String(message.value.length);
  };

  const clearCharsCounter = () => {
    messageCharsCounter.innerText = "0";
    messageChars.classList.remove("sht-message-chars-alert");
  };

  if (message) {
    addCounter();

    const sendButton = document.getElementById("send");
    if (sendButton) sendButton.classList.add("sht-button");
    const buttons = document.querySelectorAll("#add_comment .sht-button");
    buttons.forEach((button) => {
      button.addEventListener("click", clearCharsCounter);
    });

    const quoteSelectionButton = document.querySelector("#quoteSelection > a");
    // event handlers run synchronously so no need to worry about other handlers
    if (quoteSelectionButton) {
      quoteSelectionButton.addEventListener("click", countCharacters);
    }
  }
};
