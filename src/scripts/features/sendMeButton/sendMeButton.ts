import { createTooltipIcon, insertAfter } from "../../utils";
import { TEXT_TOOLTIP } from "./constants";

export const addSendMeButton = () => {
  const message = document.getElementById("message") as HTMLTextAreaElement;
  const sendButton = document.getElementById("send") as HTMLButtonElement;

  const sendMe = () => {
    message.value = "/me " + message.value;
    sendButton.click();
  };

  const sendMeButton = document.createElement("button");
  sendMeButton.className = "sht-button";
  sendMeButton.innerText = "Отправить с /me";
  sendMeButton.addEventListener("click", sendMe);

  const tooltipIcon = createTooltipIcon(TEXT_TOOLTIP, "large");

  const sendButtonsWrapper = document.createElement("div");
  sendButtonsWrapper.className = "sht-row-wrapper";

  if (message && sendButton) {
    sendButtonsWrapper.append(sendButton, sendMeButton, tooltipIcon);
    insertAfter(sendButtonsWrapper, message);
  }
};
