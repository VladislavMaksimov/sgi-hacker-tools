export enum USERS_BLACKLIST_ACTIONS {
  BLOCK = "block",
  HIDE = "hide",
  UNBLOCK = "unblock",
  UNHIDE = "unhide",
}

const setBlackList = (blackList: Map<string, string>) =>
  localStorage.setItem("blackList", JSON.stringify(Array.from(blackList)));

export const getBlackList = (): Map<string, string> => {
  const blackList = localStorage.getItem("blackList");
  return blackList
    ? new Map(Array.from(JSON.parse(blackList)))
    : new Map<string, string>();
};

export const blockHideUser = (userId: string, userName: string) => {
  const blackList = getBlackList();
  blackList.set(userId, userName);
  setBlackList(blackList);
};

export const unBlockHideUser = (userId: string) => {
  const blackList = getBlackList();
  blackList.delete(userId);
  setBlackList(blackList);
};

export const isUserInBlackList = (userId: string) => {
  const blackList = getBlackList();
  return blackList.has(userId);
};
