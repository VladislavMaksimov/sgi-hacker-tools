export const DANGER_CHARS = 1000;
export const ALERT_CHARS = 950;
export const MESSAGE_MAX_LENGTH = 10000;
export const TEXT = {
  CHARS_COUNTER: "Количество символов: ",
  CHARS_COUNTER_TOOLTIP: `Если количество символов больше ${ALERT_CHARS}, возможно, вы не сможете отправить сообщение.  
Если количество символов больше ${DANGER_CHARS}, вы точно не сможете отправить сообщение. Разделите большое сообщение на два.

P.S. На сервере Small Games происходит магия, и в разное время ограничение на количество символов меняется в пределах от
${ALERT_CHARS} до ${DANGER_CHARS}. SGI Hacker Tools не может это изменить.`,
};
