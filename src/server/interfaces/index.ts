export interface Chat {
  sender: User;
  receiver: User;
  id: string;
}

interface User {
  username: string;
  id: string;
}
