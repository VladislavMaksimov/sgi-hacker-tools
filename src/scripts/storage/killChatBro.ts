export const setChatBroDead = () => localStorage.setItem("chatBro", "dead");

export const setChatBroAlive = () => localStorage.setItem("chatBro", "alive");

export const getChatBroState = () => localStorage.getItem("chatBro");
