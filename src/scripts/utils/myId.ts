export const getIdFromParams = (searchParams: string) => {
  return new URLSearchParams(searchParams).get("uid");
};

export const getMyId = (): string | undefined => {
  const myLink = document.querySelector(
    "#l-sidebar > h2 > p > a[href]"
  ) as HTMLLinkElement;
  return getIdFromParams(myLink.href) || undefined;
};

export const getURLId = (): string | undefined => {
  return getIdFromParams(window.location.search) || undefined;
};
