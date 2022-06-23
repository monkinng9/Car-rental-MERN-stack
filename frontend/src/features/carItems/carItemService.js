import axios from 'axios';

const API_URL = '/api/car-item/'

// Get car items
const getCarItems = async() => {
  // Config

  // Response
  const response = await axios.get(API_URL);

  return response.data;
}

const carItemService = {
  getCarItems,
}

export default carItemService;