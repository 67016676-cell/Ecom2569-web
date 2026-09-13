import axios from "axios";


export const createUserCart = async (token, cart) => {
    //code
    return axios.post('http://localhost:5001/api/user/cart', cart, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUserCart = async (token) => {
    //code
    return axios.get('http://localhost:5001/api/user/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveAddress = async (token,address) => {
    //code
    return axios.post('http://localhost:5001/api/user/address',{address}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveOrder = async (token, payload) => {
    return axios.post('http://localhost:5001/api/user/order', payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getOrders = async (token, payload) => {
    return axios.get('http://localhost:5001/api/user/order', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}