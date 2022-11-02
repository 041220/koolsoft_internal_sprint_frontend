import { createSlice } from "@reduxjs/toolkit";

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

const saveTasksToLocalStorage = (task: any) => {
    try {
        localStorage.setItem("allTask", JSON.stringify(task))
    } catch (error) {

    }
}

const initialState: any = {
    tasks: []
}

const TasksSlice = createSlice({
    name: "allTask",
    initialState,
    reducers: {
        addNewTask: (state, action) => {

            state.tasks.push(action.payload)
            saveTasksToLocalStorage(state)
        },
        getDataTasksLocal: (state, action) => {
            state.tasks = action.payload.tasks
        },
        updateStatusTask: (state, action) => {
            state.tasks.map((item: any) => {
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

export default TasksSlice;