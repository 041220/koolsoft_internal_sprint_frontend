import { Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddNewModal from '../ModalTask/AddNewModal'
import Column from '../Column/Column'
import "./index.scss"
import { v4 } from 'uuid'
import SprintSlice from '../../redux/slices/SprintSlice'
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import TasksSlice, { Task } from '../../redux/slices/TasksSlice'


export type ColumnType = {
    id: string,
    title: string,
    color: string | number,
    tasks: Task[]
}


const TasksHome: React.FC = () => {
    const [displayModal, setDisplayModal] = useState<boolean>(false)
    const [columns, setColumns] = useState<ColumnType[]>([
        { id: "op", title: "OPEN", color: "rgb(211, 211, 211)", tasks: [] },
        { id: "ip", title: "IN PROGRESS", color: "rgb(255, 84, 13)", tasks: [] },
        { id: "rv", title: "REVIEW", color: "rgb(255, 153, 0)", tasks: [] },
        { id: "bg", title: "BUG", color: "rgb(0, 0, 0)", tasks: [] },
        { id: "cl", title: "CLOSED", color: "rgb(107, 201, 80)", tasks: [] },
    ])

    const dispatch = useDispatch();

    const sprintData = useSelector((state: any) => state.oneSprint.sprint)

    //push init data task vào store
    useEffect(() => {
        dispatch(SprintSlice.actions.initSprint(columns))
    }, [dispatch, columns])
    //Lấy data các task từ local về push vào store
    useEffect(() => {
        const getDataSprint = localStorage.getItem("oneSprint");
        if (getDataSprint) {
            dispatch(SprintSlice.actions.getDataSprintLocal(JSON.parse(getDataSprint)))
        }
    }, [dispatch])
    useEffect(() => {
        const getDataTasks = localStorage.getItem("allTask");
        if (getDataTasks) {
            dispatch(TasksSlice.actions.getDataTasksLocal(JSON.parse(getDataTasks)))
        }
    }, [dispatch])


    const handleOpenModal = () => setDisplayModal(true);
    const handleCloseModal = () => setDisplayModal(false);

    const handleSaveDrag = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const { source, destination, draggableId } = result;
        console.log("draggableId:", draggableId);
        // console.log("result", result);

        if (destination?.droppableId === source.droppableId) {
            const tasks = sprintData.find((column: any) => column.id === destination?.droppableId).tasks;
            const dataTask = Array.from(tasks)
            const [removed] = dataTask.splice(source.index, 1)

            dataTask.splice(destination.index, 0, removed)
            // console.log("removed:", removed);
            // console.log("dataTask:", dataTask);

            dispatch(SprintSlice.actions.reoderDragDrop({ result, dataTask }))
        }
        else {
            //Lấy cột gốc của task drag
            const sourceColumn = sprintData.find((column: any) => column.id === source.droppableId);
            //Lấy cột đích của task drop
            // const destinationColumn = sprintData.find((column: any) => column.id === destination?.droppableId).tasks;
            // const dataTaskDes = Array.from(destinationColumn)
            // console.log("checkColumnDrag:", dataTaskDes);

            //remove task drag ở cột gốc
            // dispatch(SprintSlice.actions.removeDragDrop({ draggableId, sourceColumn }))

            //Lấy task drag ra
            const taskDragg = sourceColumn.tasks.find((task: any) => task._id === draggableId)

            const taskDraggEnd = Object.assign({}, taskDragg, { status: destination.droppableId })
            console.log("checkTask:", taskDraggEnd);
            // dataTaskDes.splice(destination.index, 0, taskDragg)

            //push task drop vào cột đích
            // dispatch(SprintSlice.actions.updateDragDrop({ taskDraggEnd, result }))

            dispatch(TasksSlice.actions.updateStatusTask(taskDraggEnd))
        }
    }

    return (
        <div className='container-column'>

            <div className='title-column'>
                {
                    sprintData.map((column: any) => (
                        <div className='title-column-bag' key={column.id} style={{ borderTopColor: `${column.color}` }}>
                            <div className='title-column-h2'>
                                <span className='title-column-text'>{column.title}</span>
                                <div className='border-title-count'>
                                    <span className='title-column-count'>{column.tasks.length} </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>


            <div className='content-column'>
                <DragDropContext onDragEnd={handleSaveDrag}>
                    {
                        sprintData.map((column: any) => (

                            <div className='content-column-bag' key={column.id}>
                                <div className='content-column-item'>

                                    <Column editColumnId={column.id} key={column.id} column={column} />

                                </div>
                            </div>

                        ))
                    }
                </DragDropContext>
            </div>
            <Modal
                open={displayModal}
                onClose={handleCloseModal}
            >
                <AddNewModal displayModal={displayModal} setDisplayModal={setDisplayModal} />
            </Modal>
            <div className='add-task-home'>

                <button className='btn-add-task-home' onClick={handleOpenModal}>
                    <AddIcon style={{ fontSize: '17px', color: 'white' }} /> <span style={{ fontSize: '13px', fontWeight: '600' }}>Task</span>
                </button>

            </div>

        </div >
    )
}

export default TasksHome