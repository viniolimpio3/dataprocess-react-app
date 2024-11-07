import axios from 'axios'

const host = process.env.REACT_APP_HOST_API || `http://localhost`
const port = process.env.REACT_APP_PORT_API || `5089`

const api =  axios.create({
    baseURL:`${host}:${port}` 
})
export default api