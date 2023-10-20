import axios from 'axios'

const Prod=process.env.NODE_ENV==="production"

const Dev_URL='https://friendly-teal-veil.cyclic.app/api' 
// 'http://localhost:5001/api'

const API_URL= Prod ? "https://friendly-teal-veil.cyclic.app/api" : Dev_URL  

export const API= axios.create({ baseURL: API_URL })
