import event from "./eventBus";

export const ModalPublisher = {
  message: (content) => {
    event.emit("showModal", content);
  },
  clearAllMessage: () => {
    event.emit("clearAllMessage");
  }
};
