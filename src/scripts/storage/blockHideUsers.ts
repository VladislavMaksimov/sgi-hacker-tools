export enum USERS_BLACKLIST_ACTIONS {
  BLOCK = "block",
  HIDE = "hide",
  UNBLOCK = "unblock",
  UNHIDE = "unhide",
}

const setBlackList = (blackList: Set<string>) =>
  localStorage.setItem("blackList", JSON.stringify(Array.from(blackList)));

export const getBlackList = (): Set<string> => {
  const blackList = localStorage.getItem("blackList");
  return blackList
    ? new Set(Array.from(JSON.parse(blackList)))
    : new Set<string>();
};

export const blockHideUser = (userId: string, userName: string) => {
  const blackList = getBlackList();
  blackList.add(userId);
  setBlackList(blackList);
};

export const unBlockHideUser = (user: string) => {
  const blackList = getBlackList();
  blackList.delete(user);
  setBlackList(blackList);
};

export const isUserInBlackList = (user: string) => {
  const blackList = getBlackList();
  return blackList.has(user);
};
