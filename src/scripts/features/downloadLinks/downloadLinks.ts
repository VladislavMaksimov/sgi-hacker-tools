import { isTorrentLink } from "../../utils";

export const increaseTorrentLinkSize = () => {
  const downloadLinksHeading = document.getElementById("download_links");
  if (!downloadLinksHeading) return;
  let sibling: Node = downloadLinksHeading;
  while (sibling.nextSibling) {
    sibling = sibling.nextSibling;
    if (
      sibling instanceof HTMLAnchorElement &&
      sibling.nodeName.toLowerCase() === "a" &&
      isTorrentLink(sibling.href)
    ) {
      sibling.classList.add("sht-torrent-link");
      break;
    }
  }
};
