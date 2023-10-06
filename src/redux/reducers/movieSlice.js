import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        popular: [],
        topRated: [],
        upcoming: [],
        genre: [],
    },
    reducers: {
        init: (state, action) => {
            // state = action.payload.data
            // switch(action.payload.target) {
            //     case 'pop':
            //         state.popular = action.payload.data;
            //         break;
            //     case 'top':
            //         state.topRated = action.payload.data;
            //         break;
            //     case 'up':
            //         state.upcoming = action.payload.data;
            //         break;
            //     default:
            //         state.popular = [...state.popular];
            //         state.topRated = [...state.topRated];
            //         state.upcoming = [...state.upcoming];
            // }
            const { popular, topRated, upcoming, genre } = action.payload;
            state.popular = popular.results;
            state.topRated = topRated.results;
            state.upcoming = upcoming.results;
            state.genre = genre.genres;
        }
    }
});

export const MovieReducerActions = movieSlice.actions;
export default movieSlice.reducer;