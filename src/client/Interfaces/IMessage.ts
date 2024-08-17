import IChatCreationData from "root/src/client/Interfaces/IChatCreationData";

export default interface IMessage extends IChatCreationData {
  text: string;
}
