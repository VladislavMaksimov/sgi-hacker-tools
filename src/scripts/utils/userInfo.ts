export const getUserNameFromPage = (): string | null => {
  const strWithUserName = document.querySelector("#in-content > h2 > p");
  if (!strWithUserName) return null;
  return strWithUserName.textContent!.split(" ")[2];
};
