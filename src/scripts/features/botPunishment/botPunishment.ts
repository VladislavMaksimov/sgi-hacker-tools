import { getMyId, insertAfter } from "../../utils";
import { createAlertCallback, decRep } from "../../api";
import { USERS } from "../../constants";
import { PAGE_ID, TEXT } from "./constants";

export const addBotPunishment = () => {
  const getRandomPunishPhrase = () => {
    const phrases = TEXT.PUNISH_PHRASES;
    const index = Math.floor(Math.random() * phrases.length);
    return phrases[index];
  };

  const handlePunishClick = () => {
    const myId = getMyId();
    if (!myId) return;
    const callback = createAlertCallback(TEXT.PUNISH_SUCCESS, TEXT.PUNISH_FAIL);
    const punishment = getRandomPunishPhrase();
    decRep(USERS.BOT, myId, punishment, PAGE_ID, callback);
    location.reload();
  };

  const punishBotButton = document.createElement("button");
  punishBotButton.classList.add("sht-button", "sht-mt-lg");
  punishBotButton.innerText = TEXT.PUNISH;
  punishBotButton.addEventListener("click", handlePunishClick);

  const sendPrivateMsgLink = document.querySelector(
    'a[href="/sendmsg.php?sendto=7"]'
  );
  if (sendPrivateMsgLink) {
    insertAfter(punishBotButton, sendPrivateMsgLink);
    const garbage = punishBotButton.nextSibling;
    if (
      garbage &&
      garbage instanceof HTMLElement &&
      garbage.tagName.toLowerCase() === "br"
    )
      garbage.remove();
  }
};
