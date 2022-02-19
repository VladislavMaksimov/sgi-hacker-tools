import { createTooltipIcon, insertAfter } from "../../utils";
import { TEXT_BUTTON, TEXT_TOOLTIP } from "./constants";

export const addSendMeButton = () => {
  const message = document.getElementById("message") as HTMLTextAreaElement;
  const sendButton = document.getElementById("send") as HTMLButtonElement;

  const sendMeButton = document.createElement("button");
  sendMeButton.id = "sht-send-me-button";
  sendMeButton.className = "sht-button";
  sendMeButton.innerText = TEXT_BUTTON;
  // you can trust the standard and add a listener before onclick attribute
  // https://stackoverflow.com/a/25016769/16689867
  // https://stackoverflow.com/a/49806959/16689867
  // you can also rewrite a part of website's logic
  // but the safest and cheapest way as I think would be adding this snippet into onclick attribute
  const addMe =
    'document.getElementById("message").value = "/me " + document.getElementById("message").value;';
  sendMeButton.setAttribute(
    "onclick",
    addMe + sendButton.getAttribute("onclick")!
  );

  const tooltipIcon = createTooltipIcon(TEXT_TOOLTIP, "large");

  const sendButtonsWrapper = document.createElement("div");
  sendButtonsWrapper.className = "sht-row-wrapper";

  if (message && sendButton) {
    sendButtonsWrapper.append(sendButton, sendMeButton, tooltipIcon);
    insertAfter(sendButtonsWrapper, message);
  }
};
