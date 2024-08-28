import User from "root/src/interfaces/User";
import StoredMessage from "root/src/interfaces/StoredMessage";

export default interface StoredChat {
  storedMessages: StoredMessage[];
  sender: User;
  receiver: User;
}
