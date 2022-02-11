export const createTooltipIcon = (text: string): HTMLImageElement => {
  const tooltipIcon = document.createElement("img");
  tooltipIcon.src = chrome.runtime.getURL("tooltip.svg");
  tooltipIcon.className = "tooltip-icon";
  tooltipIcon.setAttribute("title", text);
  return tooltipIcon;
};
