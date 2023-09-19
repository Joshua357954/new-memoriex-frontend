import axios from 'axios'

const Prod = process.env.NODE_ENV==="production"

const Dev_URL = 'http://localhost:5001/api'

const API_URL = Prod ? "https://chat-memoriex.herokuapp.com/api" : Dev_URL  

export const API= axios.create({ baseURL: API_URL })
