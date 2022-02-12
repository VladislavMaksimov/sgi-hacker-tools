export const getMyId = (): string | null => {
  const myLink = document.querySelector(
    "#l-sidebar > h2 > p > a[href]"
  ) as HTMLLinkElement;
  const myId = new URLSearchParams(myLink.href).get("uid");
  return myId;
};
