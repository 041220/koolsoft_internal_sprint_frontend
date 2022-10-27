import { createSlice } from "@reduxjs/toolkit";


const initialState: any = {
    id: '',
    tasks: []
}
const ColumnSlice = createSlice({
    name: "oneColumns",
    initialState,
    reducers: {
        addNewTask: (state, action) => {
            console.log("action.payload2:", action.payload);

            state.id = action.payload.id
            state.tasks.push(action.payload)
        },
        getDataColumn: (state, action) => {
            state.id = action.payload.id
            state.tasks = action.payload.tasks
        }
    }
})

export default ColumnSlice;