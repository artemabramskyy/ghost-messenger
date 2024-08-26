import {Client, ClientMap} from "root/src/interfaces/Client";

export const isClientAlreadyExists = (client: Client, CLIENTS: ClientMap): boolean => {
  const duplicateClient = CLIENTS.get(client.id);
  return duplicateClient === undefined;
}

export const findClient = (id: string, CLIENTS: ClientMap) => {
  try {
    const foundClient = CLIENTS.get(id);
    return foundClient;
  } catch (err) {
    throw err;
  }
}
