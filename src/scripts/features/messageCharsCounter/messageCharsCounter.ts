import { insertAfter, createTooltipIcon } from "../../utils";
import { MAX_CHARS, MESSAGE_MAX_LENGTH, TEXT } from "./constants";
import queueInsert = chrome.cast.media.timeout.queueInsert;

export const addMessageCharsCounter = () => {
  const message = document.getElementById("message") as HTMLTextAreaElement;
  message.maxLength = MESSAGE_MAX_LENGTH;

  const messageCharsCounter = document.createElement("span");
  messageCharsCounter.innerText = String(message.value.length);

  const charsTooltipIcon = createTooltipIcon(TEXT.CHARS_COUNTER_TOOLTIP);

  const messageChars = document.createElement("p");
  messageChars.id = "message-chars";
  messageChars.innerText = TEXT.CHARS_COUNTER;
  messageChars.appendChild(messageCharsCounter);
  messageChars.appendChild(charsTooltipIcon);

  const addCounter = () => {
    message.classList.add("no-mb");
    insertAfter(messageChars, message);
    message.addEventListener("input", countCharacters);
  };

  let counterRemovingRestricted = false;

  const restrictCounterRemoving = () => (counterRemovingRestricted = true);
  const allowCounterRemoving = () => (counterRemovingRestricted = false);

  const removeCounter = () => {
    if (counterRemovingRestricted) return;
    message.classList.remove("no-mb");
    messageChars.remove();
    message.removeEventListener("input", countCharacters);
  };

  const toggleCharsCountAlert = (charactersCount: number) => {
    if (charactersCount > MAX_CHARS)
      messageChars.classList.add("message-chars-alert");
    else messageChars.classList.remove("message-chars-alert");
  };

  const countCharacters = () => {
    const charactersCount = message.value.length;
    toggleCharsCountAlert(charactersCount);
    messageCharsCounter.innerText = String(message.value.length);
  };

  const clearCharsCounter = () => {
    messageCharsCounter.innerText = "0";
    messageChars.classList.remove("message-chars-alert");
  };

  const handleSendButtonClick = () => {
    clearCharsCounter();
    allowCounterRemoving();
    removeCounter();
  };

  if (message) {
    message.addEventListener("focus", addCounter);
    message.addEventListener("blur", removeCounter);

    const sendButton = document.getElementById("send");
    if (sendButton) {
      sendButton.addEventListener("mouseenter", restrictCounterRemoving);
      sendButton.addEventListener("mouseout", allowCounterRemoving);
      sendButton.addEventListener("click", handleSendButtonClick);
    }

    const quoteSelectionButton = document.querySelector("#quoteSelection > a");
    // event handlers run synchronously so no need to worry about other handlers
    if (quoteSelectionButton) {
      quoteSelectionButton.addEventListener("click", countCharacters);
    }
  }
};
