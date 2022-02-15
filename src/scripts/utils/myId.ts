export const getMyId = (): string | null => {
  const myLink = document.querySelector(
    "#l-sidebar > h2 > p > a[href]"
  ) as HTMLLinkElement;
  return new URLSearchParams(myLink.href).get("uid");
};
