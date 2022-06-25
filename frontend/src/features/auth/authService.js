import axios from 'axios'

const API_URL = '/api/users/'

// register user
const register = async (userData) => {

    console.log('@authService register...');

    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// login user
const login = async (userData) => {

    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// logout user
const logout = () => {
    console.log('@frontend  authSlice.logout...')
    const user = localStorage.getItem('user')
    console.log(`user:  ${user}`)
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService