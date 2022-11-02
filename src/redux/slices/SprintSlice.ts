import { createSlice } from "@reduxjs/toolkit";
import { ColumnType } from "../../components/TaskHome";

const saveSprintToLocalStorage = (sprint: any) => {
    try {
        localStorage.setItem("oneSprint", JSON.stringify(sprint))
    } catch (error) {

    }
}
const initialState: any = {
    sprint: [],
}
const SprintSlice = createSlice({
    name: "oneSprint",
    initialState,
    reducers: {
        initSprint: (state, action) => {
            state.sprint = action.payload
        },
        setColumn: (state, action) => {
            console.log("checkColumn:", action.payload);
            state.sprint = state.sprint.map((item: ColumnType) => {

                return (
                    item.id === action.payload.editColumnId
                        ? { ...item, tasks: item.tasks = action.payload.dataTask.filter((task: any) => task.status === item.id) }
                        : { ...item }
                )
            })

            // saveSprintToLocalStorage(state.sprint)
        },
        // removeDragDrop: (state, action) => {

        //     state.sprint = state.sprint.map((item: any) => {
        //         return (
        //             item.id === action.payload.sourceColumn.id
        //                 ? { ...item, tasks: item.tasks = item.tasks.filter((task: any) => task._id !== action.payload.draggableId) }
        //                 : { ...item }
        //         )
        //     })
        //     saveSprintToLocalStorage(state.sprint)
        // },
        // updateDragDrop: (state, action) => {

        //     console.log("actin.payloadTest:", action.payload);
        //     state.sprint = state.sprint.map((item: any) => {
        //         return (
        //             item.id === action.payload.result.destination.droppableId
        //                 ? { ...item, tasks: [...item.tasks, action.payload.taskDraggEnd] }
        //                 : { ...item }
        //         )
        //     })

        //     saveSprintToLocalStorage(state.sprint)
        // },
        reoderDragDrop: (state, action) => {


            state.sprint = state.sprint.map((item: any) => {

                return (
                    item.id === action.payload.result.destination.droppableId
                        ? { ...item, tasks: [...item.tasks = action.payload.dataTask] }
                        : { ...item }
                )

            })
            console.log("state.sprint2:", state.sprint);
            saveSprintToLocalStorage(state.sprint)
        },
        getDataSprintLocal: (state, action) => {
            state.sprint = action.payload
        }
    }
})

export default SprintSlice;