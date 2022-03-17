const setBlackList = (blackList: Set<string>) =>
  localStorage.setItem("blackList", JSON.stringify(Array.from(blackList)));

export const getBlackList = (): Set<string> => {
  const blackList = localStorage.getItem("blackList");
  return blackList
    ? new Set(Array.from(JSON.parse(blackList)))
    : new Set<string>();
};

export const blockHideUser = (user: string) => {
  const blackList = getBlackList();
  blackList.add(user);
  setBlackList(blackList);
};

export const unBlockHideUser = (user: string) => {
  const blackList = getBlackList();
  blackList.delete(user);
  setBlackList(blackList);
};
