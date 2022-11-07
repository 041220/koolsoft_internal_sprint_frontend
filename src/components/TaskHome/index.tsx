import { Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddNewModal from '../ModalTask/AddNewModal'
import Column from '../Column/Column'
import "./index.scss"
import SprintSlice from '../../redux/slices/SprintSlice'
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, DropResult } from "react-beautiful-dnd"



const TasksHome: React.FC = () => {
    const [displayModal, setDisplayModal] = useState<boolean>(false)

    const dispatch = useDispatch();

    const sprintData = useSelector((state: any) => state.oneSprint.columns)

    useEffect(() => {
        const getDataTasks = localStorage.getItem("allTasks");
        if (getDataTasks) {
            dispatch(SprintSlice.actions.getDataTasksLocal(JSON.parse(getDataTasks)))
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

            dispatch(SprintSlice.actions.updateStatusTask(taskDraggEnd))
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