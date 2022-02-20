export const createShtMenuItem = (
  text: string,
  onCheck: Function,
  onUncheck: Function,
  conditionCheckedDefault: boolean,
  tooltipText?: string
): HTMLElement => {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = conditionCheckedDefault;
  input.className = "sht-menu-checkbox";
  input.addEventListener("change", () => {
    if (input.checked) onCheck();
    else onUncheck();
  });

  const label = document.createElement("span");
  label.textContent = text;
  if (tooltipText) label.title = tooltipText;

  const item = document.createElement("label");
  item.className = "sht-menu-item";
  item.append(input, label);

  return item;
};
