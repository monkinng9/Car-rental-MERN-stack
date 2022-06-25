import axios from 'axios';

const API_URL = '/api/car-item/'

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
  const response = await axios.post(API_URL, carItemData, config);
  return response.data;
}

// Update car item
const updateCarItem = async (itemId, status, token) => {
  // Config
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
  // Response
  const response = await axios.put(API_URL + itemId, { carAvailable: status }, config);

  return response.data;
}

// Delete car Item
const deleteCarItem = async (itemId) => {
  // Config

  // Response
  const response = await axios.delete(API_URL + itemId);
  return response.data;
}

const carItemService = {
  getCarItems,
  updateCarItem,
  createCarItem,
  deleteCarItem
}

export default carItemService;