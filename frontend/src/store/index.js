import {configureStore} from '@reduxjs/toolkit';
import dataReducer from "./DataSlice";

export default configureStore({
    reducer: {
        data: dataReducer,
    },
});
