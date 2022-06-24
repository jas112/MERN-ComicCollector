import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import comicService from './comicService'

const initialState = {
    comics: [],
    isError: false,
    isSuccess: false,
    isLoading: false
}

// collect comic
export const collectComic = createAsyncThunk('comics/collect', async (comicData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await comicService.collectComic(comicData, token)
    } catch (error) {
        const message = (error.response.data && error.response.data && error.response.data.message) || error.message || error.message
        return thunkAPI.rejectWithValue(message)
    }

})

// get user comics
export const getUserComics = createAsyncThunk('comics/collect', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await comicService.getUserComics(token)
    } catch (error) {
        const message = (error.response.data && error.response.data && error.response.data.message) || error.message || error.message
        return thunkAPI.rejectWithValue(message)
    }

})

// remove comic
export const removeComic = createAsyncThunk('comics/collect', async (comicId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await comicService.removeComic(comicId, token)
    } catch (error) {
        const message = (error.response.data && error.response.data && error.response.data.message) || error.message || error.message
        return thunkAPI.rejectWithValue(message)
    }

})

export const comicSlice = createSlice({
    name: 'comic',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(collectComic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(collectComic.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.comics.push(action.payload)
            })
            .addCase(collectComic.isError, (state) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserComics.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserComics.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.comics = action.payload 
            })
            .addCase(getUserComics.isError, (state) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeComic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeComic.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.comics = state.goals.filter((comic) => comic._id !== action.payload.id) 
            })
            .addCase(getUserComics.isError, (state) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = comicSlice.actions
export default comicSlice