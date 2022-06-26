import axios from "axios"

const API_URL = '/api/comics/'

// collect comic
const collectComic = async (comicData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.post(API_URL, comicData, config)

    return response.data
}


// get user comics
const getUserComics = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}


// remove comic
const removeComic =  async (comicId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    console.log(`@comicSlice comicId => ${comicId}`)

    const response = await axios.delete(API_URL + comicId, config)

    return response.data
}


const comicService = {
    collectComic,
    getUserComics,
    removeComic
}

export default comicService