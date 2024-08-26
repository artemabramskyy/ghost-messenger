import User from "root/src/interfaces/User";
import StoredMessage from "root/src/interfaces/StoredMessage";

export default interface StoredChat {
  messages: StoredMessage[];
  sender: User;
  receiver: User;
}
