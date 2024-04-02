import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Tạo 1 axiosJWT
export const axiosJWT = axios.create()

// Boards
export const fetchBoardDetailAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}

// Columns
export const fetchAddColumnAPI = async (newColumnData, token) => {
  const response = await axiosJWT.post(`${API_ROOT}/v1/columns`, newColumnData, {
    headers: {
      token: `Bearer ${token}`
    }
  })
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

// Cards
export const fetchAddCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

// Users
export const registerUserAPI = async (newUser) => {
  try {
    const response = await axios.post(`${API_ROOT}/v1/users/register`, newUser)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const loginUserAPI = async (dataUser) => {
  try {
    const response = await axios.post(`${API_ROOT}/v1/users/login`, dataUser)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const refreshTokenAPI = async (token) => {
  const response = await axios.post(`${API_ROOT}/v1/users/refresh-token`, {
    refreshToken: token
  })
  return response.data
}