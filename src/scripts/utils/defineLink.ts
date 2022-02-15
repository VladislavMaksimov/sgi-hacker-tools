export const isTorrentLink = (link: string): boolean => {
  if (new URL(link).pathname === "/getTorrents.php") return true;
  return false;
};
