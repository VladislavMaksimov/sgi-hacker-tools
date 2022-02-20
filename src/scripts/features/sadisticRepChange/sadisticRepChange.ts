import { SADISTIC_ID } from "./constants";

export const addSadisticRepChange = () => {
  const isSadistic = localStorage.getItem("sadistic");
  if (!isSadistic) return;

  const repChangers: NodeListOf<HTMLSpanElement> =
    document.querySelectorAll(".repaBar > span");

  repChangers.forEach((changer) => {
    const newOnclickArray = changer.getAttribute("onclick")!.split(", ");
    newOnclickArray.splice(2, 1, SADISTIC_ID);
    const newOnclick = newOnclickArray.join(",");

    const newChanger = changer
      .querySelector("img")!
      .cloneNode() as HTMLImageElement;
    newChanger.setAttribute("onclick", newOnclick);
    newChanger.className = "sht-rep-changer";
    changer.parentNode!.insertBefore(newChanger, changer);
    changer.remove();
  });
};
