import ChatCreationData from "root/src/interfaces/ChatCreationData";

export default interface Message extends ChatCreationData {
  text: string;
}
