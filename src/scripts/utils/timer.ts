// callback is function that fires on each tick
// callbackBeforeEnd is function that fires once if endCondition is true
export function setTimer(
  callback: Function,
  endCondition: boolean | Function,
  delay: number,
  callbackBeforeEnd?: Function
) {
  setTimeout(function tick() {
    callback();

    const stopTimer =
      typeof endCondition === "boolean" ? endCondition : endCondition();
    if (stopTimer) {
      if (callbackBeforeEnd) callbackBeforeEnd();
      return;
    }

    setTimeout(tick, delay);
  }, delay);
}
