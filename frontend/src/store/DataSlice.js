import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from "../api/API";

export const book = createAsyncThunk(
    'data/book',
    async function (data, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.BOOK_URL, {
                method: 'post',
                body: JSON.stringify(data)
            });

            response = await response.json();
            dispatch(getData(data.week));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getData = createAsyncThunk(
    'data/getInfo',
    async function (currentWeek, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.GET_INFO_URL + '?week=' + currentWeek, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            response = await response.json();

            dispatch(setData(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    data: null,
    currentWeek: 9,
};

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        setData(state, action) {
            //debugger
            state.data = action.payload;
        },
        setCurrentWeek(state, action) {
            //debugger
            state.currentWeek = action.payload;
        },
    },
    extraReducers: {
        [getData.pending]: () => {
        },
        [getData.fulfilled]: () => {
        },
        [getData.rejected]: () => {
        },
        [book.pending]: () => {
        },
        [book.fulfilled]: () => {
        },
        [book.rejected]: () => {
        },
    },
});

export const {setData, setCurrentWeek} = dataSlice.actions;

export default dataSlice.reducer;












