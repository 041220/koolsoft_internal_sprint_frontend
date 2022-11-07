import { createSlice } from "@reduxjs/toolkit";


export type InitialState = {
    columns: ColumnType[],
    allTasks: Task[]
}

export type ColumnType = {
    id: string,
    title: string,
    color: string,
    tasks: Task[]
}
export type Task = {
    _id: string,
    name: string,
    status?: string,
    index: number,
    statusStage?: number,
    description?: string,
    bugDescription?: string,
    createDate?: number,
    startDate?: number,
    deadline?: number,
    estimatePoints?: number,
    actualPoints?: number,
    dificulty?: number,
    priority?: number,
    projectId?: any,
    sprintId?: any,
    parrentId?: any,
    deleteAt?: number,
}
const saveTasksToLocalStorage = (oneSprint: any) => {
    try {
        localStorage.setItem("allTasks", JSON.stringify(oneSprint.allTasks))
    } catch (error) {

    }
}
const initialState: InitialState = {
    columns: [
        { id: "op", title: "OPEN", color: "rgb(211, 211, 211)", tasks: [] },
        { id: "ip", title: "IN PROGRESS", color: "rgb(255, 84, 13)", tasks: [] },
        { id: "rv", title: "REVIEW", color: "rgb(255, 153, 0)", tasks: [] },
        { id: "bg", title: "BUG", color: "rgb(0, 0, 0)", tasks: [] },
        { id: "cl", title: "CLOSED", color: "rgb(107, 201, 80)", tasks: [] },
    ],
    allTasks: []
}
const SprintSlice = createSlice({
    name: "oneSprint",
    initialState,
    reducers: {

        setColumn: (state, action) => {

            state.columns = state.columns.map((item: ColumnType) => {

                return (
                    item.id === action.payload.editColumnId
                        ? {
                            ...item, tasks: item.tasks = action.payload.dataTask
                                .filter((task: any) => task.status === item.id)
                                ?.map((value: any, index: number) => {
                                    return (
                                        { ...value, index }
                                    )
                                })
                        }
                        : { ...item }
                )
            })

            // saveSprintToLocalStorage(state.sprint)
        },
        addNewTask: (state, action) => {

            state.allTasks.push(action.payload)
            saveTasksToLocalStorage(state)
        },
        // removeDragDrop: (state, action) => {

        //     state = state.map((item: any) => {
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
        //     state = state.map((item: any) => {
        //         return (
        //             item.id === action.payload.result.destination.droppableId
        //                 ? { ...item, tasks: [...item.tasks, action.payload.taskDraggEnd] }
        //                 : { ...item }
        //         )
        //     })

        //     saveSprintToLocalStorage(state.sprint)
        // },
        reoderDragDrop: (state, action) => {


            state.columns = state.columns.map((item: any) => {

                return (
                    item.id === action.payload.result.destination.droppableId
                        ? { ...item, tasks: [...item.tasks = action.payload.dataTask] }
                        : { ...item }
                )

            })

        },

        getDataTasksLocal: (state, action) => {
            state.allTasks = action.payload
        },
        updateStatusTask: (state, action) => {
            state.allTasks.map((item: any) => {
                return (
                    item._id === action.payload._id
                        ? { ...item, status: item.status = action.payload.status }
                        : { ...item }
                )
            })
            saveTasksToLocalStorage(state)
        }
    }
})

export default SprintSlice;