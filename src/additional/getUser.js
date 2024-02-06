import axios from 'axios';

const getUser = async (token) => {
  try {
    if (token) {
      const response = await axios.get(
        `http://localhost:5000/myProfile/${token}`
      );
      return response.data;
    }
  } catch (error) {
    console.log(error);
    // You may want to handle the error here or propagate it further.
    throw error;
  }
};

export default getUser;