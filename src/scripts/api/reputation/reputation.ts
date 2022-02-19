import { REP_PAGE, DECREASE } from "./constants";

export const decRep = (
  victimId: string | number,
  myId: string | number,
  msg: string,
  fromPageId: number,
  cb: (response: Response) => void
) => {
  const url = new URL(process.env.BASE + REP_PAGE);
  url.search = new URLSearchParams({
    uid: String(myId),
    to: String(victimId),
    change: String(DECREASE),
    fromMsg: String(fromPageId),
    mes: msg,
  }).toString();
  fetch(url.toString()).then((response) => cb(response));
};

export const createAlertCallback = (successText: string, failText: string) => {
  return function (response: Response) {
    response.json().then((json) => {
      if (json === "") {
        alert(successText);
      } else alert(failText);
    });
  };
};
