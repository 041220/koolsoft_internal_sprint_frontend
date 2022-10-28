import { createSlice } from "@reduxjs/toolkit";
import { ColumnType } from "../../components/TaskHome";

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
        },
        addNewTask: (state, action) => {

            console.log("checkColumn:", action.payload.tasks);
            state.sprint = state.sprint.map((item: ColumnType) => {
                console.log("item:", item.tasks);
                return (
                    item.id === action.payload.id
                        ? { ...item, tasks: [...item.tasks, { ...action.payload.tasks }] }
                        : { ...item }
                )
            })

            saveSprintToLocalStorage(state.sprint)
        },
        removeDragDrop: (state, action) => {
            console.log("action.payload1:", action.payload);
            state.sprint = state.sprint.map((item: any) => {
                return (
                    item.id === action.payload.sourceColumn.id
                        ? { ...item, tasks: item.tasks = item.tasks.filter((task: any) => task._id !== action.payload.draggableId) }
                        : { ...item, tasks: [...item.tasks] }
                )
            })
            saveSprintToLocalStorage(state.sprint)
        },
        updateDragDrop: (state, action) => {
            console.log("action.payload2:", action.payload);
            state.sprint = state.sprint.map((item: any) => {
                return (
                    item.id === action.payload.destinationColumn.id
                        ? { ...item, tasks: [...item.tasks, { ...action.payload.taskDragg }] }
                        : { ...item, tasks: [...item.tasks] }
                )
            })
            saveSprintToLocalStorage(state.sprint)
        },
        reoderDragDrop: (state, action) => {
            console.log("action.payload:", action.payload);

            // state.sprint = state.sprint.map((item: any) => {

            //     const [removed] = item.tasks.splice(action.payload.source.index, 1)
            //     console.log("moved:", removed);
            //     return (
            //         item.id === action.payload.destination.draggableId

            //             ? { ...item, tasks: [...item.tasks, { ...item.tasks.splice(action.payload.destination.index, 0, removed) }] }
            //             : { ...item }


            //     )
            // })
        },
        getDataSprintLocal: (state, action) => {
            state.sprint = action.payload
        }
    }
})

export default SprintSlice;