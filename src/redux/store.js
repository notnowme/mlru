import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducers/movieSlice';

export default configureStore({
    reducer: {
        movie: movieReducer
    },
    // middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});
