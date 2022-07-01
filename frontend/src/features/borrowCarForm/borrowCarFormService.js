import axios from 'axios';

const API_URL_END_USER = '/api/end-user/car-item/';

const createBorrowCarform = async (itemId, newDueTime, token) => {
  // Config
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
  // Response
  const response = await axios.post(API_URL_END_USER + 'rentCarForm/' + itemId, { dueTime: newDueTime }, config);

  return response.data;
}


const getSpecificBorrowCarForm = async (token) => {
  // Config
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL_END_USER + "rentCarForm/", config);
  return response.data;
}

const updateBorrowCarForm = async (bodyForm, token) => {
  // Config
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }

  const formID = bodyForm['_id']

  const response = await axios.put(API_URL_END_USER + "rentCarForm/" + formID, bodyForm, config);
  return response.data;
}

const borrowCarFormService = {
  createBorrowCarform,
  getSpecificBorrowCarForm,
  updateBorrowCarForm
}

export default borrowCarFormService;