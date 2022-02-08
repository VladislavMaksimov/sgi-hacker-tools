import { insertAfter } from "../utils";

export const addMessageCharsCounter = () => {
  const sendButton = document.getElementById("send");
  const message = document.getElementById("message") as HTMLTextAreaElement;
  const quoteSelectionButton = document.querySelector("#quoteSelection > a");

  const messageCharsCounter = document.createElement("span");
  messageCharsCounter.innerText = String(message.value.length);

  const messageChars = document.createElement("p");
  messageChars.id = "message-chars";
  messageChars.innerText = "Количество символов: ";
  messageChars.appendChild(messageCharsCounter);

  const toggleCharsCountAlert = (charactersCount: number) => {
    if (charactersCount >= 988)
      messageChars.classList.add("message-chars-alert");
    else messageChars.classList.remove("message-chars-alert");
  };

  const countCharacters = () => {
    const charactersCount = message.value.length;
    toggleCharsCountAlert(charactersCount);
    messageCharsCounter.innerText = String(message.value.length);
  };

  const clearCharsCounter = () => (messageCharsCounter.innerText = "0");

  if (message) {
    insertAfter(messageChars, message);
    message.addEventListener("input", countCharacters);
    if (sendButton) sendButton.addEventListener("click", clearCharsCounter);
    // TO-DO: implement my realization of insertAtCaret func
    if (quoteSelectionButton)
      quoteSelectionButton.addEventListener("click", countCharacters);
  }
};
