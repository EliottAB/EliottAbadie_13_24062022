import { configureStore, createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        firstName: "",
        lastName: "",
        email: "",
        isloged: false

    },
    reducers:{
        changeFirstName: (state, action) => {
            state.firstName = action.payload
        },
        changeLastName: (state, action) => {
            state.lastName = action.payload
        },
        updateUser: (state, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.isloged = action.payload.isloged

        }
    }
})

export const {updateUser} = userSlice.actions

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})