import {
  createBanUserIcon,
  insertAfter,
  toggleBanUserIconState,
} from "../../utils";
import { TEXT_BAN_USER } from "./constants";

export const addBanUserIcon = () => {
  const userNames = document.querySelectorAll(".name > a:first-of-type");
  userNames.forEach((userName) => {
    const icon = createBanUserIcon();
    insertAfter(icon, userName);
  });
};

export const addBanIconsObserver = () => {
  const board = document.getElementById("board");
  const observer = new MutationObserver((mutations, observer) => {
    const addedNodes = Array.from(mutations[0].addedNodes);
    if (
      !addedNodes.find((node) =>
        (node as HTMLDivElement).classList.contains("message")
      )
    )
      return;
    addBanUserIcon();
  });
  if (board)
    observer.observe(board, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
};

export const addBanUserOnUserPage = () => {
  const sendPrivateMessage = document
    .querySelector(".w")!
    .querySelector(".popup");
  if (!sendPrivateMessage) return;

  const banUserWrapper = document.createElement("span");
  banUserWrapper.className = "sht-ban-user";
  const banUserIcon = createBanUserIcon();
  const banUserText = document.createElement("span");
  banUserText.textContent = TEXT_BAN_USER;
  banUserWrapper.addEventListener("mouseover", () =>
    toggleBanUserIconState(banUserIcon, true)
  );
  banUserWrapper.addEventListener("mouseout", () =>
    toggleBanUserIconState(banUserIcon, false)
  );
  banUserWrapper.append(banUserIcon, banUserText);

  insertAfter(banUserWrapper, sendPrivateMessage);
};
