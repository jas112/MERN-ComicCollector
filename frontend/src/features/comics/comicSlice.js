import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import comicService from './comicService'

const initialState = {
    comics: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// collect comic
export const collectComic = createAsyncThunk('comics/collect', async (comicData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await comicService.collectComic(comicData, token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.message.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

// get user comics
export const getUserComics = createAsyncThunk('comics/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await comicService.getUserComics(token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.message.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

// remove comic
export const removeComic = createAsyncThunk('comics/delete', async (comicId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await comicService.removeComic(comicId, token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message ||
            error.message.toString()
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
            .addCase(collectComic.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.comics.push(action.payload)
            })
            .addCase(collectComic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(getUserComics.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserComics.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.comics = action.payload
            })
            .addCase(getUserComics.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(removeComic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeComic.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.comics = state.comics.filter((comic) => comic._id !== action.payload.id)
            })
            .addCase(removeComic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = comicSlice.actions
export default comicSlice.reducer