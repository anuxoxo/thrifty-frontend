import axios from 'axios';
import { API_URI } from '@env'

const instance = axios.create({
  baseURL: API_URI,
})

export default instance