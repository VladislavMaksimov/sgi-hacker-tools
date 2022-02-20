export const createTooltipIcon = (
  text: string,
  size: "default" | "small" | "large" = "default"
): HTMLImageElement => {
  const tooltipIcon = document.createElement("img");
  tooltipIcon.src = chrome.runtime.getURL("tooltip.svg");
  switch (size) {
    case "large":
      tooltipIcon.className = "sht-tooltip-icon-large";
      break;
    case "small":
      tooltipIcon.className = "sht-tooltip-icon-small";
      break;
    case "default":
      tooltipIcon.className = "sht-tooltip-icon";
      break;
    default:
      tooltipIcon.className = "sht-tooltip-icon";
      break;
  }
  tooltipIcon.setAttribute("title", text);
  return tooltipIcon;
};
