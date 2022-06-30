import axios from 'axios';

const API_URL = '/api/car-item/'
const API_URL_END_USER = '/api/end-user/car-item/'
const API_URL_ADMIN = '/api/admin/car-item/'

// Get car items
const getCarItems = async (token) => {
  // Config
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
  // Response
  const response = await axios.get(API_URL, config);
  return response.data;
}

// Create new Car Item
const createCarItem = async (carItemData, token) => {
  // Config
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL_ADMIN + '/car/', carItemData, config);
  return response.data;
}

// Rent car item
const rentCarItem = async (itemId, status, token) => {
  // Config
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
  // Response
  const response = await axios.put(API_URL_END_USER + '/rent/' + itemId, { carAvailable: status }, config);

  return response.data;
}

const createBorrowCarform = async (itemId, newDueTime, token) => {
  // Config
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
  // Response
  console.log(API_URL_END_USER + 'rentCarForm/' + itemId);
  const response = await axios.post(API_URL_END_USER + 'rentCarForm/' + itemId, { dueTime: newDueTime }, config);

  return response.data;
}


// Update car item
const updateCarItem = async (itemId, body, token) => {
  // Config
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
  // Response
  const response = await axios.put(API_URL_ADMIN + '/car/' + itemId, body, config);

  return response.data;
}

// Delete car Item
const deleteCarItem = async (itemId, token) => {
  // Config
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
  // Response
  const response = await axios.delete(API_URL_ADMIN + '/car/' + itemId, config);
  return response.data;
}

const carItemService = {
  getCarItems,
  rentCarItem,
  createCarItem,
  deleteCarItem,
  updateCarItem,
  createBorrowCarform
}

export default carItemService;