import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const getPharmacyDetails = async (id) => {
  return await api.get(`/pharmacies/${id}`);
};

export const getPharmacyList = async () => {
  try {
    const response = await api.get('pharmacies');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addPharmacy = async (data) => {
  try {
    const response = await api.post('pharmacies', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePharmacy = async (id, data) => {
  try {
    await axios.put(`/pharmacies/${id}`, data);
    return true;
  } catch (error) {
    if (error.response.status === 400) {
      throw error.response.data;
    }
    throw error;
  }
};

export const deletePharmacy = async (id) => {
  try {
    await api.delete(`/pharmacies/${id}`);
    return true;
  } catch (error) {
    if (error.response.status === 404) {
      throw error.response.data;
    }
    throw error;
  }
};