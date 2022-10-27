import { Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddNewModal from '../AddNewModal/AddNewModal'
import Column from '../Column/Column'
import "./index.scss"
import { v4 } from 'uuid'
import SprintSlice from '../../redux/slices/SprintSlice'


export type SprintType = {
    sprint: ColumnType[]
}

export type ColumnType = {
    id: string,
    title: string,
    color: string | number,
    tasks: Task[]
}
export type Task = {
    _id: string,
    name: string,
    status?: number,
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

const TasksHome: React.FC = () => {
    const [displayModal, setDisplayModal] = useState<boolean>(false)
    const [editColumn, setEditColumn] = useState<any>(undefined)
    const [columns, setColumns] = useState<ColumnType[]>([
        { id: "op", title: "OPEN", color: "rgb(211, 211, 211)", tasks: [] },
        { id: "ip", title: "IN PROGRESS", color: "rgb(255, 84, 13)", tasks: [] },
        { id: "rv", title: "REVIEW", color: "rgb(255, 153, 0)", tasks: [] },
        { id: "bg", title: "BUG", color: "rgb(0, 0, 0);", tasks: [] },
        { id: "cl", title: "CLOSED", color: "rgb(107, 201, 80)", tasks: [] },
    ])

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SprintSlice.actions.initSprint(columns))
    }, [dispatch, columns])
    const sprintData = useSelector((state: any) => state.oneSprint.sprint)

    console.log("checkSprint:", sprintData);

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("1");
    //         localStorage.setItem("columnsSprint", JSON.stringify(columns))
    //     }, 200)
    // }, [dispatch, columns])
    useEffect(() => {
        const getDataSprint = localStorage.getItem("oneSprint");
        if (getDataSprint) {
            dispatch(SprintSlice.actions.getDataSprintLocal(JSON.parse(getDataSprint)))
        }

    }, [dispatch])



    const handleOpenModal = () => setDisplayModal(true);
    const handleCloseModal = () => setDisplayModal(false);
    return (
        <div className='container-column'>

            <div className='title-column'>
                {
                    sprintData.map((column: any) => (
                        <div className='title-column-bag' style={{ borderTopColor: `${column.color}` }}>
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
            <Modal
                open={displayModal}
                onClose={handleCloseModal}
            >
                <AddNewModal displayModal={displayModal} setDisplayModal={setDisplayModal} />
            </Modal>
            <div className='content-column'>
                {
                    sprintData.map((column: any) => (

                        <div className='content-column-bag' key={column.id}>
                            <div className='content-column-item'>

                                <Column editColumn={column.id} setEditColumn={setEditColumn} key={column.id} column={column} />

                            </div>
                        </div>

                    ))
                }

            </div>
            <div className='add-task-home'>
                <button className='btn-add-task-home'
                    onClick={handleOpenModal}
                >
                    AddTask
                </button>
            </div>
        </div>
    )
}

export default TasksHome