import { createSlice } from "@reduxjs/toolkit";
import { SprintType } from "../../components/TaskHome";

const saveSprintToLocalStorage = (sprint: any) => {
    try {
        localStorage.setItem("oneSprint", JSON.stringify(sprint))
    } catch (error) {

    }
}
const initialState: any = {
    sprint: []
}
const SprintSlice = createSlice({
    name: "oneSprint",
    initialState,
    reducers: {
        initSprint: (state, action) => {
            state.sprint = action.payload
            saveSprintToLocalStorage(state.sprint)
        },
        updateSprint: (state, action) => {
            console.log("action.payload:", action.payload);

            state.sprint.map((item: any) => {
                return (
                    item.id === action.payload.id
                        ? { ...item, tasks: [...item.tasks, ...action.payload.tasks] }
                        : { ...item }
                )
            })
            saveSprintToLocalStorage(state.sprint)
        },
        getDataSprintLocal: (state, action) => {
            state.sprint = action.payload
        }
    }
})

export default SprintSlice;