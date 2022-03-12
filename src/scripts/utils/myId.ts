export const getIdFromParams = (searchParams: string) => {
  return new URLSearchParams(searchParams).get("uid");
};

export const getMyId = (): string | null => {
  const myLink = document.querySelector(
    "#l-sidebar > h2 > p > a[href]"
  ) as HTMLLinkElement;
  return getIdFromParams(myLink.href);
};

export const getURLId = (): string | null => {
  return getIdFromParams(window.location.search);
};
