export const clear = (element: HTMLElement | null) => {
  if (!element) return;
  while (element.firstChild) element.firstChild.remove();
};
