import { IGame } from './../interface/IGame';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGameListState {
    game: IGame[] | [],
    isLoad: boolean
} 
export type GameType = IGameListState
const initialState: IGameListState = {
    game: [],
    isLoad: false
}
const slice = createSlice({
    name: 'gameList',
    initialState,
    reducers: {
        addGameList: (state, action: PayloadAction<IGame[]>) => {
            state.game = action.payload
            state.isLoad = true
        },
        deleteGameList: (state) => {
            state.game = []
            state.isLoad = false
        }
    }
})

export const reducer = slice.reducer
export const actions = slice.actions