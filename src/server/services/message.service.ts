export const sendMessageService = async (data: any) => {
  try {
    console.log('send message', data);

    return data;
  } catch (err) {
    throw err;
  }
};
