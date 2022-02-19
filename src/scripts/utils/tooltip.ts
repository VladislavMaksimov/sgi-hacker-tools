export const createTooltipIcon = (
  text: string,
  size: "default" | "large" = "default"
): HTMLImageElement => {
  const tooltipIcon = document.createElement("img");
  tooltipIcon.src = chrome.runtime.getURL("tooltip.svg");
  tooltipIcon.className = "sht-tooltip-icon";
  if (size === "large") tooltipIcon.className = "sht-tooltip-icon-large";
  tooltipIcon.setAttribute("title", text);
  return tooltipIcon;
};
