export const sendMessegeService = async (data: any) => {
  try {
    console.log('send messege', data);

    return data;
  } catch (err) {
    throw err;
  }
};
