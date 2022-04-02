export const makeRepChangeSadistic = () =>
  localStorage.setItem("sadistic", "true");

export const makeRepChangeNotSadistic = () =>
  localStorage.removeItem("sadistic");

export const isRepChangeSadistic = () =>
  localStorage.getItem("sadistic") !== null;
